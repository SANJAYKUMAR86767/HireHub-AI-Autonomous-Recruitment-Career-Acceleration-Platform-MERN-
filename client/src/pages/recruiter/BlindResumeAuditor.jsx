import React, { useState } from "react";
import {
  EyeOff,
  ShieldCheck,
  Sparkles,
  UserX,
  Award,
  CheckCircle2,
  Lock,
  Unlock,
  Copy,
  Check,
  RefreshCw,
  Scale,
} from "lucide-react";

const SAMPLE_RESUME_RAW = `Candidate: Priya N. Sharma
Gender: Female | Age: 26 | Location: South Delhi, India
Education: B.Tech Computer Science, IIT Delhi (Batch of 2021)

Experience: Senior Software Engineer at FinTech Unicorn (2021 - Present)
• Architected payment routing gateway processing ₹140 Cr ($18M USD) monthly GMV with 99.99% uptime.
• Reduced microservice API latency from 180ms to 42ms using Redis cluster caching and connection pooling.
• Led a team of 4 junior engineers, conducting 50+ code reviews and enforcing strict CI/CD linting standards.
• Tech Stack: React 18, Node.js, TypeScript, PostgreSQL, Docker, AWS, Redis.`;

export default function BlindResumeAuditor() {
  const [rawResume, setRawResume] = useState(SAMPLE_RESUME_RAW);
  const [isAnonymized, setIsAnonymized] = useState(true);
  const [copied, setCopied] = useState(false);

  const anonymizedResume = `Candidate ID: [ANON-CANDIDATE-8821]
Demographics: [MASKED FOR UNBIASED MERIT EVALUATION]
Education: [VERIFIED ACCREDITED B.TECH IN COMPUTER SCIENCE]

Experience: Senior Software Engineer at High-Growth FinTech Tier-1 (3+ Years Experience)
• Architected payment routing gateway processing $18M USD monthly GMV with 99.99% uptime.
• Reduced microservice API latency from 180ms to 42ms using Redis cluster caching and connection pooling.
• Led a pod of 4 engineers, conducting 50+ code reviews and enforcing strict CI/CD linting standards.
• Core Tech Stack: React 18, Node.js, TypeScript, PostgreSQL, Docker, AWS, Redis.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(isAnonymized ? anonymizedResume : rawResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-8 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Unbiased Merit-First Hiring Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <EyeOff className="w-8 h-8 text-emerald-400" />
              AI Blind Resume Anonymizer & DEI Bias Shield
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Eliminate unconscious hiring bias by masking pedigree and demographic tags while highlighting pure technical execution and quantified metrics.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsAnonymized(!isAnonymized)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black transition shadow-lg flex items-center space-x-1.5 ${
                isAnonymized
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              {isAnonymized ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              <span>{isAnonymized ? "Bias Shield Active" : "Show Raw Demographics"}</span>
            </button>
          </div>
        </div>

        {/* Dual Panel Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Anonymized View (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  {isAnonymized ? "Anonymized Merit Profile" : "Original Raw Resume Data"}
                </span>
                <button
                  onClick={handleCopy}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy Scorecard"}</span>
                </button>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-200 font-mono leading-relaxed whitespace-pre-wrap">
                {isAnonymized ? anonymizedResume : rawResume}
              </div>
            </div>
          </div>

          {/* Right Column: Merit Scorecard (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-400" />
                  Objective Merit Scorecard
                </h3>
                <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                  96% Skill Fit
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Quantified Financial & Scale Impact</span>
                    <span className="font-bold text-white">98%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[98%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Performance Optimization & Architecture</span>
                    <span className="font-bold text-white">95%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full w-[95%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Engineering Leadership & Mentorship</span>
                    <span className="font-bold text-white">92%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[92%]" />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Masked Bias Attributes:
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <span className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Name & Gender
                  </span>
                  <span className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Age & Location
                  </span>
                  <span className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> College Pedigree
                  </span>
                  <span className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Photo & Ethnicity
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
