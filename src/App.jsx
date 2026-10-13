import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DeckViewer from './components/DeckViewer';
import GccDirectory from './components/GccDirectory';
import CityComparator from './components/CityComparator';
import CostCalculator from './components/CostCalculator';
import PartnerEcosystem from './components/PartnerEcosystem';
import TalentBenchmark from './components/TalentBenchmark';
import RfpModal from './components/RfpModal';
import { 
  Compass, 
  Presentation, 
  Building2, 
  Layers, 
  Calculator, 
  ShieldCheck, 
  TrendingUp, 
  ExternalLink,
  Mail,
  FileText
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('deck'); // default to executive deck as requested by assignment
  const [isRfpOpen, setIsRfpOpen] = useState(false);
  const [rfpSubject, setRfpSubject] = useState('General GCC Strategy Consultation');

  const handleOpenRfp = (subject = 'General GCC Strategy Consultation') => {
    setRfpSubject(subject);
    setIsRfpOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenRfp={handleOpenRfp} 
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        {activeTab === 'deck' && (
          <DeckViewer onNavigateToApp={(tab) => setActiveTab(tab)} />
        )}
        {activeTab === 'directory' && (
          <GccDirectory onOpenRfp={handleOpenRfp} />
        )}
        {activeTab === 'comparator' && (
          <CityComparator onOpenRfp={handleOpenRfp} />
        )}
        {activeTab === 'calculator' && (
          <CostCalculator onOpenRfp={handleOpenRfp} />
        )}
        {activeTab === 'partners' && (
          <PartnerEcosystem onOpenRfp={handleOpenRfp} />
        )}
        {activeTab === 'talent' && (
          <TalentBenchmark onOpenRfp={handleOpenRfp} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 text-xs py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">
                GCC Compass <span className="text-slate-400 font-normal">by Flexiple</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Product Intern Assignment Submission • October 2026
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button onClick={() => setActiveTab('deck')} className="hover:text-white transition-colors">
              Executive Deck
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('directory')} className="hover:text-white transition-colors">
              GCC Directory
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('comparator')} className="hover:text-white transition-colors">
              State Incentives
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('calculator')} className="hover:text-white transition-colors">
              Cost Simulator
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('partners')} className="hover:text-white transition-colors">
              Verified Partners
            </button>
          </div>

          <div className="text-[11px] text-slate-400 text-center md:text-right">
            <p>Designed for Hrishikesh, Tanya & Sanya Isaac</p>
            <p className="text-blue-400 mt-0.5">hrishikesh@flexiple.com • tanya@flexiple.com • sanya.isaac@flexiple.com</p>
          </div>

        </div>
      </footer>

      {/* Interactive Modal */}
      <RfpModal 
        isOpen={isRfpOpen} 
        onClose={() => setIsRfpOpen(false)} 
        initialSubject={rfpSubject}
      />

    </div>
  );
}
