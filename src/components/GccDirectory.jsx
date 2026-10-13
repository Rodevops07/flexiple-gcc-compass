import React, { useState, useMemo } from 'react';
import { GCC_DATA } from '../data/gccData';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  Users, 
  Award, 
  ExternalLink, 
  Code, 
  ChevronRight, 
  Sparkles,
  CheckCircle,
  X,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function GccDirectory({ onOpenRfp }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');
  const [selectedGcc, setSelectedGcc] = useState(null);

  // Filter options
  const cities = ['All', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Delhi NCR (Gurugram)', 'Coimbatore', 'Kochi', 'Mumbai'];
  const sectors = ['All', 'BFSI & Fintech', 'Retail & E-commerce', 'Automotive & Mobility', 'Semiconductors & DeepTech', 'Healthcare & Pharma', 'Enterprise Software & SaaS', 'Energy & Industrial Tech', 'Aerospace & Defense'];
  const tiers = ['All', '200-500', '500-1000', '1000-2000', '2000-5000', '5000+'];

  const filteredData = useMemo(() => {
    return GCC_DATA.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.parentCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.focusAreas.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCity = selectedCity === 'All' || item.city.includes(selectedCity);
      const matchesSector = selectedSector === 'All' || item.sector === selectedSector;
      const matchesTier = selectedTier === 'All' || item.headcountTier === selectedTier;

      return matchesSearch && matchesCity && matchesSector && matchesTier;
    });
  }, [searchQuery, selectedCity, selectedSector, selectedTier]);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Verified GCC Intelligence Registry
            </span>
            <span className="text-xs text-slate-400">• Updated Q4 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            India GCC Directory & Capability Index
          </h1>
          <p className="text-sm text-slate-300">
            Real-time verified repository of 2,000+ Global Capability Centres in India. Search tech stacks, engineering headcount, leadership, and operational maturity.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div>
            <div className="text-2xl font-black text-white font-mono">2,050+</div>
            <p className="text-xs text-slate-400">Total Active GCCs</p>
          </div>
          <div>
            <div className="text-2xl font-black text-blue-400 font-mono">1.65M+</div>
            <p className="text-xs text-slate-400">High-Skill Workforce</p>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-400 font-mono">$64.6B</div>
            <p className="text-xs text-slate-400">Annual Tech Exports</p>
          </div>
          <div>
            <div className="text-2xl font-black text-amber-400 font-mono">42%</div>
            <p className="text-xs text-slate-400">Concentrated in Bengaluru</p>
          </div>
        </div>
      </div>

      {/* Search & Multi-Filters Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by GCC name, parent company, tech stack (e.g. PyTorch, React, Kafka)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* City Filter */}
          <div className="w-full sm:w-48">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:border-blue-500"
            >
              {cities.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Cities' : c}</option>
              ))}
            </select>
          </div>

          {/* Sector Filter */}
          <div className="w-full sm:w-56">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:border-blue-500"
            >
              {sectors.map((s) => (
                <option key={s} value={s}>{s === 'All' ? 'All Industry Sectors' : s}</option>
              ))}
            </select>
          </div>

          {/* Headcount Tier Filter */}
          <div className="w-full sm:w-40">
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:border-blue-500"
            >
              {tiers.map((t) => (
                <option key={t} value={t}>{t === 'All' ? 'All Team Sizes' : `${t} FTEs`}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter stats pill */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span>Showing <strong className="text-white">{filteredData.length}</strong> verified centres</span>
          {(selectedCity !== 'All' || selectedSector !== 'All' || selectedTier !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCity('All');
                setSelectedSector('All');
                setSelectedTier('All');
                setSearchQuery('');
              }}
              className="text-blue-400 hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredData.map((gcc) => (
          <div
            key={gcc.id}
            onClick={() => setSelectedGcc(gcc)}
            className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 shadow-lg hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-200 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              {/* Top row */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {gcc.sector}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors mt-2">
                    {gcc.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    HQ: {gcc.parentCompany} ({gcc.hqCountry})
                  </p>
                </div>
                {gcc.verified && (
                  <span title="Verified MCA & ROC Record">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  </span>
                )}
              </div>

              {/* Meta details */}
              <div className="space-y-1.5 my-3 text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{gcc.city} • <span className="text-slate-400">{gcc.locationDetail.split(',')[0]}</span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span><strong>{gcc.headcount.toLocaleString()}</strong> team members (Est. {gcc.yearSetup})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="text-slate-300">{gcc.maturityStage}</span>
                </div>
              </div>

              {/* Tech stack pills */}
              <div className="mt-3 pt-3 border-t border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Core Tech Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {gcc.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom action trigger */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-blue-400">
              <span className="font-medium">View Detailed Dossier</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <p className="text-slate-400 text-sm">No GCC records found matching your filters.</p>
          <button
            onClick={() => {
              setSelectedCity('All');
              setSelectedSector('All');
              setSelectedTier('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Detailed GCC Modal / Drawer */}
      {selectedGcc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative">
            
            <button
              onClick={() => setSelectedGcc(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {selectedGcc.sector}
                </span>
                <span className="text-xs text-slate-400">Setup Year {selectedGcc.yearSetup}</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                {selectedGcc.name}
              </h2>
              <p className="text-sm text-slate-300">
                Parent: {selectedGcc.parentCompany} ({selectedGcc.hqCountry})
              </p>
            </div>

            {/* Quick stats in modal */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Headcount</p>
                <p className="text-base font-bold text-white font-mono">{selectedGcc.headcount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">City Hub</p>
                <p className="text-base font-bold text-white">{selectedGcc.city}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Model</p>
                <p className="text-xs font-semibold text-blue-400 mt-1">{selectedGcc.model.split(' ')[0]}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Avg Senior CTC</p>
                <p className="text-base font-bold text-emerald-400 font-mono">₹{selectedGcc.avgCompSeniorLakhs}L</p>
              </div>
            </div>

            {/* Focus Areas */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Mission-Critical Strategic Focus
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedGcc.focusAreas.map((f, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-200 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Primary Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedGcc.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-slate-950 text-blue-300 rounded-lg border border-slate-800 font-mono text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Location & Expansion Details */}
            <div className="space-y-2 bg-slate-950/40 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
              <p><strong>Physical Facility:</strong> {selectedGcc.locationDetail}</p>
              <p><strong>India Leadership:</strong> {selectedGcc.keyLeader}</p>
              <p><strong>Expansion Radar:</strong> <span className="text-amber-300">{selectedGcc.expansionStatus}</span></p>
            </div>

            {/* Modal Bottom CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                onClick={() => {
                  setSelectedGcc(null);
                  onOpenRfp(`Benchmarking against ${selectedGcc.name}`);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30"
              >
                <Sparkles className="w-4 h-4" />
                <span>Hire Similar Engineers via Flexiple</span>
              </button>
              <button
                onClick={() => setSelectedGcc(null)}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
