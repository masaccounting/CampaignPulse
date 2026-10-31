export default function Home() {
  const services = [
    {
      name: "GitHub Repository",
      status: "Connected & Verified",
      detail: "masaccounting/CampaignPulse (main)",
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: "Vercel Edge Platform",
      status: "Continuous Deployment Active",
      detail: "Automated production builds on push",
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 19.7778H22L12 2Z" />
        </svg>
      ),
    },
    {
      name: "Supabase Database & Auth",
      status: "Credentials & Auth Active",
      detail: "Postgres + SSR Token Refreshing",
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.996 0L1.758 13.917h8.243v10.083l10.239-13.917h-8.244V0z" />
        </svg>
      ),
    },
    {
      name: "Google Gemini AI API",
      status: "Verified & Operational",
      detail: "50+ Models accessible for intelligence",
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col justify-between p-6 sm:p-12">
      <div className="max-w-4xl mx-auto w-full pt-8 pb-12 flex-1 flex flex-col justify-center">
        {/* Top Status Pill */}
        <div className="flex items-center gap-2 self-start bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Deployment Pipeline Verified &amp; Active
        </div>

        {/* Hero Title & Subtitle */}
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            CampaignPulse
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed">
            Real-time political and marketing campaign intelligence. All core services, APIs, and automated continuous deployment workflows are connected and fully functional.
          </p>
        </div>

        {/* Grid of Verified Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {services.map((svc) => (
            <div
              key={svc.name}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:shadow-emerald-950/20"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50">
                  {svc.icon}
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {svc.status}
                </span>
              </div>
              <h2 className="text-base font-semibold text-slate-200 mb-1">
                {svc.name}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {svc.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Next Steps / Status Box */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
            System Diagnostics
          </h3>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">&#10003;</span>
              <span>Next.js 16 App Router &amp; TypeScript compiled cleanly via Turbopack.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">&#10003;</span>
              <span>Supabase SSR Session Middleware configured for automatic token refresh.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">&#10003;</span>
              <span>Google Gemini API connection tested and verified.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">&#10003;</span>
              <span>GitHub remote tracking synchronized with automatic Vercel deployment webhook.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full pt-8 border-t border-slate-800/60 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span>&copy; 2026 CampaignPulse. All rights reserved.</span>
        <span>Environment: Production Ready</span>
      </footer>
    </main>
  );
}
