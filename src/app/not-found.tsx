import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist on CampaignPulse.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F5] text-[#1F2937] selection:bg-[#0E7C86]/20">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center">
        {/* Friendly Error Icon & Badge */}
        <div className="w-16 h-16 rounded-3xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-black text-2xl mb-6 shadow-sm border border-[#0E7C86]/20">
          404
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight mb-3">
          We Couldn&rsquo;t Find That Page
        </h1>

        <p className="text-base text-[#4B5563] max-w-md mx-auto mb-8 leading-relaxed">
          The link you followed might be broken, expired, or typed incorrectly. Don&rsquo;t worry, your marketing campaign plans are safe!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-[#0E7C86] hover:bg-[#0a5f67] shadow-lg shadow-[#0E7C86]/25 transition-all min-h-[44px] flex items-center justify-center"
          >
            &larr; Return to Home
          </Link>

          <Link
            href="/#sample-calendar"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-semibold text-sm text-[#1F2937] bg-white border border-[#F3E8E2] hover:bg-[#F3E8E2] transition-all min-h-[44px] flex items-center justify-center"
          >
            Explore Sample Calendar
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

