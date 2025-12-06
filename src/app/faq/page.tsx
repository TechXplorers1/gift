import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need to be home during the service?",
    answer: "You don't need to be home for an auto detailing service as long as we have access to the vehicle. For house cleaning, we prefer you to be home for the first visit to do a walkthrough, but for subsequent visits, we can arrange for access."
  },
  {
    question: "What products do you use? Are they safe for pets and children?",
    answer: "We prioritize using high-quality, eco-friendly, and biodegradable cleaning products that are safe for your family and pets. If you have specific concerns or allergies, please let us know in advance."
  },
  {
    question: "Can I reschedule my appointment?",
    answer: "Yes, you can. We kindly ask for at least 48 hours' notice for any rescheduling or cancellations. This allows us to adjust our team's schedule accordingly. Cancellations made less than 24 hours before the appointment may be subject to a fee."
  },
  {
    question: "What is your service area?",
    answer: "We proudly serve Portland, Oregon, and the surrounding areas within a 50-mile radius. If you're unsure whether you fall within our service area, please don't hesitate to contact us."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and online payments through our secure booking system. Payment is typically due upon completion of the service."
  }
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-muted-foreground">Find answers to common questions about our services.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-left text-lg hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
