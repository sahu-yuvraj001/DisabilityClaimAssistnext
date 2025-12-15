"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <section className="bg-[#00184E] text-white py-16 px-6 md:px-20 mb-10">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          About <span className="text-sky-400">DisabilityClaimAssist</span>
        </h1>

        <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg">
          Navigating the SSDI process alone can feel overwhelming. We help
          individuals with disabilities connect with compassionate, qualified
          professionals who fight for their rights.
        </p>
      </motion.div>

      {/* MISSION SECTION */}
      <div className="max-w-6xl mx-auto mt-16 grid gap-12 md:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Image
            src="/aboutus.jpg"
            alt="Helping Hands"
            width={600}
            height={420}
            className="rounded-2xl shadow-lg w-full object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-sky-400">
            Our Mission
          </h2>

          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            We believe everyone deserves a clear path to the benefits they are
            entitled to. Our mission is to remove barriers and connect people
            with trusted SSDI professionals who care.
          </p>
        </motion.div>
      </div>

      {/* VALUES */}
      <div className="max-w-6xl mx-auto mt-20 grid gap-8 sm:grid-cols-2 md:grid-cols-3 text-center">
        {[
          {
            title: "Access",
            text:
              "We believe in access, not obstacles. A simple, fast, and free way to connect with SSDI experts.",
          },
          {
            title: "Integrity",
            text:
              "We partner only with trusted professionals who treat clients with dignity and respect.",
          },
          {
            title: "Compassion",
            text:
              "We put people first, offering an empathetic and transparent experience.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="bg-[#012A80] p-8 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-3 text-sky-400">
              {item.title}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <h3 className="text-xl sm:text-2xl font-semibold mb-6">
          Together, we can make a difference.
        </h3>

        <Link
          href="/survey"
          className="inline-block bg-red-600 text-white px-8 py-3 rounded-full font-medium hover:bg-sky-400 transition"
        >
          Contact Us
        </Link>
      </motion.div>
    </section>
  );
}
