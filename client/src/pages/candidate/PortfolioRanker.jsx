import React, { useState } from "react";
import {
  Sparkles,
  Code2,
  GitBranch,
  FolderGit2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Award,
  Terminal,
  Layers,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  Cpu,
  RefreshCw,
  Search,
} from "lucide-react";

const DEMO_REPOSITORIES = [
  {
    name: "Distributed-Event-Streaming-Engine",
    owner: "aarav-sharma-dev",
    description: "High-throughput Kafka-backed CDC microservice with Redis caching & Prometheus telemetry.",
    stars: 142,
    forks: 38,
    techStack: ["Go", "Kafka", "Redis", "Docker", "Prometheus", "PostgreSQL"],
    seniorityLevel: "Senior Software Engineer (L5)",
    overallScore: 94,
    metrics: {
      architecture: 96,
      testingCoverage: 91,
      concurrencyHandling: 95,
      documentationRigor: 93,
    },
    strengths: [
      "Production-grade Goroutine concurrency pooling with zero-leak graceful shutdowns.",
      "Comprehensive benchmark tests handling 120,000+ simulated RPS under 8ms P99 latency.",
      "Clean Hexagonal / Ports & Adapters directory structure.",
    ],
    recommendations: [
      "Add OpenTelemetry distributed tracing headers for multi-cluster observability.",
      "Include a GitHub Actions CI pipeline step for automated mutation testing.",
    ],
    resumeBullets: [
      "Architected distributed event-streaming engine in Go, ingesting 120k+ RPS with sub-8ms P99 latency using Kafka & Redis sharding.",
      "Engineered automated health telemetry and Prometheus metrics, reducing incident MTTR by 42% across 8 production microservices.",
      "Implemented zero-downtime graceful shutdown protocols, guaranteeing 99.995% SLA during rolling Kubernetes upgrades.",
    ],
  },
  {
    name: "Fullstack-Autonomous-AI-Recruitment-Portal",
    owner: "sanjay-tech-architect",
    description: "End-to-end MERN recruitment ecosystem with live WebRTC video mocks and ATS resume auditing.",
    stars: 318,
    forks: 84,
    techStack: ["React 18", "Node.js", "Express", "MongoDB", "Socket.IO", "Tailwind CSS"],
    seniorityLevel: "Staff Full-Stack Architect (L6)",
    overallScore: 97,
    metrics: {
      architecture: 98,
      testingCoverage: 94,
      concurrencyHandling: 96,
      documentationRigor: 99,
    },
    strengths: [
      "Unified architectural topology with zero-downtime offline fallbacks and AST validation.",
      "Full-duplex WebSocket events supporting real-time speech telemetry and HUD metrics.",
      "Enterprise glassmorphic design system with WCAG AAA accessibility compliance.",
    ],
    recommendations: [
      "Configure automated Redis cluster caching for sub-millisecond job query reads.",
      "Introduce E2E Playwright test harnesses on GitHub Actions CI triggers.",
    ],
    resumeBullets: [
      "Engineered enterprise-grade MERN autonomous recruitment platform serving 50k+ monthly active job seekers with 99.9% uptime.",
      "Designed WebRTC live video interview telemetry pipeline capturing WPM metrics and speech recognition in real-time.",
      "Architected modular RBAC authentication supporting instant frictionless demo mode switching across 3 distinct enterprise personas.",
    ],
  },
];

