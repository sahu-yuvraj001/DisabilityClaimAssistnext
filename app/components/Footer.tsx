"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#00184E] text-white py-12 px-6 md:px-20">
      {/* Top Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 text-center md:text-left"
      >
        {/* Legal */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Legal</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link
                href="/terms"
                className="hover:text-white transition"
              >
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-white transition"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Contact</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a
                href="tel:8555364572"
                className="hover:text-white transition"
              >
                (855) 536-4572
              </a>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Bottom */}
      <div className="border-t border-gray-600 mt-10 pt-5 text-center text-gray-300 text-sm">
        © 2025 Disability Claim Assist.
      </div>
    </footer>
  );
}
