"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Logo from "./Logo";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface NavUser {
  id?: string;
  email?: string;
}

export default function Navbar() {
  const [user, setUser] = useState<NavUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      } else {
        // Check for guest cookie
        const hasGuest = document.cookie.includes("cp_guest_session=active");
        if (hasGuest) {
          setUser({ email: "Guest User" });
        }
      }
      setLoading(false);
    }
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Handle Escape key to close mobile menu and return focus to hamburger button
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  async function handleLogout() {
    await supabase.auth.signOut().catch(() => {});
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setUser(null);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F5]/90 backdrop-blur-md border-b border-[#F3E8E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo size="md" />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#4B5563]">
          <Link href="/#how-it-works" className="hover:text-[#0E7C86] transition-colors">
            How It Works
          </Link>
          <Link href="/#sample-calendar" className="hover:text-[#0E7C86] transition-colors">
            Sample Calendar
          </Link>
          <Link href="/#features" className="hover:text-[#0E7C86] transition-colors">
            Features
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="w-20 h-9 bg-[#E5E7EB]/60 rounded-xl animate-pulse"></div>
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2.5 rounded-xl font-semibold text-sm text-[#0E7C86] bg-[#0E7C86]/10 hover:bg-[#0E7C86]/20 transition-all"
              >
                My Campaigns
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-xl font-medium text-sm text-[#4B5563] hover:text-[#1F2937] hover:bg-[#F3E8E2] transition-all"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-4 py-2.5 rounded-xl font-semibold text-sm text-[#1F2937] hover:text-[#0E7C86] hover:bg-[#F3E8E2] transition-all"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-[#0E7C86] hover:bg-[#0a5f67] shadow-sm shadow-[#0E7C86]/25 transition-all"
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          ref={hamburgerRef}
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-menu"
          className="md:hidden p-2.5 rounded-xl text-[#4B5563] hover:bg-[#F3E8E2] focus-visible:ring-2 focus-visible:ring-[#0E7C86] focus-visible:outline-hidden min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="md:hidden bg-[#FFF9F5] border-b border-[#F3E8E2] px-4 pt-2 pb-6 space-y-3"
        >
          <Link
            href="/#how-it-works"
            onClick={() => {
              setMobileMenuOpen(false);
              hamburgerRef.current?.focus();
            }}
            className="block py-2.5 text-base font-medium text-[#4B5563] min-h-[44px] flex items-center"
          >
            How It Works
          </Link>
          <Link
            href="/#sample-calendar"
            onClick={() => {
              setMobileMenuOpen(false);
              hamburgerRef.current?.focus();
            }}
            className="block py-2.5 text-base font-medium text-[#4B5563] min-h-[44px] flex items-center"
          >
            Sample Calendar
          </Link>
          <Link
            href="/#features"
            onClick={() => {
              setMobileMenuOpen(false);
              hamburgerRef.current?.focus();
            }}
            className="block py-2.5 text-base font-medium text-[#4B5563] min-h-[44px] flex items-center"
          >
            Features
          </Link>
          <div className="pt-3 border-t border-[#F3E8E2] flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    hamburgerRef.current?.focus();
                  }}
                  className="w-full text-center py-3 rounded-xl font-semibold text-sm text-white bg-[#0E7C86] min-h-[44px] flex items-center justify-center"
                >
                  My Campaigns
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                    hamburgerRef.current?.focus();
                  }}
                  className="w-full text-center py-2.5 rounded-xl font-medium text-sm text-[#4B5563] bg-white border border-[#F3E8E2] min-h-[44px] flex items-center justify-center cursor-pointer"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    hamburgerRef.current?.focus();
                  }}
                  className="w-full text-center py-2.5 rounded-xl font-semibold text-sm text-[#1F2937] border border-[#F3E8E2] bg-white min-h-[44px] flex items-center justify-center"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    hamburgerRef.current?.focus();
                  }}
                  className="w-full text-center py-3 rounded-xl font-semibold text-sm text-white bg-[#0E7C86] min-h-[44px] flex items-center justify-center"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

