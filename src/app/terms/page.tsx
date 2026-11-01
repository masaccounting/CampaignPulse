import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Turn a short business brief into an editable marketing calendar with AI-written content ideas, ad scripts, campaign copy, and creative briefs. Built for small-business owners.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F5] text-[#1F2937]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-3xl border border-[#F3E8E2] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-[#F3E8E2] pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C86]">
                Legal &bull; Agreement
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] mt-1">
                Terms of Service
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
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing, browsing, or using CampaignPulse, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with any portion of these terms, you must not access or use the service.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                2. Description of the Service
              </h2>
              <p>
                CampaignPulse is an artificial intelligence marketing campaign planning application created for small-business owners, entrepreneurs, and independent creators. The service enables users to convert business descriptions, goals, and target audience details into structured marketing calendars, campaign concepts, ad scripts, social media copy, and creative briefs. CampaignPulse was built as a demonstration project by Group 53 for the Outskill AI Accelerator Hackathon.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                3. User Accounts and the Shared Demonstration Account
              </h2>
              <p>
                You may register for an individual user account using your email address, or you may explore the application through the public live demonstration account. When using an individual account, you are responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account.
              </p>
              <p>
                The shared live demonstration account is accessible to multiple evaluators and members of the public. Any campaign plans, brand profiles, or notes entered into the shared demonstration account are visible to other users of that account and may be modified, reset, or cleared at any time without advance notice. You must not enter sensitive, proprietary, or personal information into the shared demonstration account.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                4. Acceptable Use Policy
              </h2>
              <p>
                You agree to use CampaignPulse only for lawful, legitimate business planning and creative purposes. You agree that you will not:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Generate, distribute, or promote false, deceptive, fraudulent, or unsubstantiated advertising claims.</li>
                <li>Create content that infringes upon the intellectual property, privacy, publicity, or proprietary rights of any third party.</li>
                <li>Generate defamatory, harassing, abusive, obscene, or otherwise unlawful material.</li>
                <li>Violate the advertising policies, terms of service, or community standards of any publication or social media platform where you publish your campaigns.</li>
                <li>Attempt to bypass, reverse engineer, disrupt, or compromise the security, integrity, or availability of the service.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                5. Artificial Intelligence Generated Content and User Responsibility
              </h2>
              <p>
                All marketing calendar schedules, post titles, advertising scripts, social media captions, campaign angles, and creative briefs produced by CampaignPulse are provided strictly as artificial intelligence generated drafts.
              </p>
              <p>
                You retain sole responsibility for reviewing, fact-checking, editing, and verifying all generated material before publishing, distributing, or spending advertising funds. You are solely responsible for ensuring that all published marketing materials are truthful, accurate, and compliant with all applicable consumer protection laws and advertising guidelines.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                6. No Guaranteed Results and No Professional Advice
              </h2>
              <p>
                CampaignPulse provides planning suggestions and draft copy for conceptual purposes only. We make no representations, guarantees, or warranties regarding customer acquisition, revenue, engagement rates, click-through rates, or the return on investment of any marketing campaign.
              </p>
              <p>
                The service does not provide legal, financial, accounting, regulatory, or certified marketing consulting advice. If you require legal review of your advertising claims or professional counsel, you should consult a qualified professional advisor.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                7. User Content and Intellectual Property
              </h2>
              <p>
                You retain all rights and ownership of the business descriptions, product details, campaign briefs, and materials you submit to CampaignPulse.
              </p>
              <p>
                By submitting information to the service, you grant us a non-exclusive, worldwide, royalty-free license to use, store, and transmit your input solely as necessary to operate the application, generate your campaign calendar, and provide the service to you.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                8. Availability of the Service
              </h2>
              <p>
                CampaignPulse is offered as a hackathon demonstration and prototype application. We do not guarantee continuous, uninterrupted, or error-free operation. We reserve the right to modify, suspend, update, or discontinue any feature, tool, or aspect of the service at any time without liability.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                9. Disclaimer of Warranties
              </h2>
              <p>
                CampaignPulse is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express, implied, statutory, or otherwise. To the fullest extent permitted by law, we disclaim all implied warranties, including warranties of merchantability, fitness for a particular purpose, non-infringement, and title.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                10. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, in no event shall CampaignPulse, Group 53, or any of its creators, contributors, or partners be liable for any indirect, incidental, consequential, special, punitive, or exemplary damages, or for any loss of revenue, profits, business, goodwill, or data, arising out of or in connection with your access to or use of, or inability to access or use, the service or any generated content.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                11. Termination of Access
              </h2>
              <p>
                We reserve the right to suspend or terminate your access to CampaignPulse immediately, without prior notice, if you violate these Terms of Service or engage in misuse of the application. You may stop using the service at any time.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                12. Changes to These Terms
              </h2>
              <p>
                We may revise and update these Terms of Service at our discretion. Any revisions will become effective immediately upon posting to this page with an updated revision date. Your continued use of CampaignPulse after such changes constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                13. Governing Law and Jurisdiction
              </h2>
              <p>
                These Terms of Service and any dispute or claim arising out of or related to them shall be governed by and construed in accordance with the laws of the State of California, United States of America, without giving effect to any principles of conflicts of law. You agree to submit to the exclusive jurisdiction of the state and federal courts located within the State of California to resolve any dispute arising under these terms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-[#1F2937]">
                14. Contact Information
              </h2>
              <p>
                If you have questions, inquiries, or feedback regarding these Terms of Service, please contact us by email at:
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
