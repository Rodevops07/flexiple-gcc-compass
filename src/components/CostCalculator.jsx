import React, { useState, useMemo } from 'react';
import { GCC_COST_MODELS, CITY_BENCHMARKS } from '../data/gccData';
import { 
  Calculator, 
  Clock, 
  ShieldAlert, 
  DollarSign, 
  TrendingDown, 
  Sparkles, 
  CheckCircle2, 
  Building, 
  Users, 
  FileCheck,
  Download,
  Send,
  Zap
} from 'lucide-react';

export default function CostCalculator({ onOpenRfp }) {
  const [headcount, setHeadcount] = useState(50);
  const [selectedModelId, setSelectedModelId] = useState('flexiple-launchpad');
  const [selectedCityName, setSelectedCityName] = useState('Bengaluru');
  const [officeModel, setOfficeModel] = useState('managed'); // 'managed', 'leased', 'remote'
  const [techFocus, setTechFocus] = useState('fullstack_ai'); // 'fullstack_ai', 'cloud_infra', 'enterprise_saas'

  const selectedModel = GCC_COST_MODELS.models.find(m => m.id === selectedModelId) || GCC_COST_MODELS.models[0];
  const selectedCity = CITY_BENCHMARKS.find(c => c.city === selectedCityName) || CITY_BENCHMARKS[0];

  // Dynamic Financial Modeling Calculations
  const calculations = useMemo(() => {
    // 1. Average blend salary per engineer (in Lakhs per annum)
    // City index adjustment
    const cityCompMultiplier = selectedCity.avgSde3SalaryLakhs / 42; // baseline BLR=42L
    const baseAnnualSalaryLakhs = 32 * cityCompMultiplier; // blended across senior, mid, junior

    // Total monthly payroll in Lakhs
    const monthlyPayrollLakhs = (headcount * baseAnnualSalaryLakhs) / 12;

    // Statutory benefits (PF, Gratuity, Health Insurance, statutory bonus ~15%)
    const statutoryBenefitsMonthlyLakhs = monthlyPayrollLakhs * 0.15;

    // 2. Office Costs per month
    let officeCostMonthlyLakhs = 0;
    let officeSetupCapexLakhs = 0;

    if (officeModel === 'managed') {
      // Managed seat (e.g. Awfis, Indiqube, WeWork) ~ ₹16,000 - ₹22,000 / seat / month
      const seatCostMonthly = 18000 * (selectedCity.costOfLivingIndex / 100);
      officeCostMonthlyLakhs = (headcount * seatCostMonthly) / 100000;
      officeSetupCapexLakhs = (headcount * seatCostMonthly * 2) / 100000; // 2 months deposit
    } else if (officeModel === 'leased') {
      // Commercial lease: 80 sq.ft per employee * city rent + Fitout capex
      const sqft = headcount * 80;
      const monthlyRent = sqft * selectedCity.primeOfficeRentSqFt;
      officeCostMonthlyLakhs = (monthlyRent * 1.3) / 100000; // rent + CAM + electricity
      officeSetupCapexLakhs = ((sqft * 2500) + (monthlyRent * 6)) / 100000; // fitouts ₹2500/sqft + 6 mo deposit
    } else {
      // Remote / Satellite hub
      officeCostMonthlyLakhs = (headcount * 5000) / 100000; // home office stipend & co-working passes
      officeSetupCapexLakhs = (headcount * 10000) / 100000;
    }

    // 3. IT Hardware & Security Capex
    // MacBook Pro + Monitors + Peripherals ~ ₹2.2 Lakhs per head
    const itHardwareCapexLakhs = (headcount * 2.2);

    // 4. Legal / Incorporation / Compliance
    const legalSetupCapexLakhs = selectedModel.capexSetupLakhs;
    const legalComplianceMonthlyLakhs = selectedModel.complianceOverheadPerMonthLakhs;

    // Total Capex
    const totalCapexLakhs = Math.round(legalSetupCapexLakhs + officeSetupCapexLakhs + itHardwareCapexLakhs);

    // Monthly Opex (before markup)
    const baseMonthlyOpexLakhs = monthlyPayrollLakhs + statutoryBenefitsMonthlyLakhs + officeCostMonthlyLakhs + legalComplianceMonthlyLakhs;

    // Model markup (if BOT or EOR)
    const totalMonthlyOpexLakhs = Math.round(baseMonthlyOpexLakhs * (1 + selectedModel.marginMarkupPercent / 100));

    // 3-Year Total Cost of Ownership (Capex + 36 * Monthly Opex)
    const tco3YearsLakhs = Math.round(totalCapexLakhs + (totalMonthlyOpexLakhs * 36));
    const tco3YearsCrores = (tco3YearsLakhs / 100).toFixed(2);
    const tco3YearsUsdMillions = ((tco3YearsLakhs * 100000) / (85 * 1000000)).toFixed(2); // 1 USD = 85 INR

    // US/EU Equivalent Cost Comparison (US average all-in cost per software engineer: $185,000/year)
    const usEquivalentAnnualUsd = headcount * 185000;
    const usEquivalent3YearUsd = (usEquivalentAnnualUsd * 3) / 1000000;
    const savingsPercent = Math.round(((usEquivalent3YearUsd - parseFloat(tco3YearsUsdMillions)) / usEquivalent3YearUsd) * 100);
    const savingsUsdMillions = (usEquivalent3YearUsd - parseFloat(tco3YearsUsdMillions)).toFixed(2);

    return {
      totalCapexLakhs,
      totalMonthlyOpexLakhs,
      tco3YearsCrores,
      tco3YearsUsdMillions,
      usEquivalent3YearUsd: usEquivalent3YearUsd.toFixed(2),
      savingsPercent,
      savingsUsdMillions,
      monthlyPayrollLakhs: Math.round(monthlyPayrollLakhs),
      officeCostMonthlyLakhs: Math.round(officeCostMonthlyLakhs),
      timelineWeeks: selectedModel.timelineWeeks
    };
  }, [headcount, selectedModel, selectedCity, officeModel]);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Interactive Financial & Operational Simulator
          </span>
          <span className="text-xs text-slate-400">• Real-time CapEx & OpEx Modeling</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          GCC Setup Feasibility & Cost Simulator
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          Model total capital expenditure, monthly recurring runway, and 3-year Total Cost of Ownership (TCO) across Direct Captive, BOT, EOR, and Flexiple Launchpad models.
        </p>
      </div>

      {/* Simulator Inputs & Outputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
            <Calculator className="w-4 h-4 text-blue-400" />
            <span>Configure Setup Parameters</span>
          </h3>

          {/* 1. Headcount Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Target Tech Headcount (FTEs)</span>
              <span className="text-lg font-black text-blue-400 font-mono">{headcount} Engineers</span>
            </div>
            <input
              type="range"
              min="10"
              max="300"
              step="5"
              value={headcount}
              onChange={(e) => setHeadcount(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>10 Pod</span>
              <span>50 Hub</span>
              <span>150 Scale</span>
              <span>300+ Mega</span>
            </div>
          </div>

          {/* 2. Operational Model Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Operational & Entity Model
            </label>
            <div className="grid grid-cols-1 gap-2">
              {GCC_COST_MODELS.models.map((m) => {
                const isSelected = selectedModelId === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedModelId(m.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-950/40 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{m.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold bg-slate-800 text-blue-300">
                        {m.timelineWeeks} Weeks Launch
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {m.recommendedFor}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Primary City Hub */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Primary City Location
            </label>
            <select
              value={selectedCityName}
              onChange={(e) => setSelectedCityName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-blue-500"
            >
              {CITY_BENCHMARKS.map((c) => (
                <option key={c.city} value={c.city}>
                  {c.city} ({c.tier}) — SDE3 Avg: ₹{c.avgSde3SalaryLakhs}L
                </option>
              ))}
            </select>
          </div>

          {/* 4. Office Strategy */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Real Estate & Workplace Strategy
            </label>
            <div className="grid grid-cols-3 gap-2 text-center">
              <button
                onClick={() => setOfficeModel('managed')}
                className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                  officeModel === 'managed'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                Managed Space
                <span className="block text-[10px] text-slate-400 mt-0.5">Plug & Play</span>
              </button>
              <button
                onClick={() => setOfficeModel('leased')}
                className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                  officeModel === 'leased'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                Direct Lease
                <span className="block text-[10px] text-slate-400 mt-0.5">Custom Fitout</span>
              </button>
              <button
                onClick={() => setOfficeModel('remote')}
                className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                  officeModel === 'remote'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                Hybrid / Satellite
                <span className="block text-[10px] text-slate-400 mt-0.5">Flexible Hubs</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Live Calculated Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top Big Impact Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Upfront Set-up CapEx</span>
                <Clock className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-3xl font-black text-white font-mono mt-2">
                ₹{calculations.totalCapexLakhs}L
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                ≈ ${Math.round((calculations.totalCapexLakhs * 100000) / 85).toLocaleString()} USD
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Monthly Recurring OpEx</span>
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-emerald-400 font-mono mt-2">
                ₹{calculations.totalMonthlyOpexLakhs}L
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                ≈ ${Math.round((calculations.totalMonthlyOpexLakhs * 100000) / 85).toLocaleString()} / month
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-600/40 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-blue-300 text-xs font-semibold">
                <span>3-Year TCO Arbitrage</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <div className="text-3xl font-black text-white font-mono mt-2">
                {calculations.savingsPercent}%
              </div>
              <p className="text-[11px] text-blue-200 mt-1 font-semibold">
                Saves ${calculations.savingsUsdMillions}M vs US/EU
              </p>
            </div>

          </div>

          {/* Detailed Cost Breakdown & TCO Comparison Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                3-Year Total Cost of Ownership (TCO) Breakdown
              </h4>
              <span className="text-xs font-mono font-bold text-blue-400">
                ₹{calculations.tco3YearsCrores} Cr (${calculations.tco3YearsUsdMillions}M)
              </span>
            </div>

            {/* Visual Progress Bar comparison */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>India GCC ({headcount} FTEs in {selectedCityName})</span>
                <span className="font-mono font-bold text-emerald-400">${calculations.tco3YearsUsdMillions}M</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${(100 - calculations.savingsPercent)}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-slate-400 pt-2">
                <span>US / Western Europe Baseline ({headcount} FTEs @ $185k/yr)</span>
                <span className="font-mono font-bold text-slate-400">${calculations.usEquivalent3YearUsd}M</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-slate-700 rounded-full"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* Line items table */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Monthly Core Engineering Payroll:</span>
                <span className="font-mono font-medium">₹{calculations.monthlyPayrollLakhs} Lakhs</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Office & Facility Expense:</span>
                <span className="font-mono font-medium">₹{calculations.officeCostMonthlyLakhs} Lakhs</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Time to First Code Commit:</span>
                <span className="font-mono font-bold text-amber-300">{calculations.timelineWeeks} Weeks</span>
              </div>
            </div>
          </div>

          {/* Statutory & Regulatory Roadmap Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Statutory Compliance & Setup Milestones</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">MCA & ROC Incorporation</p>
                  <p className="text-slate-400 text-[11px]">SPICe+ e-filing, Director DIN/DSC, MOA/AOA</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">Tax, GST & RBI Compliances</p>
                  <p className="text-slate-400 text-[11px]">PAN, TAN, GST, and FC-GPR for foreign capital</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">STPI / SEZ Customs Registration</p>
                  <p className="text-slate-400 text-[11px]">SoftEX filings and 100% duty-free hardware import</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">Transfer Pricing Benchmarking</p>
                  <p className="text-slate-400 text-[11px]">Safe Harbor rules (15-18% cost-plus markup documentation)</p>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onOpenRfp(`Feasibility analysis for ${headcount} engineers in ${selectedCityName} via ${selectedModel.name}`)}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Launch This Pod via Flexiple</span>
              </button>

              <button
                onClick={() => onOpenRfp(`Full Feasibility Report Request: ${headcount} FTEs`)}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-2 border border-slate-700"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Export Executive Feasibility Brief</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
