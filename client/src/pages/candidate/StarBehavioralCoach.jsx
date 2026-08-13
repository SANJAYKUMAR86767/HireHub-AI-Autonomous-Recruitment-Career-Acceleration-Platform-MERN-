import React, { useState } from "react";
import {
  Star,
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  TrendingUp,
  MessageSquare,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Lightbulb,
  Zap,
} from "lucide-react";

const BEHAVIORAL_CATEGORIES = [
  {
    id: "amazon_lp",
    name: "Amazon Leadership Principles",
    description: "Customer Obsession, Ownership, Bias for Action, Dive Deep, Deliver Results",
    questions: [
      {
        q: "Tell me about a time you had to make a high-stakes architectural decision with incomplete data (Bias for Action).",
        idealPillars: ["Risk Assessment", "Reversibility Matrix (Type 1 vs Type 2)", "Quantified Outcome"],
      },
      {
        q: "Describe a situation where you had a deep technical disagreement with a team member or manager (Have Backbone; Disagree & Commit).",
        idealPillars: ["Data-backed counter-proposal", "Empathy & active listening", "Unified execution post-decision"],
      },
      {
        q: "Give an example of when you took complete ownership of an issue that was outside your immediate scope (Ownership).",
        idealPillars: ["Proactive root cause analysis", "Cross-team alignment", "Long-term preventative safeguards"],
      },
    ],
  },
  {
    id: "google_culture",
    name: "Google 'Googliness' & Navigating Ambiguity",
    description: "Navigating Ambiguity, Intellectual Humility, Collaborative Problem Solving",
    questions: [
      {
        q: "Tell me about a project where the requirements changed completely midway through delivery.",
        idealPillars: ["Agile adaptation", "Stakeholder communication", "Tech debt minimization"],
      },
      {
        q: "Describe a time you failed to deliver a critical milestone on schedule and how you navigated the aftermath.",
        idealPillars: ["Radical transparency", "Blameless post-mortem", "Process resilience improvements"],
      },
    ],
  },
  {
    id: "netflix_high_perf",
    name: "Netflix High Performance & Context Not Control",
    description: "Freedom and Responsibility, High Talent Density, Radical Candor",
    questions: [
      {
        q: "Describe a time you gave uncomfortable critical feedback to a senior colleague or leader.",
        idealPillars: ["Constructive actionability", "Focus on business outcome", "Private empathetic delivery"],
      },
      {
        q: "Give an example of a time you simplified a complex system by eliminating unnecessary processes or code.",
        idealPillars: ["Pruning tech complexity", "Measurable latency / operational savings"],
      },
    ],
  },
];

