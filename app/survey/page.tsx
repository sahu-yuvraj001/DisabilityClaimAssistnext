"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Script from "next/script";

const Survey = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [qualified, setQualified] = useState(true);
  const [finished, setFinished] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [agree, setAgree] = useState(false);
  const [trustedFormCert, setTrustedFormCert] = useState("");

  const questions = [
    {
      type: "multiple",
      question:
        "Are you currently receiving social security disability benefits?",
      options: ["Yes", "No"],
      key: "working_status",
    },
    {
      type: "multiple",
      question:
        "Are you out of work for atleast a year due to an injury or disability?",
      options: ["Yes", "No"],
      key: "work_hours",
    },
    {
      type: "multiple",
      question: "Have you worked atleast 5 out of the last 10 years?",
      options: ["Yes", "No"],
      key: "job_duration",
    },
    {
      type: "multiple",
      question:
        "Have you seen a doctor for this specific issue in the past year?",
      options: ["Yes", "No"],
      key: "work_years",
    },
    {
      type: "message",
      message:
        "So far, your odds of qualifying look good. Based on your work history, it looks like you’ve met a crucial eligibility requirement for Social Security DisabilityClaimAssist .",
    },
    {
      type: "text",
      question:
        "Let’s keep going to see if you qualify. First, what is your name?",
      key: "name",
    },
    {
      type: "multiple",
      question: `Nice to meet you, ${
        name || "friend"
      }. So far, what’s happened in your application process? It’ll help us serve you better if we know where you are in the process. Select all that apply.`,
      options: [
        "I haven’t applied yet",
        "I submitted an application",
        "I got a denial notice (or two)",
        "I have an upcoming hearing",
      ],
      key: "application_status",
    },
    {
      type: "multiple",
      question:
        "Are you currently working with a lawyer on your DisabilityClaimAssist claim?",
      options: ["Yes", "No"],
      key: "lawyer_status",
    },
    {
      type: "form",
    },
  ];

  const handleAnswer = (key: string, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    // Disqualify conditions
    if (key === "work_years" && value === "No") {
      setQualified(false);
      setFinished(true);
      return;
    }

    if (key === "lawyer_status" && value === "Yes") {
      setQualified(false);
      setFinished(true);
      return;
    }

    // ✅ After last question, go to the form step instead of finishing
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // instead of finishing, show form step
      setStep(step + 1); // 👈 this goes to the "form" type question
    }
  };
  useEffect(() => {
    // Wait for form to mount
    setTimeout(() => {
      // Inject TrustedForm Script
      const trustedScript = document.createElement("script");
      trustedScript.type = "text/javascript";
      trustedScript.async = true;
      trustedScript.src =
        "https://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&ping=0";
      document.body.appendChild(trustedScript);
    }, 500);

    // Inject Jornaya LeadID Script
    const leadScript = document.createElement("script");
    leadScript.id = "LeadiDscript";
    leadScript.type = "text/javascript";
    leadScript.async = true;
    leadScript.src =
      "//create.lidstatic.com/campaign/cc646acd-e437-e89d-0268-c2f00a16645e.js?snippet_version=2";
    document.body.appendChild(leadScript);

    // Cleanup
    return () => {
      document
        .querySelectorAll("script[src*='trustedform']")
        .forEach((el) => el.remove());
      document
        .querySelectorAll("script[src*='lidstatic']")
        .forEach((el) => el.remove());
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 🟦 Handle form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ Basic Validation
    if (!formData.firstName.trim()) {
      alert("Please enter your first name.");
      return;
    }

    if (!formData.lastName.trim()) {
      alert("Please enter your last name.");
      return;
    }

    if (!formData.dob.trim()) {
      alert("Please select your date of birth.");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!formData.address.trim()) {
      alert("Please enter your street address.");
      return;
    }

    if (!formData.city.trim()) {
      alert("Please enter your city.");
      return;
    }

    if (!formData.state.trim()) {
      alert("Please select your state.");
      return;
    }

    if (!formData.zip.trim()) {
      alert("Please enter your ZIP code.");
      return;
    }
    const zipPattern = /^[0-9]{5}$/;
    if (!zipPattern.test(formData.zip.trim())) {
      alert("Please enter a valid 5-digit ZIP code.");
      return;
    }

    if (!agree) {
      alert("Please agree to the terms before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);
      const leadidToken =
        (document.getElementById("leadid_token") as HTMLInputElement | null)
          ?.value || "";

      const trustedFormCertUrl =
        (
          document.getElementById(
            "xxTrustedFormCertUrl"
          ) as HTMLInputElement | null
        )?.value || "";
      const leadPayload = {
        productId: "265",
        price: "0.01",
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        dob: formData.dob.trim(),
        emailAddress: formData.email.trim(),
        phoneNumber: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        zipCode: formData.zip.trim(),
        webSiteUrl: "disabilityclaimassist.com",
        leadid_token: leadidToken,
        trustedform_cert_url: trustedFormCertUrl,
      };

      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadPayload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Submission failed");
      }

      toast.success("✅ Form submitted successfully!");
      router.push("/thank-you");
    } catch (error) {
      console.error(error);
      toast.error("❌ Something went wrong. Redirecting...");
      router.push("/thank-you");
    } finally {
      setIsSubmitting(false); // ✅ Stop loading
    }
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));
  const currentQuestion = questions[step];

  return (
    <>
      <Script
        src="https://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&ping=0"
        strategy="afterInteractive"
      />

      <Script
        id="LeadiDscript"
        src="//create.lidstatic.com/campaign/cc646acd-e437-e89d-0268-c2f00a16645e.js?snippet_version=2"
        strategy="afterInteractive"
      />

      <ToastContainer position="top-center" autoClose={2000} />

      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[#001A54] px-6 py-10">
        <div className="max-w-2xl w-full text-center">
          {/* FINAL MESSAGE */}
          {finished && formSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-green-700">
                Your chances of qualifying: High ✅
              </h1>
              <p className="text-lg text-gray-700">
                We’re closed now, but call us any time between <br />
                <strong>6:30 PM and 8:30 AM Monday – Friday</strong> at <br />
                <span className="font-bold text-[#001A54]">(800) 674-8141</span>
                .
                <br />
                We’ll help you apply for benefits.
              </p>
              <button
                onClick={() => {
                  setStep(0);
                  setFinished(false);
                  setQualified(true);
                  setAnswers({});
                  setName("");
                  setFormSubmitted(false);
                  setFormData({
                    firstName: "",
                    lastName: "",
                    dob: "",
                    email: "",
                    phone: "",
                    address: "",
                    city: "",
                    state: "",
                    zip: "",
                  });
                }}
                className="mt-6 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
              >
                Start Over
              </button>
            </motion.div>
          )}

          {/* IF DISQUALIFIED */}
          {finished && !qualified && !formSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {answers.lawyer_status === "Yes" ? (
                <>
                  <h1 className="text-4xl font-bold text-sky-600">
                    You’re already working with a lawyer 👏
                  </h1>
                  <p className="text-lg text-gray-700">
                    That’s great! We wish you the best with your
                    DisabilityClaimAssist . If you ever need more assistance or
                    a second opinion, our team is here for you.
                  </p>
                  <div>
                    <button
                      onClick={() => {
                        setStep(0);
                        setFinished(false);
                        setQualified(true);
                        setAnswers({});
                        setName("");
                        setFormSubmitted(false);
                        setFormData({
                          firstName: "",
                          lastName: "",
                          dob: "",
                          email: "",
                          phone: "",
                          address: "",
                          city: "",
                          state: "",
                          zip: "",
                        });
                      }}
                      className="mt-6 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
                    >
                      Start Over
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-bold text-red-600">
                    We’re sorry 😔
                  </h1>
                  <p className="text-lg text-gray-700">
                    Based on your answers, you might not currently qualify. But
                    feel free to contact our team for help.
                  </p>
                  <button
                    onClick={() => {
                      setStep(0);
                      setFinished(false);
                      setQualified(true);
                      setAnswers({});
                    }}
                    className="mt-6 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
                  >
                    Connect with Atticus (It's 100% Free!)
                  </button>
                </>
              )}
            </motion.div>
          )}

          {/* QUESTIONS FLOW */}
          {!finished && (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentQuestion?.type === "multiple" &&
                  currentQuestion.key && (
                    <>
                      <h1 className="text-2xl md:text-3xl font-bold mb-8">
                        {currentQuestion.question}
                      </h1>
                      <div className="space-y-4">
                        {currentQuestion.options?.map((opt) => (
                          <button
                            key={opt}
                            onClick={() =>
                              handleAnswer(currentQuestion.key!, opt)
                            }
                            className="w-full border border-gray-300 rounded-lg py-3 text-lg font-medium
                     transition-all duration-300 ease-in-out
                     hover:bg-red-600 hover:text-white hover:border-blue-500
                     hover:-translate-x-2 hover:-translate-y-2"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                {questions[step].type === "message" && (
                  <>
                    <p className="text-lg mb-8">{questions[step].message}</p>
                    <button
                      onClick={() => setStep(step + 1)}
                      className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
                    >
                      Continue
                    </button>
                  </>
                )}
                {questions[step].type === "text" && (
                  <>
                    <h1 className="text-2xl md:text-3xl font-bold mb-8">
                      {questions[step].question}
                    </h1>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg py-3 px-4 text-lg mb-4 focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="Enter your name"
                    />
                    <button
                      onClick={() => setStep(step + 1)}
                      className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
                    >
                      Next
                    </button>
                  </>
                )}
                {questions[step].type === "form" && (
                  <form
                    onSubmit={handleFormSubmit}
                    className="space-y-6 text-left bg-white shadow-md rounded-xl p-8"
                  >
                    {/* Hidden Tracking Fields */}
                    <input
                      id="leadid_token"
                      name="universal_leadid"
                      type="hidden"
                      // value=""
                    />
                    <input
                      id="xxTrustedFormCertUrl"
                      name="xxTrustedFormCertUrl"
                      type="hidden"
                    />

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-red-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-red-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* DOB */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        DOB <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) =>
                          setFormData({ ...formData, dob: e.target.value })
                        }
                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>

                    {/* Phone + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          pattern="[0-9]{10}"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-red-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-red-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>

                    {/* City / State / Zip */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-red-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full border rounded-md p-2"
                        >
                          <option value="">Select State</option>
                          <option value="AL">Alabama</option>
                          <option value="AK">Alaska</option>
                          <option value="AZ">Arizona</option>
                          <option value="AR">Arkansas</option>
                          <option value="CA">California</option>
                          <option value="CO">Colorado</option>
                          <option value="CT">Connecticut</option>
                          <option value="DE">Delaware</option>
                          <option value="FL">Florida</option>
                          <option value="GA">Georgia</option>
                          <option value="HI">Hawaii</option>
                          <option value="ID">Idaho</option>
                          <option value="IL">Illinois</option>
                          <option value="IN">Indiana</option>
                          <option value="IA">Iowa</option>
                          <option value="KS">Kansas</option>
                          <option value="KY">Kentucky</option>
                          <option value="LA">Louisiana</option>
                          <option value="ME">Maine</option>
                          <option value="MD">Maryland</option>
                          <option value="MA">Massachusetts</option>
                          <option value="MI">Michigan</option>
                          <option value="MN">Minnesota</option>
                          <option value="MS">Mississippi</option>
                          <option value="MO">Missouri</option>
                          <option value="MT">Montana</option>
                          <option value="NE">Nebraska</option>
                          <option value="NV">Nevada</option>
                          <option value="NH">New Hampshire</option>
                          <option value="NJ">New Jersey</option>
                          <option value="NM">New Mexico</option>
                          <option value="NY">New York</option>
                          <option value="NC">North Carolina</option>
                          <option value="ND">North Dakota</option>
                          <option value="OH">Ohio</option>
                          <option value="OK">Oklahoma</option>
                          <option value="OR">Oregon</option>
                          <option value="PA">Pennsylvania</option>
                          <option value="RI">Rhode Island</option>
                          <option value="SC">South Carolina</option>
                          <option value="SD">South Dakota</option>
                          <option value="TN">Tennessee</option>
                          <option value="TX">Texas</option>
                          <option value="UT">Utah</option>
                          <option value="VT">Vermont</option>
                          <option value="VA">Virginia</option>
                          <option value="WA">Washington</option>
                          <option value="WV">West Virginia</option>
                          <option value="WI">Wisconsin</option>
                          <option value="WY">Wyoming</option>
                          <option value="DC">District of Columbia</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Zip <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.zip}
                          onChange={(e) =>
                            setFormData({ ...formData, zip: e.target.value })
                          }
                          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-red-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Agreement */}
                    <label className="flex items-start space-x-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        className="mt-1 w-5 h-5 bg-green-500"
                      />
                      <span>
                        By checking this box, I confirm that I have read and
                        agree to the{" "}
                        <a href="/privacy" className="text-red-600 underline">
                          Privacy Policy
                        </a>{" "}
                        and Terms of Service.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting} // disable while loading
                      className={`bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-all hover:cursor-pointer duration-200 ease-in-out active:scale-95 w-full font-semibold shadow-sm flex justify-center items-center gap-2 ${
                        isSubmitting
                          ? "cursor-not-allowed opacity-70"
                          : "hover:scale-105"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Submit & Continue →"
                      )}
                    </button>

                    <div className="bg-black text-white text-xs p-4 rounded-md leading-relaxed mt-4">
                      By pressing the “Submit” button above, I provide my
                      express written consent to be contacted by phone, email,
                      or text regarding disability benefits, even if my number
                      is on a do-not-call list. I understand I am not required
                      to provide consent as a condition of purchase.
                    </div>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {!finished && (
            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrev}
                disabled={step === 0}
                className={`text-gray-600 hover:text-red-600 ${
                  step === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                ← Previous
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Survey;
