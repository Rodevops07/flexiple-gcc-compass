import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Building2, 
  Mail, 
  User, 
  Sparkles,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export default function RfpModal({ isOpen, onClose, initialSubject = 'General GCC Strategy Consultation' }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    targetHeadcount: '25-50 FTEs',
    preferredCity: 'Bengaluru',
    timeline: 'Within 3-6 months',
    requirements: initialSubject || ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Enterprise GCC Advisory</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Request Strategy Session / Partner RFP
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Direct advisory from Flexiple's GCC practice group and vetted partner network.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Your Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Corporate Email</label>
                <input
                  required
                  type="email"
                  placeholder="alex@enterprise.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Company / Organization</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Acme Cloud Corp"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Headcount</label>
                  <select
                    value={formData.targetHeadcount}
                    onChange={(e) => setFormData({ ...formData, targetHeadcount: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>10-25 FTEs (Pod)</option>
                    <option>25-50 FTEs</option>
                    <option>50-150 FTEs</option>
                    <option>150+ FTEs (Mega)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Hub</label>
                  <select
                    value={formData.preferredCity}
                    onChange={(e) => setFormData({ ...formData, preferredCity: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>Bengaluru</option>
                    <option>Hyderabad</option>
                    <option>Pune</option>
                    <option>Chennai</option>
                    <option>Tier-2 (Coimbatore/Kochi)</option>
                    <option>Undecided / Open</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Primary Scope / Question</label>
                <textarea
                  rows="3"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  placeholder="Tell us about your tech stack, entity preferences, or specific vendor RFPs..."
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Confidential Inquiry</span>
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>NDA Protected • Response within 24 business hours</span>
              </p>
            </div>
          </form>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Inquiry Successfully Dispatched!</h3>
              <p className="text-xs text-slate-300 mt-1.5 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.name || 'Partner'}</strong>. Your request for <strong>{formData.company || 'your firm'}</strong> ({formData.targetHeadcount} in {formData.preferredCity}) has been routed to Flexiple's GCC practice desk.
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-200">Next Step:</p>
              <p>A customized Feasibility Dossier and partner shortlist will be shared with <strong>{formData.email}</strong>.</p>
            </div>
            <button
              onClick={handleReset}
              className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
            >
              Back to Platform
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
