"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import BenefitSection from "./components/BenefitSection";
import FAQ from "./components/FAQ";



export default function Home() {
  return (
    <>
    <head>
        <title>Claim Social Security Benefits Quickly and Easily | Advocate</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-16 bg-[#E9F5FF] min-h-screen">

        {/* Left Content */}
        <motion.div
          className="flex-1 mb-10 md:mb-0"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-[40px] md:text-[80px] font-semibold text-[#001A54] leading-tight max-w-3xl mb-6">
            Social Security Disability (SSDI) Assistance
          </h1>

          <p className="text-[24px] md:text-[32px] text-[#001A54] max-w-2xl mb-10">
            If your medical condition limits your ability to work for a full year,
            you might be entitled to Social Security Disability Insurance (SSDI) Benefits.
          </p>

          <Link href="/survey">
            <button className="bg-red-600 text-white px-8 py-3 text-lg font-semibold rounded-md hover:bg-red-700">
              See if you qualify
            </button>
          </Link>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src="/disable2.jpg"
            alt="Supportive people"
            width={500}
            height={440}
            className="rounded-xl shadow-lg object-cover"
            priority
          />
        </motion.div>
      </section>
      <BenefitSection />
      <FAQ/>

    </>
  );
}
