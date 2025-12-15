"use client";

import { useRouter } from "next/navigation";
import { JSX, useState } from "react";

type Section = {
  id: string;
  title: string;
  summary: string;
  content: (router: ReturnType<typeof useRouter>) => string | JSX.Element;
};

const TermsPage = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const router = useRouter();

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const sections: Section[] = [
    {
      id: "section-1",
      title: "Products and Services",
      summary: "Overview of products and services DisabilityClaimAssist connects you with.",
      content: () =>
        `DisabilityClaimAssist is not an insurance provider. We connect you with qualified advocates, law firms, and service providers who specialize in Social Security Disability claims. You remain responsible for choosing the service provider, while we simplify the process of finding qualified professionals.`,
    },
    {
      id: "section-8",
      title: "Privacy",
      summary: "How your personal information is handled.",
      content: (router) => (
        <>
          DisabilityClaimAssist&apos;s Privacy Policy governs how your data is used. Our policy ensures your data is only shared with qualified service providers when necessary to assist with your disability claim. For more details, visit{" "}
          <span
            onClick={() => router.push("/privacy")}
            className="text-blue-700 underline cursor-pointer"
          >
            DisabilityClaimAssist.com/privacy
          </span>
          .
        </>
      ),
    },
    {
      id: "section-18",
      title: "Contact Information",
      summary: "How to contact us.",
      content: (router) => (
        <div className="space-y-2">
          <p>DisabilityClaimAssist is happy to answer your questions or concerns.</p>
          <p className="font-semibold">Mailing Address:</p>
          <p>DisabilityClaimAssist</p>
          <p>1735 Buford Hwy, Ste 215-225</p>
          <p>Cumming, GA 30041</p>
          <p className="font-semibold">
            Email:{" "}
            <span
              onClick={() => router.push("/contact")}
              className="text-blue-700 underline cursor-pointer"
            >
              contact@DisabilityClaimAssist.com
            </span>
          </p>
        </div>
      ),
    },
    // Add other sections in same format
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-1/4 bg-white shadow-md sticky top-0 h-screen p-6 space-y-2 overflow-y-auto">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => toggleSection(sec.id)}
            className={`text-left p-2 rounded-md font-medium hover:bg-red-50 transition ${
              openSection === sec.id ? "bg-red-100 font-bold" : ""
            }`}
          >
            {sec.title}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="lg:w-3/4 w-full p-6 lg:p-12 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
        <p className="text-gray-600">Last Updated: 10-05-2024</p>
        <p className="text-gray-700 leading-relaxed mb-8">
          Global Web Marketing LLC (3200 Kirkwood Highway #1060, Wilmington, DE 19808) (“we” or “our”) owns and operates DisabilityClaimAssist.Com. By using this site, you accept and agree to these Terms and Conditions.
        </p>

        {sections.map((sec) => (
          <div key={sec.id} id={sec.id} className="border-b pb-4">
            {/* Title and Summary */}
            <div
              onClick={() => toggleSection(sec.id)}
              className="cursor-pointer w-full flex justify-between items-center py-2"
            >
              <div>
                <h2 className="font-semibold text-lg md:text-xl">{sec.title}</h2>
                <p className="text-gray-600 text-sm md:text-base">{sec.summary}</p>
              </div>
              <span className="text-red-600 font-bold text-2xl">
                {openSection === sec.id ? "−" : "+"}
              </span>
            </div>

            {/* Full Content */}
            {openSection === sec.id && (
              <div className="mt-2 text-gray-700 leading-relaxed space-y-2">
                {sec.content(router)}
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default TermsPage;
