"use client"; // Required if using client-side state in Next.js 13+ App Router

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What does Disability Claim Assist do?",
    answer:
      "Disability Claim Assist is a service that connects people who may qualify for Social Security Disability benefits with experienced advocates, case managers, or law firms. We help simplify the first step — reviewing your situation and getting you connected with professionals who can guide you through the SSDI application or appeal process.",
  },
  {
    question: "Do you provide legal representation?",
    answer:
      "No. Disability Claim Assist does not provide legal advice or representation. Our role is to help match you with qualified professionals who specialize in SSDI cases. If you choose to work with them, they will handle the application, review, and appeals process directly with you.",
  },
  {
    question: "How much does this service cost?",
    answer:
      "Our qualification review and referral service is free. If you decide to work with a disability advocate or attorney, fees are typically only collected if your case is approved, and they are regulated by the Social Security Administration.",
  },
  {
    question: "Is my information secure?",
    answer:
      "Yes. Your information is protected and only shared with qualified SSDI partners when necessary to help review your case. We do not sell or misuse personal data. Your privacy is always respected.",
  },
  {
    question: "Who do you help?",
    answer:
      "We assist individuals who are unable to work due to a medical condition that is expected to last 12 months or longer. If you're unsure whether you qualify, our team can help determine your eligibility in just a few minutes.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#F9FAFB] py-16 px-6 md:px-20 text-[#00184E]">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Everything you need to know about DisabilityClaimAssist
        </motion.p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 cursor-pointer transition hover:shadow-md"
            onClick={() => toggleFAQ(index)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              {openIndex === index ? (
                <ChevronUp className="text-[#00184E]" />
              ) : (
                <ChevronDown className="text-[#00184E]" />
              )}
            </div>

            {openIndex === index && (
              <motion.p
                className="text-gray-600 mt-3 text-base leading-relaxed"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