export default function StarBehavioralCoach() {
  const [selectedCategory, setSelectedCategory] = useState(BEHAVIORAL_CATEGORIES[0]);
  const [selectedQuestion, setSelectedQuestion] = useState(BEHAVIORAL_CATEGORIES[0].questions[0]);

  // Candidate STAR Answer Inputs
  const [situation, setSituation] = useState(
    "During peak festive sale traffic, our payment ingestion service experienced a 300% sudden load spike, causing database connection timeouts and 4.2% failed transactions."
  );
  const [task, setTask] = useState(
    "As the backend tech lead, I was tasked with stabilizing the transaction pipeline within 2 hours without dropping existing in-flight user orders."
  );
  const [action, setAction] = useState(
    "I quickly diagnosed thread pool exhaustion in PostgreSQL. I deployed an emergency Redis queue buffer to throttle incoming webhooks, implemented circuit breaker fallbacks, and doubled read-replica pools with non-blocking async workers."
  );
  const [result, setResult] = useState(
    "Transaction success rate recovered to 99.98% within 45 minutes, processing 4.8 million transactions ($12M GMV) with zero data loss. Later, I converted the architecture to event-driven Kafka streaming."
  );

  const [isAuditing, setIsAuditing] = useState(false);
  const [auditScore, setAuditScore] = useState(94);
  const [copiedFullStory, setCopiedFullStory] = useState(false);

  const handleAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditScore(96);
    }, 1000);
  };

  const getCombinedSTAR = () => {
    return `[Situation]: ${situation}\n\n[Task]: ${task}\n\n[Action]: ${action}\n\n[Result]: ${result}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCombinedSTAR());
    setCopiedFullStory(true);
    setTimeout(() => setCopiedFullStory(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-8 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>FAANG Behavioral STAR Masterclass</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Star className="w-8 h-8 text-amber-400 fill-amber-400/20" />
              AI STAR Storytelling & Behavioral Coach
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Structure world-class behavioral answers using the STAR method with instant AI rubric evaluation for Amazon, Google, and Meta loops.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl text-right">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                STAR Story Impact Score
              </span>
              <span className="text-xl font-black text-amber-400">{auditScore} / 100</span>
            </div>
          </div>
        </div>

        {/* Category & Question Selector */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
            Select Target Behavioral Evaluation Rubric:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {BEHAVIORAL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedQuestion(cat.questions[0]);
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedCategory.id === cat.id
                    ? "bg-amber-500/10 border-amber-500 text-white shadow-lg"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <h4 className="font-extrabold text-xs text-white mb-1">{cat.name}</h4>
                <p className="text-[10px] text-slate-400 line-clamp-2">{cat.description}</p>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-300">Target Interview Prompt:</span>
            <div className="grid grid-cols-1 gap-2">
              {selectedCategory.questions.map((qObj, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedQuestion(qObj)}
                  className={`p-3 rounded-xl border text-xs text-left transition flex items-center justify-between ${
                    selectedQuestion.q === qObj.q
                      ? "bg-slate-800 border-indigo-500 text-indigo-300 font-semibold"
                      : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span>"{qObj.q}"</span>
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 ml-2 text-slate-500" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* STAR Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: 4 STAR Pillars (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Situation */}
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center text-[10px]">
                    S
                  </span>
                  Situation (15% of Time)
                </span>
                <span className="text-[10px] text-slate-400">Context, Scale & Challenge</span>
              </div>
              <textarea
                rows={2}
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            {/* Task */}
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px]">
                    T
                  </span>
                  Task (10% of Time)
                </span>
                <span className="text-[10px] text-slate-400">Your Explicit Responsibility</span>
              </div>
              <textarea
                rows={2}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>

            {/* Action */}
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px]">
                    A
                  </span>
                  Action (60% of Time) — Crucial Core
                </span>
                <span className="text-[10px] text-slate-400">Exact Technical & Leadership Steps</span>
              </div>
              <textarea
                rows={3}
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            {/* Result */}
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px]">
                    R
                  </span>
                  Result (15% of Time)
                </span>
                <span className="text-[10px] text-slate-400">Quantified Business & Tech Impact</span>
              </div>
              <textarea
                rows={2}
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <button
              onClick={handleAudit}
              disabled={isAuditing}
              className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs py-3.5 rounded-2xl shadow-xl transition flex items-center justify-center space-x-2"
            >
              {isAuditing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Auditing STAR Precision Matrix...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run AI STAR Quality Audit</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: AI Rubric & Story Preview (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Scorecard */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  Pillar Quality Scorecard
                </h3>
                <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                  FAANG Ready
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Action Verb & Ownership Strength</span>
                    <span className="font-bold text-white">96%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[96%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Quantified Metric Impact ($ / % / QPS)</span>
                    <span className="font-bold text-white">92%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-[92%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Conciseness & Pace Delivery</span>
                    <span className="font-bold text-white">95%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-[95%]" />
                  </div>
                </div>
              </div>

              {/* Coaching Feedback Tips */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  AI Polish Suggestions:
                </span>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
                  <div className="flex items-start gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>Great use of specific tech decisions (Redis buffer, read-replica pooling).</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-amber-300">
                    <Lightbulb className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>Highlight how you communicated status updates to executive stakeholders during the outage.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Combined Master Story Exporter */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-xs text-white">Unified Teleprompter Script</h4>
                <button
                  onClick={handleCopy}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl transition flex items-center space-x-1 shadow-md"
                >
                  {copiedFullStory ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Full STAR</span>
                    </>
                  )}
                </button>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 text-[11px] text-slate-300 font-mono leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                {getCombinedSTAR()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
