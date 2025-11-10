// app/components/TopNavBar.tsx
"use client";

import { link } from "fs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SearchModal from "../SearchModal";

const NAV_LINKS = [
  { href: "/flashcard", label: "Flashcards" },
  { href: "/stats", label: "Stats" },
  { href: "/profile", label: "Profile" },
];

export default function TopNavBar() {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const pathname = usePathname();

  const linkBase =
    "px-3 py-2 rounded-md text-sm font-medium transition hover:text-gray-900 hover:bg-gray-100";
  const linkActive = "text-gray-900 bg-gray-100";
  const linkInactive = "text-gray-600";

  console.log(openSearch);

  return (
    <header className="sticky z-40 w-full border-b bg-white/80">
      <nav
        className="flex items-center justify-between px-4 py-3 md:px-6"
        aria-label="Global"
      >
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900"
          >
            Vocab Tracker
          </Link>
        </div>

        {/* Right: Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <div
            onClick={() => setOpenSearch(true)}
            className={`${linkBase} text-gray-600`}
          >
            Search
          </div>
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`${linkBase} ${isActive ? linkActive : linkInactive}`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {openSearch && <SearchModal setOpenSearch={setOpenSearch} />}

        {/* Mobile: Hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {/* icon */}
          <svg
            className={`h-6 w-6 ${open ? "hidden" : "block"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            className={`h-6 w-6 ${open ? "block" : "hidden"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t bg-white transition-[max-height,opacity] duration-200 ease-out overflow-hidden ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          <div
            onClick={() => setOpenSearch(true)}
            className={`${linkBase} text-gray-600`}
          >
            Search
          </div>
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`block ${linkBase} ${isActive ? linkActive : linkInactive}`}
                onClick={() => setOpen((prev) => !prev)}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
