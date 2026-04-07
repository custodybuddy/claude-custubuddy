export default function Home() {
  return (
    <>
      <nav
        id="main-nav"
        className="fixed top-0 left-0 w-full z-50 bg-navy-950/80 backdrop-blur-lg border-b border-gold-500/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <a href="/" className="text-xl font-bold tracking-wider font-serif">
            <span className="text-white">CUSTODY</span>
            <span className="text-gold-500">BUDDY</span>
          </a>
          <div className="flex flex-wrap gap-x-6 gap-y-2 items-center justify-center text-sm font-medium text-slate-300">
            <a href="/" className="hover:text-gold-500 transition-colors">
              Home
            </a>
            <a href="/#features" className="hover:text-gold-500 transition-colors">
              Features
            </a>
            <a href="/guides" className="hover:text-gold-500 transition-colors">
              Guides
            </a>
            <a
              href="https://blog.custodybuddy.com"
              className="hover:text-gold-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </a>
            <a href="/contact" className="hover:text-gold-500 transition-colors">
              Contact
            </a>
            <a
              href="/incident-report"
              className="ml-2 bg-gold-500 text-navy-950 px-5 py-2.5 rounded-lg font-semibold tracking-wide shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-[1.05] hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] active:scale-[0.98] transition-all duration-300"
            >
              Start Now
            </a>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gold-500/5 rounded-full blur-[150px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#F6BA21 1px, transparent 1px), linear-gradient(90deg, #F6BA21 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="max-w-xl text-center lg:text-left">
              <div
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-8 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '0.05s' }}
              >
                <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse-subtle flex-shrink-0" />
                <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">
                  AI-Powered Evidence Toolkit
                </span>
              </div>

              <h1
                className="text-4xl lg:text-5xl xl:text-6xl font-serif font-black leading-tight mb-6 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '0.15s' }}
              >
                Toxic Co-Parenting
                <br />
                <span className="text-white">Just</span> <span className="text-gold-500">Got</span>{' '}
                <span className="text-white">Easier.</span>
              </h1>

              <p
                className="text-lg text-soft-white leading-relaxed mb-10 max-w-md mx-auto lg:mx-0 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '0.25s' }}
              >
                Turn manipulation into court-ready documentation. In 3 minutes, you&apos;ll have a
                timestamped, professional incident report - no lawyer required.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start opacity-0 animate-fade-in-up"
                style={{ animationDelay: '0.35s' }}
              >
                <a
                  href="https://custodybuddy.com/incident-report/"
                  className="inline-flex items-center justify-center gap-2 bg-gold-500 text-navy-950 px-8 py-4 rounded-xl font-bold text-base tracking-wide hover:scale-[1.05] active:scale-[0.98] transition-all duration-300"
                  style={{
                    boxShadow:
                      '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(246, 186, 33, 0.2)',
                  }}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Start an Incident Report
                </a>
              </div>

              <div
                className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '0.45s' }}
              >
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <svg className="w-4 h-4 text-gold-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Timestamped &amp; court-ready</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <svg className="w-4 h-4 text-gold-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Free to use &amp; no account needed</span>
                </div>
              </div>
            </div>

            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="relative group">
                <div
                  className="relative bg-navy-900/35 backdrop-blur-2xl border border-gold-500 rounded-3xl overflow-hidden transition-all duration-400 ease-in-out group-hover:border-gold-500/80 group-hover:shadow-[0_0_40px_rgba(246,186,33,0.25)] group-hover:-translate-y-1"
                  style={{ boxShadow: '0 0 20px rgba(246, 186, 33, 0.1)' }}
                >
                  <div className="flex items-center justify-between px-5 py-3.5 bg-black/30 border-b border-gold-500/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-600" />
                      <div className="w-3 h-3 rounded-full bg-slate-600" />
                      <div className="w-3 h-3 rounded-full bg-slate-600" />
                    </div>
                    <span className="text-xs text-slate-500 font-mono">incident_report_2025-10-24.pdf</span>
                    <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 px-2.5 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <span className="text-[10px] font-semibold text-green-400 uppercase tracking-wider">
                        Court Ready
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] text-gold-500/60 font-mono uppercase tracking-widest mb-1">
                          Incident Report #047
                        </p>
                        <h3 className="text-white font-semibold text-base leading-snug">
                          Missed Scheduled Pickup
                          <br />
                          <span className="text-slate-400 font-normal text-sm">October 24, 2025 - 3:00 PM</span>
                        </h3>
                      </div>
                      <span className="flex-shrink-0 bg-red-500/15 border border-red-500/30 text-red-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        High Priority
                      </span>
                    </div>
                    <div className="h-px bg-gold-500/10" />

                    <div className="space-y-3 text-sm">
                      <div className="flex gap-4">
                        <span className="text-slate-500 uppercase tracking-widest w-20 flex-shrink-0 text-[10px] pt-0.5">
                          Location
                        </span>
                        <span className="text-soft-white">123 Oak Street - curbside pickup</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-slate-500 uppercase tracking-widest w-20 flex-shrink-0 text-[10px] pt-0.5">
                          Witnesses
                        </span>
                        <span className="text-soft-white">Neighbour, dashcam footage</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-slate-500 uppercase tracking-widest w-20 flex-shrink-0 text-[10px] pt-0.5">
                          Summary
                        </span>
                        <span className="text-soft-white">
                          Respondent did not arrive for court-ordered pickup. No notice given. Child
                          distressed.
                        </span>
                      </div>
                    </div>

                    <div className="h-px bg-gold-500/10" />
                    <div className="flex items-start gap-4 bg-gold-500/5 border border-gold-500/15 rounded-xl p-4">
                      <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gold-500 mb-0.5">AI Pattern Detected</p>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          This is the <strong className="text-white">4th missed pickup</strong> in 90 days.
                          CustodyBuddy has flagged this pattern.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-black/20 border-t border-gold-500/10 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Logged via CustodyBuddy</span>
                    <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-500 hover:text-white transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Export PDF
                    </button>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-navy-850/80 backdrop-blur border border-gold-500/50 px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 transition-transform duration-400 group-hover:scale-110">
                  <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs font-semibold text-white">47 reports logged</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-navy-850/80 backdrop-blur border border-gold-500/50 px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 transition-transform duration-400 group-hover:scale-110">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs font-semibold text-white">Court Admissible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
