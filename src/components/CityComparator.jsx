import React, { useState } from 'react';
import { CITY_BENCHMARKS } from '../data/gccData';
import { 
  Building2, 
  MapPin, 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  Plane, 
  Award, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Sparkles,
  BarChart3,
  Layers
} from 'lucide-react';

export default function CityComparator({ onOpenRfp }) {
  const [cityA, setCityA] = useState('Bengaluru');
  const [cityB, setCityB] = useState('Hyderabad');
  const [cityC, setCityC] = useState('Coimbatore');

  const cityList = CITY_BENCHMARKS.map((c) => c.city);

  const getCity = (name) => CITY_BENCHMARKS.find((c) => c.city === name) || CITY_BENCHMARKS[0];

  const cA = getCity(cityA);
  const cB = getCity(cityB);
  const cC = getCity(cityC);

  const comparedCities = [cA, cB, cC];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Head-to-Head City & Policy Benchmarks
          </span>
          <span className="text-xs text-slate-400">• Includes 2024–2029 State GCC Policies</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Indian Tech Hubs & State Incentive Comparator
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          Compare real estate per sq.ft., tech talent density, attrition rates, and state government capital subsidies across Tier-1 and Tier-2 Indian tech corridors.
        </p>

        {/* City Selectors Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Benchmark City 1 (Primary)
            </label>
            <select
              value={cityA}
              onChange={(e) => setCityA(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-blue-500"
            >
              {cityList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Benchmark City 2 (Alternative)
            </label>
            <select
              value={cityB}
              onChange={(e) => setCityB(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-blue-500"
            >
              {cityList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Benchmark City 3 (Tier-2 Hub / Cost Arbitrage)
            </label>
            <select
              value={cityC}
              onChange={(e) => setCityC(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-blue-500"
            >
              {cityList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {comparedCities.map((c, idx) => (
          <div 
            key={c.city + idx}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            {/* City Card Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {c.tier}
                </span>
                <span className="text-xs text-slate-400 font-medium">{c.state}</span>
              </div>
              <h3 className="text-2xl font-black text-white">{c.city}</h3>
              <p className="text-xs text-slate-300 italic">{c.tagline}</p>
            </div>

            {/* Core Metrics List */}
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-xs">
              
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Active GCC Count</span>
                <span className="font-bold text-white font-mono">{c.gccCount} centres ({c.gccSharePercent}% India share)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tech Talent Pool</span>
                <span className="font-bold text-blue-400 font-mono">{c.techTalentPool}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Prime Office Rent</span>
                <span className="font-bold text-amber-400 font-mono">{c.officeRentRange} / sq.ft</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Avg SDE-3 Salary</span>
                <span className="font-bold text-emerald-400 font-mono">₹{c.avgSde3SalaryLakhs} Lakhs/yr</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tech Attrition Rate</span>
                <span className="font-bold text-rose-400 font-mono">{c.attritionRatePercent}% YoY</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Cost of Living Index</span>
                <span className="font-bold text-slate-200 font-mono">{c.costOfLivingIndex} (Base BLR=100)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Int'l Flights & Infra</span>
                <span className="font-bold text-indigo-400 font-mono">{c.internationalFlightScore} / 10</span>
              </div>

            </div>

            {/* State Government Policy & Incentives */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Award className="w-3.5 h-3.5" />
                <span>{c.statePolicyTitle}</span>
              </div>
              <div className="bg-amber-950/10 border border-amber-500/20 rounded-xl p-3 space-y-1.5">
                {c.stateIncentives.map((inc, i) => (
                  <div key={i} className="flex items-start space-x-2 text-[11px] text-amber-200/90 leading-tight">
                    <span className="text-amber-400 font-bold mt-0.5">✓</span>
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="space-y-3 text-xs">
              <div>
                <p className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider mb-1">Key Strengths</p>
                <ul className="space-y-1 text-slate-300">
                  {c.pros.map((p, i) => (
                    <li key={i} className="flex items-start space-x-1.5 text-[11px]">
                      <span className="text-emerald-400 font-bold">+</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold text-rose-400 uppercase text-[10px] tracking-wider mb-1">Trade-offs & Constraints</p>
                <ul className="space-y-1 text-slate-300">
                  {c.cons.map((co, i) => (
                    <li key={i} className="flex items-start space-x-1.5 text-[11px]">
                      <span className="text-rose-400 font-bold">-</span>
                      <span>{co}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => onOpenRfp(`Site selection inquiry for ${c.city}`)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors border border-slate-700"
            >
              Analyze {c.city} Talent Availability
            </button>
          </div>
        ))}
      </div>

      {/* Key Takeaways & Arbitrage Strategy Card */}
      <div className="bg-gradient-to-r from-blue-950/50 via-slate-900 to-indigo-950/50 border border-blue-800/40 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Strategic Recommendation: The Dual-Hub / Hub-and-Spoke Model</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Modern GCC entrants are adopting a <strong>Hub-and-Spoke model</strong>: establishing their core Innovation & Architecture headquarters in <strong>Bengaluru or Hyderabad</strong> (for senior principal talent and AI leadership), while running scaled execution and platform engineering teams in <strong>Pune, Coimbatore, or Kochi</strong> to capture <strong>35-45% real estate and salary savings</strong> and sub-10% attrition rates.
        </p>
      </div>

    </div>
  );
}
