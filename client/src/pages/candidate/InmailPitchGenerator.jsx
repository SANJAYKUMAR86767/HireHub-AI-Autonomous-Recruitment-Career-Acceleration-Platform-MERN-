import React, { useState } from "react";
import {
  Mail,
  Send,
  Sparkles,
  Copy,
  Check,
  Building2,
  Users,
  Target,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

export default function InmailPitchGenerator() {
  const [roleTitle, setRoleTitle] = useState("Staff Backend Engineer");
  const [companyName, setCompanyName] = useState("Stripe Platform");
  const [topProject, setTopProject] = useState("Scaled payment ingestion pipeline to 50k QPS using Kafka & Redis sharding");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const pitches = [
    {
      type: "Direct to Founder / VP Eng DM",
      tag: "High Energy & Direct Impact",
      text: `Hi [Name], loved your recent engineering blog on scaling transaction pipelines at ${companyName}. I recently ${topProject.toLowerCase()} with sub-10ms latency. Would love to explore how I can contribute to your core backend pods as a ${roleTitle}. Open to a quick 10-min chat this week?`,
    },
    {
      type: "Executive Recruiter InMail Hook",
      tag: "FAANG Calibrated",
      text: `Hi [Recruiter Name], I noticed ${companyName} is actively scaling its engineering team for the ${roleTitle} role. With 5+ years building high-throughput distributed systems and having ${topProject.toLowerCase()}, I believe my background aligns strongly with your current mandates. Let me know if you'd like to review my portfolio!`,
    },
    {
      type: "Peer Engineer Coffee Referral Request",
      tag: "Warm Networking",
      text: `Hey [Engineer Name], came across your work on the core infrastructure team at ${companyName}—really impressive architecture! I'm evaluating the open ${roleTitle} opening and would love to ask 2 quick questions about team culture and engineering autonomy before applying. Best, [Your Name]`,
    },
  ];

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-8 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>Executive Outreach Generator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Send className="w-8 h-8 text-emerald-400" />
              1-Click AI LinkedIn InMail & Cold Pitch Generator
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Craft high-conversion cold messages tailored for Founders, Hiring Managers, and Peer Engineers to land referrals.
            </p>
          </div>
        </div>

        {/* Input Parameters Form */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 block">
            Target Outreach Parameters:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Target Role</label>
              <input
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Architect"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Target Company</label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Uber / Meta"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Top Quantified Accomplishment</label>
              <input
                value={topProject}
                onChange={(e) => setTopProject(e.target.value)}
                placeholder="e.g. Scaled feed pipeline to 50k QPS"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Generated Pitches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pitches.map((pitch, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-black text-xs text-white">{pitch.type}</h4>
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    {pitch.tag}
                  </span>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed h-44 overflow-y-auto">
                  {pitch.text}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-500">
                  {pitch.text.length} characters
                </span>
                <button
                  onClick={() => handleCopy(pitch.text, idx)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center space-x-1.5 shadow-md"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-200" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Pitch</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
