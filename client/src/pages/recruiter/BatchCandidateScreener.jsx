import React, { useState } from "react";
import {
  Users,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Award,
  Zap,
  TrendingUp,
  Sliders,
  DollarSign,
  ChevronRight,
  Filter,
} from "lucide-react";

const CANDIDATES = [
  {
    id: "c1",
    name: "Rohan Verma",
    currentTitle: "Senior Backend Lead @ FinTech Corp",
    experience: "6.5 yrs",
    expectedSalary: "₹42 LPA",
    matchScore: 96,
    skills: ["Go", "Distributed Systems", "Kafka", "PostgreSQL", "Kubernetes"],
    ratings: {
      systemDesign: 95,
      dsaProblemSolving: 88,
      leadershipCulture: 92,
      communication: 90,
    },
    greenFlags: [
      "Scaled payment ledger handling 45,000 QPS with strict ACID consistency.",
      "Active open-source contributor with 1.2k+ GitHub stars.",
    ],
    redFlags: ["Limited experience with cloud serverless / AWS Lambda architectures."],
    aiCustomQuestions: [
      "Walk us through how you handled split-brain scenarios in your Kafka distributed partition cluster.",
      "How did you isolate database contention during peak Black Friday sales spikes?",
    ],
    status: "Shortlisted",
  },
  {
    id: "c2",
    name: "Ananya Iyer",
    currentTitle: "Full Stack Architect @ AI Studio",
    experience: "5.0 yrs",
    expectedSalary: "₹38 LPA",
    matchScore: 94,
    skills: ["React 19", "Node.js", "Python", "Vector DB", "LangChain", "AWS"],
    ratings: {
      systemDesign: 90,
      dsaProblemSolving: 94,
      leadershipCulture: 95,
      communication: 96,
    },
    greenFlags: [
      "Engineered autonomous RAG LLM retrieval agent cutting query latency by 55%.",
      "Exceptional verbal clarity and technical roadmap articulation.",
    ],
    redFlags: ["Transitioned tech stacks recently (Node -> Python ML within last 9 months)."],
    aiCustomQuestions: [
      "How do you evaluate hallucination rates in production vector similarity search?",
      "Can you explain your strategy for state management across micro-frontends?",
    ],
    status: "Review",
  },
  {
    id: "c3",
    name: "Vikram Malhotra",
    currentTitle: "Principal SRE & DevOps Lead",
    experience: "8.0 yrs",
    expectedSalary: "₹50 LPA",
    matchScore: 91,
    skills: ["Kubernetes", "Terraform", "AWS", "Golang", "Prometheus", "CI/CD"],
    ratings: {
      systemDesign: 96,
      dsaProblemSolving: 80,
      leadershipCulture: 88,
      communication: 86,
    },
    greenFlags: [
      "Maintained 99.999% SLA across 40+ production microservices in multi-region AWS.",
      "Led cost optimization saving $320k annually on Kubernetes infrastructure.",
    ],
    redFlags: ["Prefers pure infrastructure tooling over application-level feature coding."],
    aiCustomQuestions: [
      "Describe a major production outage you triaged and the post-mortem corrective action items.",
      "How do you enforce automated canary rollbacks with zero customer disruption?",
    ],
    status: "Review",
  },
];

export default function BatchCandidateScreener() {
  const [candidates, setCandidates] = useState(CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState(CANDIDATES[0]);
  const [filterRole, setFilterRole] = useState("all");

  const handleStatusChange = (id, newStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    if (selectedCandidate.id === id) {
      setSelectedCandidate((prev) => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-8 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Autonomous Recruiter Assessment Suite</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-400" />
              AI Multi-Candidate Batch Screener & Comparison Radar
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Compare candidate cohorts side-by-side, audit red flags, and instantly generate targeted interview questions.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl text-right">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Active Cohort Size
              </span>
              <span className="text-base font-black text-purple-400">
                {candidates.length} Qualified Applicants
              </span>
            </div>
          </div>
        </div>

        {/* Side-by-Side Candidates Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {candidates.map((c) => {
            const isSelected = selectedCandidate.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedCandidate(c)}
                className={`bg-slate-900/90 border rounded-3xl p-6 transition-all cursor-pointer shadow-xl relative overflow-hidden group ${
                  isSelected
                    ? "border-purple-500 shadow-purple-500/10 bg-slate-900"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-extrabold text-base text-white group-hover:text-purple-300 transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{c.currentTitle}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex flex-col items-center justify-center text-white shadow-md">
                    <span className="text-sm font-black">{c.matchScore}%</span>
                    <span className="text-[8px] uppercase font-bold text-purple-200">Match</span>
                  </div>
                </div>

                {/* Key Badges */}
                <div className="flex items-center space-x-2 text-[10px] font-bold mb-4">
                  <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700">
                    Exp: {c.experience}
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                    Ask: {c.expectedSalary}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg border uppercase tracking-wider ${
                      c.status === "Shortlisted"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                {/* Score Breakdown Bars */}
                <div className="space-y-2 text-xs text-slate-300 mb-5">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>System Design</span>
                      <span className="font-bold text-white">{c.ratings.systemDesign}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${c.ratings.systemDesign}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>DSA / Algorithms</span>
                      <span className="font-bold text-white">{c.ratings.dsaProblemSolving}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${c.ratings.dsaProblemSolving}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Communication</span>
                      <span className="font-bold text-white">{c.ratings.communication}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${c.ratings.communication}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1">
                  {c.skills.slice(0, 4).map((s, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-950 text-slate-400 px-2 py-0.5 rounded-md text-[10px]"
                    >
                      {s}
                    </span>
                  ))}
                  {c.skills.length > 4 && (
                    <span className="text-[10px] text-slate-500 font-bold self-center">
                      +{c.skills.length - 4}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Selected Candidate Deep-Dive Card */}
        <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-lg">
                {selectedCandidate.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">{selectedCandidate.name}</h2>
                <p className="text-xs text-slate-400">
                  {selectedCandidate.currentTitle} • {selectedCandidate.experience} Experience • Expected:{" "}
                  <span className="text-emerald-400 font-bold">
                    {selectedCandidate.expectedSalary}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleStatusChange(selectedCandidate.id, "Shortlisted")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-2xl text-xs font-black shadow-lg transition flex items-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Shortlist for Technical Round</span>
              </button>
              <button
                onClick={() =>
                  window.open(
                    `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Interview+with+${encodeURIComponent(
                      selectedCandidate.name
                    )}`,
                    "_blank"
                  )
                }
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center space-x-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Meet</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Green Flags vs Red Flags */}
            <div className="space-y-4">
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified Green Flags & Superpowers
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedCandidate.greenFlags.map((gf, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{gf}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2.5">
                  <AlertTriangle className="w-4 h-4" />
                  Areas to Probe in Live Interview
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedCandidate.redFlags.map((rf, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{rf}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* AI Tailored Interview Questions */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-purple-400 flex items-center gap-1.5 mb-3">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  AI-Tailored Interview Questions for {selectedCandidate.name}
                </h4>
                <div className="space-y-3">
                  {selectedCandidate.aiCustomQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-mono"
                    >
                      <span className="text-purple-400 font-bold mr-2">Q{idx + 1}:</span>
                      {q}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-4">
                💡 Automatically calibrated against candidate's stated tech stack and past production scale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
