import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Learn() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-black mb-6" style={{fontFamily: 'Inter'}}>
          Learn About Presence
        </h1>
        
        <Tabs defaultValue="faq" className="mt-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="safety">Safety Policies</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="mt-8">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">What is Presence?</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Presence is a verified connection platform for real human conversation. It's not dating, not social media, and not AI — just real people having meaningful conversations in a safe, structured environment.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">How does verification work?</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  All Hosts complete photo and video verification (headshot, full-length photo, and 10-30 second intro video), agree to the Community Pledge, and connect their Stripe account before approval. This ensures every conversation happens with a verified, trusted individual.
                </AccordionContent>

              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">Are sessions recorded?</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  No. Video and audio are never recorded. However, session events (start time, end time, duration) are logged for safety audits and quality assurance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold">What are conversation templates?</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Templates are guided prompts that help structure conversations, remove awkwardness, and ensure respectful dialogue. Both Members and Hosts see the same prompts for shared context.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="templates" className="mt-8 space-y-6">
            <div className="border-l-4 border-[#4285B9] pl-6">
              <h3 className="text-xl font-bold mb-2">Icebreaker Templates</h3>
              <p className="text-gray-700 mb-2">"What made you join Presence today?"</p>
              <p className="text-gray-700">"Tell me about something you're looking forward to."</p>
            </div>

            <div className="border-l-4 border-[#E53935] pl-6">
              <h3 className="text-xl font-bold mb-2">Guidance Templates</h3>
              <p className="text-gray-700 mb-2">"Share one thing that made you smile this week."</p>
              <p className="text-gray-700">"What's a challenge you're currently navigating?"</p>
            </div>

            <div className="border-l-4 border-[#4285B9] pl-6">
              <h3 className="text-xl font-bold mb-2">Reflection Templates</h3>
              <p className="text-gray-700 mb-2">"If you could relive one day, which would it be?"</p>
              <p className="text-gray-700">"What's something you've learned recently?"</p>
            </div>
          </TabsContent>

          <TabsContent value="safety" className="mt-8 space-y-6">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">Our Safety Commitment</h2>
              <p className="text-gray-700 mb-4">
                Presence is built on trust, verification, and respect. Every feature is designed with safety as the foundation.
              </p>

              <h3 className="text-xl font-bold mb-3">Verification Standards</h3>
              <ul className="text-gray-700 space-y-2 mb-6">
                <li>Headshot photo verification</li>
                <li>Full-length photo verification</li>
                <li>10-30 second intro video (mandatory)</li>
                <li>Community Pledge agreement</li>
                <li>Stripe Connect account linking</li>
                <li>Behavioral screening and background review</li>
                <li>Ongoing performance monitoring</li>
              </ul>


              <h3 className="text-xl font-bold mb-3">Session Safety</h3>
              <ul className="text-gray-700 space-y-2 mb-6">
                <li>No recording of video or audio</li>
                <li>Virtual environments protect real identities</li>
                <li>No file sharing or downloads permitted</li>
                <li>Instant reporting tools available during sessions</li>
              </ul>

              <h3 className="text-xl font-bold mb-3">Moderation & Enforcement</h3>
              <ul className="text-gray-700 space-y-2">
                <li>24/7 admin monitoring with SMS alerts</li>
                <li>Automatic suspension for misconduct</li>
                <li>Rating system ensures accountability</li>
                <li>Zero tolerance for harassment or abuse</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <Footer />
    </div>
  );
}