export default function PortfolioRanker() {
  const [repoInput, setRepoInput] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(DEMO_REPOSITORIES[0]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [copiedBulletIdx, setCopiedBulletIdx] = useState(null);

  const handleAudit = (repoToAudit = selectedRepo) => {
    setIsAuditing(true);
    setTimeout(() => {
      setSelectedRepo(repoToAudit);
      setIsAuditing(false);
    }, 1200);
  };

  const handleCopyBullet = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(idx);
    setTimeout(() => setCopiedBulletIdx(null), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-8 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI GitHub & Repository Ranker</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <GitBranch className="w-8 h-8 text-purple-400" />
              AI Codebase & Portfolio Seniority Auditor
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Audit public codebases for system complexity, testing coverage, architectural cleanliness, and generate Google XYZ resume bullets.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl text-right">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Audited Seniority Level
              </span>
              <span className="text-base font-black text-purple-400">
                {selectedRepo.seniorityLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Search & Demo Repos Bar */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <GitBranch className="w-5 h-5 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                placeholder="Paste any GitHub repository URL (e.g. github.com/username/project)..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <button
              onClick={() => handleAudit(DEMO_REPOSITORIES[0])}
              disabled={isAuditing}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-7 py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-purple-500/20"
            >
              {isAuditing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Auditing Codebase...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Run AI Audit</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
            <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">
              Or Try Curated Engineering Showcases:
            </span>
            {DEMO_REPOSITORIES.map((repo, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedRepo(repo);
                  setRepoInput(`https://github.com/${repo.owner}/${repo.name}`);
                }}
                className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition flex items-center space-x-1.5 ${
                  selectedRepo.name === repo.name
                    ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-md"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>{repo.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Audit Results Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Metrics & Scorecard (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Overall Score Badge */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                    Composite Engineering Index
                  </span>
                  <h3 className="text-2xl font-black text-white">{selectedRepo.name}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    @{selectedRepo.owner}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex flex-col items-center justify-center shadow-lg shadow-purple-500/20">
                  <span className="text-2xl font-black text-white leading-none">
                    {selectedRepo.overallScore}
                  </span>
                  <span className="text-[9px] font-bold uppercase text-purple-200">/ 100</span>
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {selectedRepo.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-800/80 border border-slate-700/60 text-slate-300 px-2.5 py-1 rounded-lg text-[10px] font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Progress Bars */}
              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 font-medium mb-1">
                    <span>Architecture & Clean Code</span>
                    <span className="font-bold text-white">
                      {selectedRepo.metrics.architecture}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${selectedRepo.metrics.architecture}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 font-medium mb-1">
                    <span>Concurrency & Scalability</span>
                    <span className="font-bold text-white">
                      {selectedRepo.metrics.concurrencyHandling}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                      style={{ width: `${selectedRepo.metrics.concurrencyHandling}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 font-medium mb-1">
                    <span>Unit & Integration Testing Rigor</span>
                    <span className="font-bold text-white">
                      {selectedRepo.metrics.testingCoverage}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                      style={{ width: `${selectedRepo.metrics.testingCoverage}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 font-medium mb-1">
                    <span>Documentation & CI/CD Pipelines</span>
                    <span className="font-bold text-white">
                      {selectedRepo.metrics.documentationRigor}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000"
                      style={{ width: `${selectedRepo.metrics.documentationRigor}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths & Recommendations */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Key Architectural Strengths
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedRepo.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  Optimization Opportunities
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedRepo.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Google XYZ Resume Bullets (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    Auto-Generated Google XYZ Resume Bullets
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Quantified accomplishments formatted specifically for FAANG ATS parsers.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {selectedRepo.resumeBullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-purple-500/40 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
                        "{bullet}"
                      </p>
                      <button
                        onClick={() => handleCopyBullet(bullet, idx)}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition flex-shrink-0"
                        title="Copy to Clipboard"
                      >
                        {copiedBulletIdx === idx ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="text-indigo-400 font-bold uppercase tracking-wider">
                        Google XYZ Format: [Accomplished X] + [Measured by Y] + [By Doing Z]
                      </span>
                      {copiedBulletIdx === idx && (
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter Radar Readiness Card */}
            <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900/90 border border-purple-500/30 p-6 rounded-3xl backdrop-blur-xl shadow-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 block mb-1">
                  Ready for Direct Recruiter Sourcing
                </span>
                <h4 className="text-base font-black text-white">
                  Add Verified Badge to Talent Radar
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Recruiters on HireHub can directly shortlist candidates with high codebase seniority scores.
                </p>
              </div>
              <button
                onClick={() => alert("Repository verified and linked to your candidate talent profile!")}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-2xl text-xs font-extrabold shadow-lg transition flex-shrink-0"
              >
                Attach to Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
