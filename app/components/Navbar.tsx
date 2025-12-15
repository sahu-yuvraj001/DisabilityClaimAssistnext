"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="relative z-50 flex justify-between items-center px-6 md:px-16 py-4 bg-white shadow-sm">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold text-[#001A54] tracking-wide"
      >
        Disability<span className="text-blue-500">ClaimAssist</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-[#001A54] font-medium">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <Link href="/about" className="hover:text-red-600">About</Link>

        {pathname === "/survey" ? (
          <p className="font-semibold text-lg">📞 (855) 536-4572</p>
        ) : (
          <Link href="/survey">
            <button className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition">
              See if you qualify
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Button */}
      <button
        className="md:hidden text-[#001A54]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg py-4 md:hidden">
          <div className="px-6 flex flex-col gap-3">
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          </div>

          <div className="border-t mt-3 pt-3 px-6">
            {pathname === "/survey" ? (
              <p className="font-semibold text-lg">📞 (855) 536-4572</p>
            ) : (
              <Link href="/survey">
                <button className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition">
                  See if you qualify
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
