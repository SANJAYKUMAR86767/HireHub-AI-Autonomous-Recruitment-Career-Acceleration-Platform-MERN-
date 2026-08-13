import React, { useState } from "react";
import {
  TrendingUp,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Target,
  Sliders,
  Calendar,
} from "lucide-react";

const LEVELS = [
  {
    id: "l4",
    title: "L4 — Software Engineer II (Mid-Level)",
    salaryRange: "₹24 - ₹38 LPA ($140k - $190k USD)",
    expectedScope: "Autonomous feature ownership, clean testing, self-directed delivery.",
    competencies: {
      systemDesign: 70,
      codeQuality: 85,
      observability: 75,
      leadership: 60,
      techVision: 55,
    },
  },
  {
    id: "l5",
    title: "L5 — Senior Software Engineer",
    salaryRange: "₹38 - ₹65 LPA ($220k - $340k USD)",
    expectedScope: "Cross-system architecture, multi-quarter roadmap ownership, mentorship.",
    competencies: {
      systemDesign: 88,
      codeQuality: 92,
      observability: 90,
      leadership: 82,
      techVision: 80,
    },
  },
  {
    id: "l6",
    title: "L6 — Staff Software Architect",
    salaryRange: "₹70 LPA - ₹1.4 Cr ($380k - $550k USD)",
    expectedScope: "Org-wide technical direction, high-concurrency SPOF elimination, executive alignment.",
    competencies: {
      systemDesign: 98,
      codeQuality: 96,
      observability: 95,
      leadership: 94,
      techVision: 96,
    },
  },
];

export default function SkillMatrixGapAnalyzer() {
  const [selectedLevel, setSelectedLevel] = useState(LEVELS[1]); // L5
  const [candidateScores, setCandidateScores] = useState({
    systemDesign: 82,
    codeQuality: 90,
    observability: 78,
    leadership: 74,
    techVision: 68,
  });

  const SPRINT_ITEMS = [
    {
      week: "Weeks 1-3",
      title: "Distributed Fault-Tolerance Hardening",
      desc: "Implement circuit breakers and idempotent retry semantics across 3 high-traffic microservices.",
    },
    {
      week: "Weeks 4-6",
      title: "Observability & SLA Dashboards",
      desc: "Build Prometheus + Grafana telemetry alerts to reduce MTTR below 5 minutes.",
    },
    {
      week: "Weeks 7-9",
      title: "Cross-Team RFC Proposal",
      desc: "Author and drive an org-wide Architecture RFC for asynchronous event streaming.",
    },
    {
      week: "Weeks 10-12",
      title: "Executive Presentation & Leveling Review",
      desc: "Present business impact metrics ($ savings & latency reduction) to the promotion committee.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-8 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>FAANG Engineering Ladder Benchmark</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-indigo-400" />
              Engineering Leveling & Skill Gap Matrix
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Audit your technical competency against L4/L5/L6 engineering ladders and generate an actionable 90-day promotion sprint.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl text-right">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Target Compensation Band
              </span>
              <span className="text-base font-black text-emerald-400">
                {selectedLevel.salaryRange.split("(")[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Level Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {LEVELS.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl)}
              className={`p-5 rounded-3xl border text-left transition-all ${
                selectedLevel.id === lvl.id
                  ? "bg-indigo-600/20 border-indigo-500 text-white shadow-xl shadow-indigo-500/10"
                  : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <h3 className="font-extrabold text-sm text-white mb-1">{lvl.title}</h3>
              <p className="text-xs text-emerald-400 font-bold mb-2">{lvl.salaryRange}</p>
              <p className="text-[11px] text-slate-400 line-clamp-2">{lvl.expectedScope}</p>
            </button>
          ))}
        </div>

        {/* Matrix Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Skill Gap Breakdown (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-400" />
                Competency vs Target Level Gap Analysis
              </h3>

              <div className="space-y-4 text-xs">
                {Object.entries(selectedLevel.competencies).map(([key, requiredScore]) => {
                  const currentScore = candidateScores[key] || 75;
                  const diff = currentScore - requiredScore;
                  const labelMap = {
                    systemDesign: "Distributed System Design & Concurrency",
                    codeQuality: "Code Craftsmanship & Modularity",
                    observability: "Operational Excellence & Telemetry",
                    leadership: "Cross-Team Leadership & Mentorship",
                    techVision: "Strategic Long-Term Architecture Vision",
                  };

                  return (
                    <div key={key} className="space-y-1.5">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-300">{labelMap[key]}</span>
                        <span className={diff >= 0 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                          {currentScore}% / {requiredScore}% ({diff >= 0 ? `+${diff}% Ready` : `${diff}% Gap`})
                        </span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden flex">
                        <div
                          className={`h-full transition-all duration-700 ${
                            diff >= 0 ? "bg-emerald-500" : "bg-gradient-to-r from-amber-500 to-indigo-500"
                          }`}
                          style={{ width: `${currentScore}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: 90-Day Sprint Roadmap (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  90-Day Promotion Sprint Action Plan
                </h3>
                <span className="text-[10px] text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-md font-bold">
                  4 Milestones
                </span>
              </div>

              <div className="space-y-3">
                {SPRINT_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-indigo-400 uppercase">
                        {item.week}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <h4 className="font-bold text-white text-xs">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
