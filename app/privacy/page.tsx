"use client";

import { useRouter } from "next/navigation";
import React from "react";

const PrivacyPage = () => {
  const router = useRouter();

  const sections = [
    { label: "Consent to Electronic Communications (E-Consent)", id: "section-1" },
    { label: "About Us and Our Purpose", id: "section-2" },
    { label: "Consent to SMS, Text & Push Notifications.", id: "section-3" },
    { label: "Compliance with Do-Not-Call Registry", id: "section-4" },
    { label: "General Collection and Use of Information", id: "section-5" },
    { label: "How Consumer Information is Shared", id: "section-6" },
    { label: "California's 'Shine the Light'", id: "section-7" },
    { label: "Opt-Out Rights", id: "section-8" },
    { label: "Information Retention and Right to Delete", id: "section-9" },
    { label: "Right to Not Be Discriminated Against", id: "section-10" },
    { label: "Underage Users and Children's Privacy", id: "section-11" },
    { label: "Security", id: "section-12" },
    { label: "Surveys", id: "section-13" },
    { label: "Cookies", id: "section-14" },
    { label: "Links", id: "section-15" },
    { label: "Update or Correct Your Information", id: "section-16" },
    { label: "Notifications of Changes", id: "section-17" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-[80%] mx-auto flex my-10 flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-[25%] hidden lg:flex flex-col mx-6 px-4 h-auto bg-[#F8F8F8] sticky top-20">
        {sections.map((section, index) => (
          <button
            key={index}
            className="border-t text-lg py-5 font-bold text-start hover:bg-gray-200 transition"
            onClick={() => scrollToSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="lg:w-[70%] md:w-[90%] rounded-md mr-auto flex flex-col justify-center items-start bg-[#fff] text-[#000000] shadow-xl text-[18px] py-8 px-4 md:px-16">
        <h1 className="text-[32px] lg:text-[64px] md:text-[46px] font-bold mb-4">
          Privacy Policy
        </h1>
        <div className="flex flex-col gap-2 mb-8">
          <p>Last Updated: 10-05-2024</p>
          <p>A1 Media LLC (1735 Buford Hwy, Ste 215-225, Cumming GA 30041)</p>
          <p>
            The purpose of this Privacy Policy is to describe the type of
            information collected by this website and to explain how we collect,
            use and distribute any personal information you may provide to us.
            It also describes how you may access and update any information you
            have provided, as well as how you can choose to have your personal
            information deleted from our company records. In addition to both
            state and federal regulations, we are also guided by certain
            industry standards, which are designed to enhance trust among
            consumers and online merchants or service providers. By adhering to
            all of the above mentioned requirements, we can ensure that we treat
            consumers with respect and use fair, non-abusive information
            collection practices.
          </p>
          <p>
            It is our goal to ensure that you feel safe and secure when you use
            our website. Any time you visit or use this site, you are agreeing
            to this Privacy Policy. If you do not agree with the Policy, or how
            we use your information, we ask that you do not use this website or
            submit any personal information. We may change this policy from time
            to time by updating this page without any notice.
          </p>
          <p>
            Any questions regarding our Privacy Policy or information collection
            practices should be sent to us via email at{" "}
            <span
              onClick={() => router.push("/contact")}
              className="text-blue-700 underline cursor-pointer"
            >
              contact@DisabilityClaimAssist.com
            </span>
          </p>
        </div>

        {/* Render all sections */}
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-2 mb-6" id={section.id}>
            <h2 className="text-[28px] md:text-[32px] font-bold mb-2">
              {section.label}
            </h2>
            {/* Add the content here. For brevity, only placeholders are included.
                You can copy all your existing paragraphs for each section. */}
            <p className="text-gray-700">
              {/* Replace with actual section content */}
              Content for {section.label} goes here.
            </p>
          </div>
        ))}

        {/* Contact Info at the end */}
        <div className="mt-6">
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
      </div>
    </div>
  );
};

export default PrivacyPage;
