import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, Send, MessageCircle, AlertCircle } from 'lucide-react';
import { airtableService } from '@/lib/airtable';
import { useToast } from '@/hooks/use-toast';

interface HelpPrompt {
  id: string;
  topic: string;
  category: string;
  defaultResponse: string;
  contactEscalation: string;
  priority: string;
}

const DEFAULT_FAQS: HelpPrompt[] = [
  {
    id: '1',
    topic: 'How do I book a session?',
    category: 'Member',
    defaultResponse: 'Select a host from the Host Selection page, choose your preferred plan (Ad-hoc $15 or Weekly $50), and complete payment. You\'ll receive booking confirmation via email and SMS.',
    contactEscalation: 'support@presence.app',
    priority: 'Normal'
  },
  {
    id: '2',
    topic: 'What is your refund policy?',
    category: 'Member',
    defaultResponse: 'Full refunds are available if you cancel at least 24 hours before your scheduled session. Cancellations within 24 hours are subject to a 50% fee. No-shows are non-refundable.',
    contactEscalation: 'billing@presence.app',
    priority: 'Normal'
  },
  {
    id: '3',
    topic: 'How do I get paid as a host?',
    category: 'Host',
    defaultResponse: 'Hosts receive 70% of session fees. Payouts are processed weekly via Stripe Connect to your linked bank account. You can track earnings in your Host Dashboard.',
    contactEscalation: 'payouts@presence.app',
    priority: 'Normal'
  },
  {
    id: '4',
    topic: 'What are payout timelines?',
    category: 'Host',
    defaultResponse: 'Payouts are processed every Monday for sessions completed the previous week. First-time payouts may take 7-10 business days. Subsequent payouts typically arrive within 2-3 business days.',
    contactEscalation: 'payouts@presence.app',
    priority: 'Normal'
  },
  {
    id: '5',
    topic: 'How do I contact support?',
    category: 'General',
    defaultResponse: 'You can reach our support team via the contact form below, email us at support@presence.app, or message us through your dashboard. We respond within 24 hours.',
    contactEscalation: 'support@presence.app',
    priority: 'Normal'
  }
];

export default function HelpDesk() {
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [prompts, setPrompts] = useState<HelpPrompt[]>(DEFAULT_FAQS);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadHelpPrompts();
  }, []);

  const loadHelpPrompts = async () => {
    try {
      const response = await airtableService.listRecords('Help Desk Prompts');
      if (response.records && response.records.length > 0) {
        const helpData: HelpPrompt[] = response.records.map(r => ({
          id: r.id,
          topic: r.fields['Topic'] || '',
          category: r.fields['Category'] || 'General',
          defaultResponse: r.fields['Default Response'] || '',
          contactEscalation: r.fields['Contact Escalation'] || 'support@presence.app',
          priority: r.fields['Priority'] || 'Normal'
        }));
        setPrompts(helpData);
      }
    } catch (error) {
      console.log('Using default FAQs');
    } finally {
      setLoading(false);
    }
  };

  const filteredPrompts = prompts.filter(
    p => p.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
         p.defaultResponse.toLowerCase().includes(searchQuery.toLowerCase()) ||
         p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedPrompts = {
    Member: filteredPrompts.filter(p => p.category === 'Member'),
    Host: filteredPrompts.filter(p => p.category === 'Host'),
    General: filteredPrompts.filter(p => p.category === 'General')
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await airtableService.createRecord('Support Tickets', {
        'Email': email,
        'Message': message,
        'Status': 'Open',
        'Priority': 'Normal',
        'Created Date': new Date().toISOString()
      });

      toast({
        title: 'Message sent!',
        description: 'Our support team will respond within 24 hours.'
      });

      setMessage('');
      setEmail('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center mb-8">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-[#2563EB]" />
          <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
          <p className="text-gray-600">Find answers or contact our team</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Help Topics</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-gray-500 py-4">Loading help topics...</p>
            ) : filteredPrompts.length > 0 ? (
              Object.entries(groupedPrompts).map(([category, items]) => 
                items.length > 0 && (
                  <div key={category} className="mb-6 last:mb-0">
                    <h3 className="font-semibold text-lg mb-3">{category}</h3>
                    <Accordion type="single" collapsible>
                      {items.map((item, idx) => (
                        <AccordionItem key={item.id} value={`${category}-${idx}`}>
                          <AccordionTrigger>
                            <div className="flex items-center">
                              {item.priority === 'Urgent' && <AlertCircle className="w-4 h-4 mr-2 text-red-500" />}
                              {item.topic}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              <p>{item.defaultResponse}</p>
                              {item.contactEscalation && (
                                <p className="text-sm text-gray-500">
                                  Need more help? Contact: {item.contactEscalation}
                                </p>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )
              )
            ) : (
              <p className="text-gray-500 text-center py-4">No results found.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Textarea
                placeholder="Describe your issue..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              />
              <Button type="submit" disabled={submitting} className="w-full bg-[#2563EB]">
                {submitting ? 'Sending...' : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
