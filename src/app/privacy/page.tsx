import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Turn a short business brief into an editable marketing calendar with AI-written content ideas, ad scripts, campaign copy, and creative briefs. Built for small-business owners.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F5] text-[#1F2937]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-3xl border border-[#F3E8E2] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-[#F3E8E2] pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C86]">
                Legal &bull; Transparency
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] mt-1">
                Privacy Policy
              </h1>
              <p className="text-xs text-[#6B7280] mt-1">
                Last updated: October 31, 2026
              </p>
            </div>
            <Link
              href="/"
              className="self-start sm:self-auto text-xs font-semibold text-[#0E7C86] hover:underline"
            >
              &larr; Return to Home Page
            </Link>
          </div>

          <div className="space-y-6 text-sm text-[#4B5563] leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                1. Who We Are
              </h2>
              <p>
                CampaignPulse is a demonstration product created by Group 53 for the Outskill AI Accelerator Hackathon. It is designed to assist small-business owners in generating structured marketing calendars, campaign ideas, ad scripts, social media copy, and creative briefs.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                2. Information We Collect
              </h2>
              <p>
                We collect information directly from you when you use the service, create an account, save a brand profile, or configure a marketing campaign. This information includes:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your email address.</li>
                <li>Your optional business name, industry classification, location, and website address.</li>
                <li>Your business brief, offerings, and details about products or services you sell.</li>
                <li>Your target audience description, age ranges, interests, and customer problems.</li>
                <li>Your selected campaign goals, custom objectives, budget preferences, start dates, and duration settings.</li>
                <li>Your chosen marketing channels (such as Instagram, Facebook, Email, Google Ads, TikTok, and LinkedIn).</li>
                <li>The marketing calendar dates, post titles, content angles, and artificial intelligence content generated for your account.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                3. How We Use Information
              </h2>
              <p>
                We use the collected information solely to operate, maintain, and provide the CampaignPulse service to you. This includes generating your tailored campaign calendar, drafting marketing copy, saving your campaign history, and enabling you to review previous work when you sign in. We do not use your information for unrelated purposes.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                4. Artificial Intelligence Processing
              </h2>
              <p>
                When you create a campaign or request ad scripts, social copy, ideas, or creative briefs, the business information you have entered is transmitted to the Google Gemini application programming interface (API) for text generation. Google processes this information to return customized marketing concepts and written copy tailored to your business profile.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                5. Where Data Is Stored and Third-Party Service Providers
              </h2>
              <p>
                We rely on third-party cloud infrastructure providers to host and operate CampaignPulse:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Supabase:</strong> Provides authentication services and PostgreSQL database infrastructure to store user accounts, brand profiles, campaigns, and calendar items.
                </li>
                <li>
                  <strong>Vercel:</strong> Provides cloud application hosting, deployment automation, and server execution.
                </li>
                <li>
                  <strong>Local Web Browser Storage:</strong> Your web browser local storage (localStorage) is used to preserve active session data, guest demo campaigns, and interface preferences.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                6. Cookies and Sessions
              </h2>
              <p>
                CampaignPulse uses only standard functional session cookies and authentication tokens necessary to keep you securely signed in to your account. We do not use third-party advertising cookies, behavioral tracking pixels, or cross-site commercial trackers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                7. We Do Not Sell Personal Information
              </h2>
              <p>
                We do not sell, rent, lease, or monetize your personal information, business briefs, or marketing materials to third parties or data brokers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                8. Data Retention and Deletion
              </h2>
              <p>
                You may request the complete deletion of your account, saved campaigns, and associated data at any time by sending an email to mark.sockness@gmail.com. In addition, please be aware that the shared public live demonstration account is a sandbox environment that may be reset, cleared, or refreshed at any time.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                9. Children
              </h2>
              <p>
                CampaignPulse is intended for small-business owners, entrepreneurs, and professional marketers. The service is not directed to or intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                10. Changes to This Privacy Policy
              </h2>
              <p>
                We may revise this Privacy Policy periodically to reflect enhancements to our service or changes in our operational practices. Any modifications will be posted directly on this page with an updated revision date.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                11. Contact Information
              </h2>
              <p>
                If you have questions, comments, or data deletion requests regarding this Privacy Policy, please contact us by email at:
              </p>
              <p className="font-semibold text-[#0E7C86]">
                mark.sockness@gmail.com
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
