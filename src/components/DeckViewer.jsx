import React, { useState, useEffect } from 'react';
import { 
  DECK_SLIDES 
} from '../data/gccData';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  Users, 
  Sparkles,
  Download,
  Share2,
  ExternalLink
} from 'lucide-react';

export default function DeckViewer({ onNavigateToApp }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slide = DECK_SLIDES[currentSlideIndex];
  const totalSlides = DECK_SLIDES.length;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  const speakerNotes = [
    // Slide 1
    "Context for reviewers: India's GCC ecosystem has evolved from classic back-office BPOs into mission-critical global tech nerve centres. Today, more than 2,000 GCCs generate over $60B in annual tech exports. But setting one up is plagued by friction. Our goal with GCC Compass is to build the sovereign, transparent operating system that turns months of confusion into days of clarity.",
    // Slide 2
    "Here we map the 6 players. Notice how the information asymmetry hits the entrant hardest: they burn $350k-$1M+ in executive time and pay $150k-$300k in consultant retainers just to evaluate feasibility. Meanwhile, state governments offer up to ₹25 Cr in subsidies that 70% of entrants don't even know exist.",
    // Slide 3
    "Current workarounds are completely broken. Traditional consultancies (ANSR, Zinnov, Big-4) charge exorbitant retainers and often take undisclosed referral kickbacks from landlords. Meanwhile, annual PDF reports from CBRE or NASSCOM are already 12-18 months out of date. Everything else runs on whisper networks.",
    // Slide 4
    "We systematically prioritized 4 opportunities using an Impact vs. Feasibility vs. Flexiple Synergy matrix. The sweet spot is pairing a high-intent Directory & Feasibility Simulator (the top-of-funnel hook) with Flexiple's premier tech talent placement engine (the high-margin monetization engine).",
    // Slide 5
    "This is the solution architecture for GCC Compass. It combines 4 interconnected engines: 1) Verified GCC Directory, 2) Multi-City & Subsidy Comparator, 3) Real-time Setup Cost & Feasibility Simulator, and 4) A Verified Partner RFP Exchange.",
    // Slide 6
    "For whom first? We deliberately chose US/EU Mid-Market tech companies ($50M to $2B ARR). Fortune 50 mega-corporations can afford $500k McKinsey engagements; mid-market CTOs cannot. They have a strict 6-12 month board mandate, need immediate talent, and move fast.",
    // Slide 7
    "Positioning is all about switching triggers. Global entrants switch because we are 10x faster and transparent. GCC country heads switch to get peer comp benchmarks to defend budgets. Verified partners switch because we deliver warm, pre-qualified enterprise RFPs instead of cold outbound.",
    // Slide 8
    "Business model and Flexiple synergy: The intelligence platform is freemium to maximize top-of-funnel reach. The big revenue comes from enterprise talent placements and dedicated pods, generating $50k to $250k LTV per client, alongside marketplace RFP commission and premium subscriptions.",
    // Slide 9
    "Walk the audience through the working prototype we built! It is not just mockups—it is a functional React application with real GCC records, multi-city subsidy comparisons, and an interactive cost calculator that lets leaders model Capex/Opex live.",
    // Slide 10
    "Our phased 12-month roadmap: Day 90 is directory & calculator traction; Day 180 activates the partner marketplace and first 15 talent contracts; Day 360 scales government subsidy integration and targets $1.5M+ in influenced talent ARR for Flexiple."
  ];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner / Slide Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs font-semibold">
            SLIDE {currentSlideIndex + 1} OF {totalSlides}
          </div>
          <span className="hidden sm:inline text-xs text-slate-400">
            Use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">←</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">→</kbd> keys to present
          </span>
        </div>

        {/* Slide Selector Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto max-w-md scrollbar-none py-1">
          {DECK_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                idx === currentSlideIndex
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-400/50'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
              title={`Slide ${idx + 1}: ${s.title}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showSpeakerNotes 
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' 
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Speaker Notes</span>
          </button>

          <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentSlideIndex === 0}
              className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Previous Slide (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1))}
              disabled={currentSlideIndex === totalSlides - 1}
              className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Next Slide (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[580px] flex flex-col justify-between">
        
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Header */}
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {slide.badge}
            </span>
            <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
              <span>Flexiple Product Assignment</span>
              <span>•</span>
              <span>October 2026</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {slide.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-400 font-medium mt-1">
              {slide.subtitle}
            </p>
          </div>
        </div>

        {/* Slide Body Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
          
          {/* Main 2 Column Content */}
          <div className="lg:col-span-2 space-y-6">
            {slide.sections.map((sec, idx) => (
              <div 
                key={idx} 
                className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/80 transition-all duration-200"
              >
                <h3 className="text-sm font-bold uppercase tracking-wide text-blue-400 mb-3 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{sec.heading}</span>
                </h3>
                <ul className="space-y-2.5">
                  {sec.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <span className="text-blue-500 mt-1 font-bold text-xs">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Column: Key Metric & Context Callout */}
          <div className="flex flex-col justify-between space-y-6">
            
            {/* High Impact Stat Card */}
            <div className="bg-gradient-to-br from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-800/40 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-1">
                Key Benchmark
              </p>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight my-2 font-mono">
                {slide.metricCallout.number}
              </div>
              <p className="text-sm font-semibold text-slate-200">
                {slide.metricCallout.label}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {slide.metricCallout.sublabel}
              </p>
            </div>

            {/* Contextual Interactive Prototype Jump Links */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Test this in Prototype:</span>
              </p>

              {currentSlideIndex <= 2 && (
                <button
                  onClick={() => onNavigateToApp('directory')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500/30 transition-all group"
                >
                  <span className="font-medium">Explore 2,000+ GCC Directory</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </button>
              )}

              {(currentSlideIndex === 3 || currentSlideIndex === 4 || currentSlideIndex === 6) && (
                <button
                  onClick={() => onNavigateToApp('comparator')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500/30 transition-all group"
                >
                  <span className="font-medium">Compare City Policies & Grants</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </button>
              )}

              {(currentSlideIndex === 4 || currentSlideIndex === 7 || currentSlideIndex === 8) && (
                <button
                  onClick={() => onNavigateToApp('calculator')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500/30 transition-all group"
                >
                  <span className="font-medium">Run Setup Feasibility Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </button>
              )}

              {(currentSlideIndex === 5 || currentSlideIndex === 9) && (
                <button
                  onClick={() => onNavigateToApp('partners')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500/30 transition-all group"
                >
                  <span className="font-medium">View Verified Partner Network</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </button>
              )}

              <button
                onClick={() => onNavigateToApp('talent')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500/30 transition-all group"
              >
                <span className="font-medium">View Flexiple Comp Benchmarks</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </button>
            </div>

          </div>

        </div>

        {/* Slide Footer */}
        <div className="relative z-10 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-300">GCC COMPASS</span>
            <span>—</span>
            <span>Designed for Flexiple Product Strategy</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Slide {currentSlideIndex + 1} of {totalSlides}</span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))}
                disabled={currentSlideIndex === 0}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1))}
                disabled={currentSlideIndex === totalSlides - 1}
                className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-medium"
              >
                Next Slide
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Speaker Notes Drawer / Section */}
      {showSpeakerNotes && (
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Speaker Notes & Product Rationale (Slide {currentSlideIndex + 1})</span>
            </div>
            <span className="text-[11px] text-amber-500/80">
              Internal Product Strategy Walkthrough
            </span>
          </div>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans">
            "{speakerNotes[currentSlideIndex]}"
          </p>
        </div>
      )}

      {/* Quick Summary of Assignment Requirements Covered */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">1. Problem</p>
          <p className="text-xs font-semibold text-emerald-400 mt-1 flex items-center justify-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Fully Mapped (Slides 2-3)</span>
          </p>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">2. Opportunities</p>
          <p className="text-xs font-semibold text-emerald-400 mt-1 flex items-center justify-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Prioritized (Slide 4)</span>
          </p>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">3. Solution & ICP</p>
          <p className="text-xs font-semibold text-emerald-400 mt-1 flex items-center justify-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Defined (Slides 5-6)</span>
          </p>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">4. Positioning</p>
          <p className="text-xs font-semibold text-emerald-400 mt-1 flex items-center justify-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Detailed (Slides 7-8)</span>
          </p>
        </div>
      </div>

    </div>
  );
}
