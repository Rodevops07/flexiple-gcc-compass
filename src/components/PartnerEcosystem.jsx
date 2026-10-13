import React, { useState } from 'react';
import { VERIFIED_PARTNERS } from '../data/gccData';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  CheckCircle, 
  Building2, 
  Send, 
  Clock, 
  Award, 
  ExternalLink,
  Sparkles,
  Users
} from 'lucide-react';

export default function PartnerEcosystem({ onOpenRfp }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Tech Talent & Engineering Staffing',
    'Legal, Tax & Corporate Compliance',
    'Employer of Record (EOR / PEO)',
    'Commercial Real Estate & Office Fitouts',
    'Managed Enterprise Workspaces',
    'Audit, Tax & Transfer Pricing'
  ];

  const filteredPartners = selectedCategory === 'All' 
    ? VERIFIED_PARTNERS 
    : VERIFIED_PARTNERS.filter(p => p.category === selectedCategory);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Verified Provider Network & RFP Exchange
          </span>
          <span className="text-xs text-slate-400">• Strict Track-Record Vetting</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Verified GCC Ecosystem Partners
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          Cut out 6 months of vendor discovery and unverified broker kickbacks. Connect directly with vetted legal counsels, real estate tenant representatives, EOR platforms, and premier tech talent networks.
        </p>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-3 border-t border-slate-800/80 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat === 'All' ? 'All Partner Categories' : cat.split('&')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => (
          <div
            key={partner.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-5 transition-all group"
          >
            <div className="space-y-4">
              
              {/* Partner Top Bar */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {partner.category.split('&')[0]}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mt-2">
                    {partner.name}
                  </h3>
                </div>
                {partner.featuredBadge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 whitespace-nowrap">
                    {partner.featuredBadge}
                  </span>
                )}
              </div>

              {/* Rating and setups count */}
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{partner.rating}</span>
                  <span className="text-slate-500 font-normal">({partner.reviewsCount})</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span><strong>{partner.gccSetupsDelivered}</strong> GCCs Delivered</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {partner.description}
              </p>

              {/* Core Offerings */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Offerings</p>
                <div className="flex flex-wrap gap-1.5">
                  {partner.offerings.map((off, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      {off}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta information */}
              <div className="pt-3 border-t border-slate-800/80 space-y-1 text-xs text-slate-400">
                <p><strong>Pricing:</strong> <span className="text-slate-200">{partner.pricingModel}</span></p>
                <p><strong>Response Time:</strong> <span className="text-emerald-400 font-medium">Avg &lt;{partner.responseTimeHours} hours</span></p>
              </div>

            </div>

            {/* Bottom Action CTA */}
            <button
              onClick={() => onOpenRfp(`Request RFP from ${partner.name}`)}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-md shadow-blue-600/20 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Request for Proposal (RFP)</span>
            </button>

          </div>
        ))}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">The Flexiple Verified Provider Guarantee</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Every provider is audited for verified client case studies, statutory compliance records, and zero hidden referral markups.
            </p>
          </div>
        </div>
        <button
          onClick={() => onOpenRfp('Provider Certification Application')}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white border border-slate-700 whitespace-nowrap"
        >
          Apply to Join Provider Network
        </button>
      </div>

    </div>
  );
}
