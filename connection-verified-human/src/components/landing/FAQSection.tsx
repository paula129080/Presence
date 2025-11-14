import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQSection() {
  const faqs = [
    {
      q: "What is Presence?",
      a: "Presence is a verified human-connection network where you can have safe, structured 10-minute video chats with real people whenever you need someone to talk to."
    },
    {
      q: "How do I become a member?",
      a: "Sign up, complete photo and video verification, agree to the Community Pledge, and choose your plan. Then browse hosts and book your first session."
    },
    {
      q: "How do I become a host?",
      a: "Apply through our host signup, complete verification, set your availability, and start earning by being present for members who need connection."
    },
    {
      q: "Is it safe and verified?",
      a: "Yes. Every user submits photo, full-length image, and video verification. All sessions are moderated with tone-guided templates and community guidelines."
    },
    {
      q: "How are payments handled?",
      a: "All payments are processed securely through Stripe. Hosts receive payouts automatically, and members can choose between adhoc or weekly plans."
    },
    {
      q: "Can I rebook the same host?",
      a: "Absolutely! You can rebook your favorite hosts or explore new connections. Our platform makes it easy to maintain ongoing connections."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">FAQ</h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left text-lg">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-gray-600">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
