"use client"; // Required in Next.js 13 App Router for client-side code

import { motion } from "framer-motion";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-4xl font-bold text-green-600 mb-2">Thank You!</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          You're Pre-Qualified!
        </h2>

        <p className="text-gray-600 mb-6">
          To Access This Affordable Health Insurance Offer
        </p>

        <a
          href="tel:18555364572"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all shadow-md"
        >
          📞 Click To Call Now
        </a>

        <p className="mt-4 text-gray-800 font-semibold text-xl">(855) 536-4572</p>
      </motion.div>
    </div>
  );
};

export default ThankYou;
