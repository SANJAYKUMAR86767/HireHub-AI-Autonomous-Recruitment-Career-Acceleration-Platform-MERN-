import React, { useState, useEffect } from "react";
import {
  Bot,
  Sparkles,
  Play,
  Square,
  RefreshCw,
  CheckCircle2,
  Users,
  Send,
  Calendar,
  Terminal,
  Activity,
  Award,
} from "lucide-react";

export default function AutonomousRecruiterAgent() {
  const [isRunning, setIsRunning] = useState(false);
  const [mandate, setMandate] = useState("Find 3 Principal Full-Stack Go & Kubernetes Architects in India");
  const [candidatesFound, setCandidatesFound] = useState([
    {
      id: "ag-1",
      name: "Siddharth Rao",
      role: "Staff Infrastructure Engineer",
      company: "CloudScale Systems",
      score: 97,
      actionTaken: "Personalized Outreach InMail Dispatched",
      status: "Invited to Screening",
    },
    {
      id: "ag-2",
      name: "Meera Krishnan",
      role: "Principal Distributed SRE",
      company: "FinTech Hypergrowth",
      score: 95,
      actionTaken: "GitHub Codebase Audited (L6 Staff Certified)",
      status: "Matched & Queued",
    },
  ]);

  const [logs, setLogs] = useState([
    "[10:42:01] 🤖 Autonomous Recruiter Agent initialized. Model: HireHub-AI-Talent-v4",
    "[10:42:04] 🔍 Querying candidate pool across GitHub & verified ATS database...",
    "[10:42:09] ⚡ Audited Siddharth Rao repository (94% Concurrency score). Match Score: 97%",
    "[10:42:15] ✉️ Auto-generated personalized technical pitch and dispatched to candidate.",
  ]);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        const timestamp = new Date().toLocaleTimeString();
        const randomEvents = [
          `[${timestamp}] 🔍 Sourcing next cohort: Evaluating 14 candidates matching "${mandate.slice(0, 30)}..."`,
          `[${timestamp}] 🤖 Parsed resume tokens: Extracted Docker, Terraform, Kafka microservices.`,
          `[${timestamp}] 📊 Semantic Match Score calculated: 96% fit for senior infrastructure ladder.`,
          `[${timestamp}] ✉️ Generated Google Calendar invite link for next technical screen.`,
        ];
        const newLog = randomEvents[Math.floor(Math.random() * randomEvents.length)];
        setLogs((prev) => [...prev.slice(-8), newLog]);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isRunning, mandate]);

  const toggleAgent = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-8 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>Autonomous Recruiter Sourcing Loop</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Bot className="w-8 h-8 text-purple-400" />
              Autonomous AI Recruiter Agent
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Deploy autonomous AI agent loops to source, screen, and engage tier-1 software engineers 24/7.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleAgent}
              className={`px-6 py-3 rounded-2xl font-black text-xs transition shadow-lg flex items-center space-x-2 ${
                isRunning
                  ? "bg-rose-600 hover:bg-rose-500 text-white animate-pulse"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white"
              }`}
            >
              {isRunning ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isRunning ? "Pause Agent Loop" : "Launch Autonomous Agent"}</span>
            </button>
          </div>
        </div>

        {/* Goal Mandate Input */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl space-y-3">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400 block">
            Set Autonomous Hiring Mandate:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={mandate}
              onChange={(e) => setMandate(e.target.value)}
              placeholder="e.g. Find 5 Senior Go & Distributed Systems Engineers..."
              className="flex-1 bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => setIsRunning(true)}
              className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3.5 rounded-2xl font-bold text-xs transition shadow-md flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Update Mandate</span>
            </button>
          </div>
        </div>

        {/* Agent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Live Terminal Reasoning Logs (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  Agent Execution Log Stream
                </span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  {isRunning ? "Running Live Loop" : "Idle"}
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2 h-64 overflow-y-auto">
                {logs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Matched & Engaged Candidates (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  Auto-Sourced Candidate Pipeline
                </h3>
                <span className="text-xs font-bold text-purple-300">
                  {candidatesFound.length} Candidates Engaged
                </span>
              </div>

              <div className="space-y-3">
                {candidatesFound.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-black text-xs text-white">{c.name}</h4>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          {c.score}% Match
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {c.role} • {c.company}
                      </p>
                      <span className="text-[10px] text-purple-400 block mt-1">
                        ⚡ {c.actionTaken}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        window.open(
                          `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Interview+with+${encodeURIComponent(
                            c.name
                          )}`,
                          "_blank"
                        )
                      }
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-extrabold px-3 py-2 rounded-xl transition flex items-center space-x-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Meet</span>
                    </button>
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
