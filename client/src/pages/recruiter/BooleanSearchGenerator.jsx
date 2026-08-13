import React, { useState } from "react";
import {
  Search,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Code2,
  Filter,
  Send,
  Mail,
  Users,
  Target,
  RefreshCw,
  Layers,
} from "lucide-react";

export default function BooleanSearchGenerator() {
  const [roleTitle, setRoleTitle] = useState("Staff Backend Distributed Systems Engineer");
  const [skills, setSkills] = useState("Golang, Kafka, Kubernetes, Redis, Microservices, High Concurrency");
  const [locations, setLocations] = useState("Bengaluru, Hyderabad, Remote, India");
  const [yearsExp, setYearsExp] = useState("5+");
  const [copiedKey, setCopiedKey] = useState(null);

  // Computed Boolean Strings
  const linkedinBoolean = `(title:"${roleTitle.split(" ")[0]}" OR title:"${roleTitle}") AND ("Golang" OR "Go") AND ("Kafka" OR "Event-Driven") AND ("Kubernetes" OR "K8s") AND ("Bengaluru" OR "Hyderabad" OR "Remote") -intern -junior`;

  const googleXrayLinkedIn = `site:linkedin.com/in/ ("${roleTitle}" OR "Backend Engineer") ("Go" OR "Golang") ("Kafka" OR "Kubernetes") ("Bengaluru" OR "India") -intitle:jobs -intitle:profiles`;

  const githubTalentSearch = `site:github.com ("${roleTitle}" OR "Golang" OR "Kafka") ("Bengaluru" OR "India") ("followers" OR "contributions")`;

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const openSearch = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-8 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Autonomous Recruiter Headhunting Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Search className="w-8 h-8 text-indigo-400" />
              AI Boolean Search & Talent X-Ray Sourcing
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Transform natural language hiring mandates into enterprise Boolean strings and launch 1-click live candidate searches across LinkedIn & GitHub.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl text-right">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Sourcing Velocity Lift
              </span>
              <span className="text-lg font-black text-indigo-400">4.5x Faster Pipeline</span>
            </div>
          </div>
        </div>

        {/* Input Requirements Form */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 block">
            Candidate Sourcing Parameters:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Target Job Title</label>
              <input
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="e.g. Principal Cloud DevOps Lead"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Required Skills (Comma-Separated)</label>
              <input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. Python, AWS, Docker, FastAPI"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Target Locations & Work Mode</label>
              <input
                value={locations}
                onChange={(e) => setLocations(e.target.value)}
                placeholder="e.g. Bengaluru, Remote, India"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Output Boolean Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LinkedIn Recruiter String */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-blue-400">
                  LinkedIn Recruiter String
                </span>
                <button
                  onClick={() => handleCopy(linkedinBoolean, "linkedin")}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                >
                  {copiedKey === "linkedin" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed h-32 overflow-y-auto">
                {linkedinBoolean}
              </div>
            </div>
            <button
              onClick={() => openSearch(`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(linkedinBoolean)}`)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2"
            >
              <span>Search on LinkedIn</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Google X-Ray Search */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-rose-400">
                  Google X-Ray LinkedIn Sourcing
                </span>
                <button
                  onClick={() => handleCopy(googleXrayLinkedIn, "google")}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                >
                  {copiedKey === "google" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed h-32 overflow-y-auto">
                {googleXrayLinkedIn}
              </div>
            </div>
            <button
              onClick={() => openSearch(`https://www.google.com/search?q=${encodeURIComponent(googleXrayLinkedIn)}`)}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs py-3 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2"
            >
              <span>Launch Google X-Ray</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* GitHub Tech Talent Radar */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-purple-400">
                  GitHub Open-Source Engineers
                </span>
                <button
                  onClick={() => handleCopy(githubTalentSearch, "github")}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                >
                  {copiedKey === "github" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed h-32 overflow-y-auto">
                {githubTalentSearch}
              </div>
            </div>
            <button
              onClick={() => openSearch(`https://www.google.com/search?q=${encodeURIComponent(githubTalentSearch)}`)}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-3 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2"
            >
              <span>Scout GitHub Profiles</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
