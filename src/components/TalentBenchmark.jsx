import React, { useState } from 'react';
import { GCC_COST_MODELS } from '../data/gccData';
import { 
  TrendingUp, 
  Users, 
  Award, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Building2,
  DollarSign
} from 'lucide-react';

export default function TalentBenchmark({ onOpenRfp }) {
  const [selectedRoleKey, setSelectedRoleKey] = useState('seniorSde');

  const roleDetails = {
    engineeringDirector: {
      title: "Engineering Director / VP of Eng",
      experienceYears: "14 - 20 Years",
      bengaluruAvgLakhs: 68,
      hyderabadAvgLakhs: 58,
      puneAvgLakhs: 54,
      tier2AvgLakhs: 38,
      usEquivalentUsd: 260000,
      skills: ["Cross-functional Leadership", "P&L Management", "Distributed Systems", "Executive Stakeholder Mgmt"],
      timeToHireTraditional: "90 - 120 Days",
      timeToHireFlexiple: "14 - 21 Days"
    },
    staffArchitect: {
      title: "Principal / Staff Software Architect",
      experienceYears: "10 - 15 Years",
      bengaluruAvgLakhs: 52,
      hyderabadAvgLakhs: 44,
      puneAvgLakhs: 42,
      tier2AvgLakhs: 30,
      usEquivalentUsd: 220000,
      skills: ["Microservices", "Event-Driven Architecture", "Domain-Driven Design", "High Throughput / Low Latency"],
      timeToHireTraditional: "60 - 90 Days",
      timeToHireFlexiple: "7 - 14 Days"
    },
    seniorSde: {
      title: "Senior Software Engineer (SDE-3 / Lead)",
      experienceYears: "5 - 9 Years",
      bengaluruAvgLakhs: 38,
      hyderabadAvgLakhs: 32,
      puneAvgLakhs: 30,
      tier2AvgLakhs: 20,
      usEquivalentUsd: 175000,
      skills: ["Go / Java / Node.js / React", "PostgreSQL / DynamoDB", "Kubernetes / Docker", "System Design"],
      timeToHireTraditional: "45 - 60 Days",
      timeToHireFlexiple: "5 - 7 Days"
    },
    dataAiEng: {
      title: "Senior AI / Machine Learning Engineer",
      experienceYears: "4 - 8 Years",
      bengaluruAvgLakhs: 44,
      hyderabadAvgLakhs: 36,
      puneAvgLakhs: 34,
      tier2AvgLakhs: 24,
      usEquivalentUsd: 195000,
      skills: ["PyTorch / LLMs / LangChain", "RAG Systems", "Vector Databases", "MLOps / GPU Pipeline"],
      timeToHireTraditional: "60 - 90 Days",
      timeToHireFlexiple: "7 - 10 Days"
    },
    devOpsCloud: {
      title: "Site Reliability Eng / Cloud Lead",
      experienceYears: "6 - 10 Years",
      bengaluruAvgLakhs: 36,
      hyderabadAvgLakhs: 30,
      puneAvgLakhs: 28,
      tier2AvgLakhs: 18,
      usEquivalentUsd: 165000,
      skills: ["Terraform / AWS / GCP", "CI/CD Pipelines", "Observability (Datadog)", "Zero Trust Security"],
      timeToHireTraditional: "45 - 60 Days",
      timeToHireFlexiple: "5 - 8 Days"
    }
  };

  const selected = roleDetails[selectedRoleKey];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Talent Market Telemetry & Comp Bands
          </span>
          <span className="text-xs text-slate-400">• Powered by Flexiple's Network Data</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Indian GCC Tech Talent Benchmarking
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          Granular salary compensation bands (CTC), market time-to-hire, and skill availability across Tier-1 and Tier-2 engineering hubs.
        </p>

        {/* Role Selector Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-3 border-t border-slate-800/80 scrollbar-none">
          {Object.keys(roleDetails).map((key) => {
            const r = roleDetails[key];
            const isActive = selectedRoleKey === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedRoleKey(key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {r.title.split('/')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Deep Dive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Role Details (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-blue-400">
                Experience Band: {selected.experienceYears}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {selected.title}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">US Baseline</span>
              <p className="text-lg font-black text-slate-300 font-mono">
                ${(selected.usEquivalentUsd / 1000).toFixed(0)}k USD
              </p>
            </div>
          </div>

          {/* City CTC Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Annual Guaranteed CTC Benchmarks by City
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Bengaluru</p>
                <p className="text-lg font-black text-white font-mono mt-1">₹{selected.bengaluruAvgLakhs}L</p>
                <p className="text-[10px] text-slate-500">Highest competition</p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Hyderabad</p>
                <p className="text-lg font-black text-blue-400 font-mono mt-1">₹{selected.hyderabadAvgLakhs}L</p>
                <p className="text-[10px] text-slate-500">15% arbitrage vs BLR</p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Pune</p>
                <p className="text-lg font-black text-emerald-400 font-mono mt-1">₹{selected.puneAvgLakhs}L</p>
                <p className="text-[10px] text-slate-500">Stable retention</p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Tier 2 Hubs</p>
                <p className="text-lg font-black text-amber-400 font-mono mt-1">₹{selected.tier2AvgLakhs}L</p>
                <p className="text-[10px] text-slate-500">45% cost savings</p>
              </div>
            </div>
          </div>

          {/* Key Skill Sets */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Must-Have Technical Proficiencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {selected.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-slate-950 text-slate-200 rounded-lg border border-slate-800 font-mono text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Time to Hire Comparison */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Time to Hire Velocity Comparison
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] text-slate-400">Traditional Agency / In-House Search:</p>
                <p className="text-base font-bold text-rose-400 font-mono mt-0.5">
                  {selected.timeToHireTraditional}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">High dropouts & 90-day notice periods</p>
              </div>

              <div className="border-l border-slate-800 pl-4">
                <p className="text-[11px] text-blue-300 font-medium">Flexiple Curated Talent Bridge:</p>
                <p className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                  {selected.timeToHireFlexiple}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">Pre-vetted, immediate availability</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Flexiple Talent Solution (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-600/40 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>The Flexiple GCC Advantage</span>
            </div>

            <h3 className="text-xl font-black text-white">
              Why Global Enterprises Build Their India Tech Teams with Flexiple
            </h3>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span><strong>Top 1% Vetted Talent:</strong> Every engineer undergoes rigorous multi-stage algorithmic and architectural evaluations.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span><strong>Zero Dropout Guarantee:</strong> Pre-aligned compensation expectations eliminate the standard 40% notice-period drop-off rate.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span><strong>Turnkey Squads or Direct Hires:</strong> Start with dedicated pods on day 1, or hire permanent captive leaders with zero overhead.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <button
              onClick={() => onOpenRfp(`Talent Pod Consultation for ${selected.title}`)}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Deploy Vetted {selected.title.split('/')[0]} Pods</span>
            </button>

            <p className="text-[10px] text-center text-slate-400">
              Average candidate interview-to-hire ratio: 1.8:1
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
