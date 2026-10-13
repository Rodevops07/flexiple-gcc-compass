import React from 'react';
import { 
  Compass, 
  Presentation, 
  Building2, 
  Layers, 
  Calculator, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenRfp }) {
  const navItems = [
    { id: 'deck', label: 'Executive Deck', icon: Presentation, badge: 'Assignment' },
    { id: 'directory', label: 'GCC Directory', icon: Building2, count: '2,000+' },
    { id: 'comparator', label: 'City & Subsidies', icon: Layers },
    { id: 'calculator', label: 'Setup Cost Simulator', icon: Calculator, badge: 'Interactive' },
    { id: 'partners', label: 'Verified Partners', icon: ShieldCheck },
    { id: 'talent', label: 'Talent & Comp', icon: TrendingUp },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('deck')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Compass className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  GCC COMPASS
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  By Flexiple
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                The Single Source of Truth for India's GCC Ecosystem
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 relative ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                      isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-800 text-blue-400 border border-blue-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {item.count && (
                    <span className="text-[10px] text-slate-400">
                      ({item.count})
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onOpenRfp('General Enterprise Consultation')}
              className="hidden sm:inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all shadow-md shadow-blue-600/25 border border-blue-400/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span>Request GCC Advisory</span>
            </button>
          </div>

        </div>

        {/* Mobile / Secondary Navigation Bar */}
        <div className="lg:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-800 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs whitespace-nowrap font-medium ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
