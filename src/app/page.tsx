import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SampleCalendarPreview from "@/components/SampleCalendarPreview";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F5] text-[#1F2937]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#0E7C86]/5 to-transparent pointer-events-none rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E7C86]/10 border border-[#0E7C86]/20 text-[#0E7C86] text-xs sm:text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF6B5B] animate-pulse"></span>
            Built for Small Business Owners
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#1F2937] leading-[1.15] mb-6">
            Your Marketing Calendar,{" "}
            <span className="text-[#0E7C86]">Planned &amp; Written</span> by AI
            in Minutes.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#4B5563] max-w-3xl mx-auto font-normal leading-relaxed mb-10">
            Never wonder what to post again. Turn a few simple details about your
            business and goals into an editable, ready-to-execute campaign calendar
            with tailored social copy, ad scripts, and creative direction.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/auth/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white bg-[#0E7C86] hover:bg-[#0a5f67] shadow-lg shadow-[#0E7C86]/25 hover:shadow-xl transition-all"
            >
              Start Free Campaign &rarr;
            </Link>
            <Link
              href="/#sample-calendar"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl font-semibold text-base text-[#1F2937] bg-white border border-[#F3E8E2] hover:bg-[#F3E8E2] transition-all"
            >
              See Sample Calendar
            </Link>
          </div>

          {/* Demo Quick Access Banner */}
          <div className="inline-block bg-white border border-[#F3E8E2] rounded-2xl p-4 shadow-sm text-left max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg bg-[#0E7C86]/15 text-[#0E7C86] text-xs font-bold uppercase tracking-wider">
                Live Demo
              </span>
              <p className="text-xs text-[#4B5563]">
                Want to test before signing up?{" "}
                <Link
                  href="/auth/login"
                  className="text-[#0E7C86] font-semibold underline underline-offset-2"
                >
                  Try the interactive demo (no password required) &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three-Step 'How It Works' Section */}
      <section
        id="how-it-works"
        className="py-20 bg-white border-y border-[#F3E8E2]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-wider text-[#0E7C86] mb-2">
              Three Simple Steps
            </p>
            <h2 className="text-3xl font-extrabold text-[#1F2937] tracking-tight">
              From Idea to Published Campaign
            </h2>
            <p className="text-base text-[#4B5563] mt-3">
              No marketing degree required. Just answer a few quick questions and let our AI handle the planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative bg-[#FFF9F5] rounded-3xl border border-[#F3E8E2] p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0E7C86] text-white flex items-center justify-center font-extrabold text-lg mb-6 shadow-md shadow-[#0E7C86]/20">
                  1
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-3">
                  Share Your Business Brief
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Enter your business name, what you sell, your audience, goal, and how many weeks you want to run. Or click &ldquo;Try an example&rdquo; to test with one click.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F3E8E2] text-xs font-semibold text-[#0E7C86]">
                &bull; Saves to your Brand Profile
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative bg-[#FFF9F5] rounded-3xl border border-[#F3E8E2] p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B5B] text-white flex items-center justify-center font-extrabold text-lg mb-6 shadow-md shadow-[#FF6B5B]/20">
                  2
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-3">
                  AI Builds Your Dated Calendar
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Google Gemini calculates your posting cadence, assigns channels (Instagram, Facebook, Email, Ads), and crafts tailored titles and ideas for every single date.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F3E8E2] text-xs font-semibold text-[#FF6B5B]">
                &bull; Includes seasonal &amp; holiday moments
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative bg-[#FFF9F5] rounded-3xl border border-[#F3E8E2] p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0E7C86] text-white flex items-center justify-center font-extrabold text-lg mb-6 shadow-md shadow-[#0E7C86]/20">
                  3
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-3">
                  Edit &amp; Generate Ready-to-Post Copy
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Click any post on your calendar to instantly write 3 content ideas, 15/30/60-second video ad scripts, email copy, and full creative briefs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F3E8E2] text-xs font-semibold text-[#0E7C86]">
                &bull; Export to CSV or print as PDF
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Calendar Preview Section */}
      <section id="sample-calendar" className="py-20 bg-[#FFF9F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-[#0E7C86] mb-2">
              See It In Action
            </p>
            <h2 className="text-3xl font-extrabold text-[#1F2937] tracking-tight">
              Sample 4-Week Campaign Calendar
            </h2>
            <p className="text-base text-[#4B5563] mt-2">
              Here is what an AI-generated calendar looks like for a neighborhood artisan bakery.
            </p>
          </div>

          <SampleCalendarPreview />
        </div>
      </section>

      {/* Core Features & Value Pillars */}
      <section id="features" className="py-20 bg-white border-t border-[#F3E8E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-wider text-[#0E7C86] mb-2">
              Tailored for Small Businesses
            </p>
            <h2 className="text-3xl font-extrabold text-[#1F2937] tracking-tight">
              Everything You Need to Run Professional Campaigns
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#FFF9F5] border border-[#F3E8E2]">
              <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-bold mb-4">
                📅
              </div>
              <h3 className="font-bold text-base text-[#1F2937] mb-2">
                Month, Week &amp; List Views
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Color-coded by channel. Click to edit, drag items to new dates, or add and duplicate posts with one click.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFF9F5] border border-[#F3E8E2]">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B5B]/10 text-[#FF6B5B] flex items-center justify-center font-bold mb-4">
                ✍️
              </div>
              <h3 className="font-bold text-base text-[#1F2937] mb-2">
                Built-in AI Copywriter
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Generate 3 content ideas, ad scripts with visual cues, email subject lines, and social captions with hashtags.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFF9F5] border border-[#F3E8E2]">
              <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-bold mb-4">
                📋
              </div>
              <h3 className="font-bold text-base text-[#1F2937] mb-2">
                Brand Profile Reuse
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Save your business brief and brand voice once. Reuse it effortlessly whenever you launch a new seasonal campaign.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFF9F5] border border-[#F3E8E2]">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B5B]/10 text-[#FF6B5B] flex items-center justify-center font-bold mb-4">
                📤
              </div>
              <h3 className="font-bold text-base text-[#1F2937] mb-2">
                Export to CSV &amp; PDF
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Download your completed campaign as an Excel/Google Sheets CSV or save a print-friendly visual PDF to share with your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 bg-gradient-to-br from-[#0E7C86] to-[#0a5f67] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Take the Stress Out of Marketing?
          </h2>
          <p className="text-base sm:text-lg text-emerald-50 max-w-2xl mx-auto leading-relaxed">
            Create your free account today and generate your first full marketing campaign calendar in less than five minutes.
          </p>
          <div className="pt-4">
            <Link
              href="/auth/signup"
              className="inline-block px-8 py-4 rounded-2xl font-bold text-base text-[#0E7C86] bg-white hover:bg-emerald-50 shadow-xl transition-all"
            >
              Get Started Free &mdash; No Credit Card Required
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
