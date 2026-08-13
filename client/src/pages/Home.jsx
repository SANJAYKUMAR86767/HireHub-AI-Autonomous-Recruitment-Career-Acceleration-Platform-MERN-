import React, { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "../components/JobCard";
import SalaryPredictorModal from "../components/SalaryPredictorModal";
import {
  Search,
  Sparkles,
  Briefcase,
  DollarSign,
  Compass,
  Zap,
  TrendingUp,
  Award,
  Users,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Flame,
  Globe2,
  Building2,
  Cpu,
  Layers,
  ChevronRight,
  Filter,
  RefreshCw,
  Globe,
  Bot,
  ExternalLink,
  Video,
  Star,
  Building,
  CheckCircle2,
  Clock,
  Heart,
  Target,
  MessageSquare,
  FileCode2,
  BookOpen,
  Terminal,
  GitBranch,
  Scale,
  Activity,
  EyeOff,
  Mail,
  Send,
  Radio,
  Server,
  Database,
  Code2,
} from "lucide-react";
import { Link } from "react-router-dom";

const DEFAULT_FEATURED_JOBS = [
  {
    _id: "demo-job-1",
    title: "Senior Full Stack Distributed Architect",
    companyName: "Meta / Instagram",
    location: "Bengaluru, IN (Remote)",
    workMode: "Remote",
    jobType: "Full-time",
    salary: "₹36 - 54 LPA",
    salaryMin: 3600000,
    salaryMax: 5400000,
    skills: ["React", "Node.js", "TypeScript", "Kafka", "GraphQL", "AWS"],
    description: "Architect and scale mission-critical high-throughput feed microservices supporting 50M+ concurrent global users.",
    experienceRequired: 5,
  },
  {
    _id: "demo-job-2",
    title: "Staff Frontend Core Web Vitals Lead",
    companyName: "Stripe Platform",
    location: "Hyderabad, IN (Hybrid)",
    workMode: "Hybrid",
    jobType: "Full-time",
    salary: "₹32 - 48 LPA",
    salaryMin: 3200000,
    salaryMax: 4800000,
    skills: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Web Performance"],
    description: "Lead global checkout UX architecture and optimize sub-second load times across mobile and web interfaces.",
    experienceRequired: 4,
  },
  {
    _id: "demo-job-3",
    title: "Principal Cloud DevOps & Kubernetes SRE",
    companyName: "Amazon Web Services",
    location: "Bengaluru, IN (Onsite)",
    workMode: "Onsite",
    jobType: "Full-time",
    salary: "₹40 - 62 LPA",
    salaryMin: 4000000,
    salaryMax: 6200000,
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD", "Linux"],
    description: "Manage multi-region Kubernetes clusters with zero-downtime canary deployments and 99.999% SLA availability.",
    experienceRequired: 6,
  },
  {
    _id: "demo-job-4",
    title: "Autonomous AI & GenAI Systems Engineer",
    companyName: "OpenAI Platform Partner",
    location: "San Francisco / Remote",
    workMode: "Remote",
    jobType: "Full-time",
    salary: "$165,000 - $225,000",
    salaryMin: 4500000,
    salaryMax: 7500000,
    skills: ["Python", "LangChain", "Vector DB", "FastAPI", "PostgreSQL", "PyTorch"],
    description: "Build low-latency LLM agent reasoning pipelines, vector embeddings, and RAG retrieval systems.",
    experienceRequired: 4,
  },
  {
    _id: "demo-job-5",
    title: "High-Throughput Backend Golang Engineer",
    companyName: "Uber Infrastructure",
    location: "Bengaluru, IN (Hybrid)",
    workMode: "Hybrid",
    jobType: "Full-time",
    salary: "₹30 - 45 LPA",
    salaryMin: 3000000,
    salaryMax: 4500000,
    skills: ["Go", "Microservices", "Redis", "PostgreSQL", "gRPC", "Docker"],
    description: "Design high-concurrency dispatch and geolocation microservices handling 250,000+ QPS.",
    experienceRequired: 3,
  },
  {
    _id: "demo-job-6",
    title: "Lead Security & Cloud Compliance Architect",
    companyName: "TechCorp Global",
    location: "Mumbai, IN (Remote)",
    workMode: "Remote",
    jobType: "Full-time",
    salary: "₹28 - 42 LPA",
    salaryMin: 2800000,
    salaryMax: 4200000,
    skills: ["Cloud Security", "OAuth 2.0", "Penetration Testing", "AWS", "KMS"],
    description: "Enforce enterprise zero-trust security architecture, JWT cryptographic signing, and cloud compliance.",
    experienceRequired: 5,
  },
];

const LIVE_ACTIVITIES = [
  "⚡ Autonomous Agent: Siddharth R. matched 97% fit for Principal Cloud DevOps Architect",
  "🎥 Live Mock Studio: Priya M. completed STAR interview with 96% confidence telemetry",
  "🤖 ATS Parser Processed 8,400+ Resumes with 99.8% verified semantic accuracy",
  "💥 Chaos Sandbox: Redis failover circuit breaker recovered in 12ms with zero downtime",
  "🎉 Recruiter Boolean Engine: Sourced 24 verified Staff Golang leads in 3 seconds",
];

const PLATFORM_STATS = [
  { label: "Active Global Opportunities", value: "50,000+", icon: Briefcase, color: "text-indigo-400" },
  { label: "AI ATS Matching Precision", value: "99.8%", icon: Sparkles, color: "text-emerald-400" },
  { label: "Autonomous AI Studios", value: "16+", icon: Bot, color: "text-purple-400" },
  { label: "Real-Time Socket Telemetry", value: "<15 ms", icon: Activity, color: "text-amber-400" },
];

const TECH_BADGES = [
  { name: "React 18", type: "Frontend" },
  { name: "Node.js & Express", type: "Backend API" },
  { name: "MongoDB Atlas", type: "Cloud DB" },
  { name: "Socket.IO", type: "Realtime" },
  { name: "WebRTC Streaming", type: "Live Video" },
  { name: "Web Speech API", type: "AI Speech" },
  { name: "Tailwind CSS 3", type: "Styling" },
  { name: "Vercel Edge", type: "Edge CDN" },
  { name: "Docker", type: "DevOps" },
];

const CATEGORIES = [
  { name: "All", label: "All Global Roles", icon: Layers, keywords: [] },
  { name: "Frontend", label: "Frontend", icon: Cpu, keywords: ["frontend", "react", "vue", "ui", "javascript", "web", "developer", "engineer", "css"] },
  { name: "Backend", label: "Backend", icon: Building2, keywords: ["backend", "node", "python", "java", "api", "express", "server", "engineer", "django", "spring"] },
  { name: "Full Stack", label: "Full Stack", icon: Zap, keywords: ["full stack", "fullstack", "mern", "developer", "engineer"] },
  { name: "Cloud & DevOps", label: "Cloud & DevOps", icon: Globe2, keywords: ["cloud", "devops", "aws", "docker", "kubernetes", "architect", "sre", "security"] },
];

const TOP_COMPANIES = [
  { name: "Meta / Instagram", logo: "M", rating: "4.9 ★", activeJobs: "14 Positions", verified: true },
  { name: "Uber Infrastructure", logo: "U", rating: "4.8 ★", activeJobs: "22 Positions", verified: true },
  { name: "OpenAI Platform Partner", logo: "O", rating: "5.0 ★", activeJobs: "18 Positions", verified: true },
  { name: "Amazon Web Services", logo: "A", rating: "4.9 ★", activeJobs: "35 Positions", verified: true },
  { name: "TechCorp Global", logo: "T", rating: "4.7 ★", activeJobs: "12 Positions", verified: true },
];

const ADVANCED_PLATFORM_FEATURES = [
  {
    category: "recruiter",
    title: "Autonomous AI Recruiter Agent",
    desc: "24/7 autonomous loop sourcing, screening, and scheduling interviews with senior candidates.",
    icon: Bot,
    color: "from-purple-600 to-indigo-600",
    link: "/recruiter/autonomous-agent",
    badge: "Recruiter Suite",
  },
  {
    category: "candidate",
    title: "Video Body Language Telemetry HUD",
    desc: "Real-time eye contact tracking, speech cadence meter, and filler word detection.",
    icon: Video,
    color: "from-blue-600 to-indigo-600",
    link: "/candidate/video-telemetry",
    badge: "Live Telemetry",
  },
  {
    category: "candidate",
    title: "FAANG Skill Gap & Leveling Matrix",
    desc: "Benchmark technical competencies against L4/L5/L6 ladders with a 90-day promotion sprint.",
    icon: Target,
    color: "from-emerald-600 to-teal-600",
    link: "/candidate/skill-matrix-gap",
    badge: "Career Ladder",
  },
  {
    category: "candidate",
    title: "1-Click AI InMail & Cold Pitch Generator",
    desc: "Craft high-conversion cold messages for Founders, Hiring Managers, and Peer Engineers.",
    icon: Send,
    color: "from-amber-500 to-orange-600",
    link: "/candidate/inmail-pitch",
    badge: "Outreach Engine",
  },
  {
    category: "candidate",
    title: "AI Behavioral STAR Storytelling Coach",
    desc: "Interactive Amazon Leadership Principles & Google behavioral rubric with real-time STAR scoring.",
    icon: Star,
    color: "from-amber-500 to-orange-600",
    link: "/candidate/star-coach",
    badge: "FAANG Rubric",
  },
  {
    category: "system",
    title: "Distributed Chaos & Self-Healing Sandbox",
    desc: "Inject infrastructure failures (Redis outage, DDoS, DB partitions) and stress-test circuit breakers.",
    icon: Activity,
    color: "from-rose-500 to-red-600",
    link: "/candidate/chaos-simulator",
    badge: "Chaos Monkey",
  },
  {
    category: "recruiter",
    title: "AI Boolean Search & Talent X-Ray",
    desc: "Generate production Boolean query strings and launch 1-click candidate search across LinkedIn & GitHub.",
    icon: Search,
    color: "from-indigo-600 to-purple-600",
    link: "/recruiter/boolean-generator",
    badge: "Headhunting",
  },
  {
    category: "recruiter",
    title: "AI Blind Resume & Bias Shield",
    desc: "Anonymize candidate demographic tags while highlighting pure verified technical achievements.",
    icon: EyeOff,
    color: "from-emerald-600 to-teal-600",
    link: "/recruiter/blind-resume",
    badge: "DEI Shield",
  },
  {
    category: "candidate",
    title: "AI Salary & Offer Negotiation Studio",
    desc: "Interactive AI HR persona simulator with 1-click tactical counter-offer scripts and equity lift calculators.",
    icon: DollarSign,
    color: "from-emerald-500 to-teal-600",
    link: "/candidate/salary-negotiator",
    badge: "Compensation",
  },
  {
    category: "candidate",
    title: "AI GitHub & Codebase Seniority Auditor",
    desc: "Audits repository architecture, concurrency, CI/CD, and generates quantified Google XYZ resume bullets.",
    icon: GitBranch,
    color: "from-purple-600 to-indigo-600",
    link: "/candidate/portfolio-ranker",
    badge: "Code Audit",
  },
  {
    category: "candidate",
    title: "Global PPP & Tax Salary Normalizer",
    desc: "Compare tech salaries between India, US, UK, Germany & UAE with real-world tax take-home and rent costs.",
    icon: Globe2,
    color: "from-blue-600 to-cyan-600",
    link: "/candidate/global-compensation",
    badge: "PPP Insights",
  },
  {
    category: "recruiter",
    title: "Recruiter Multi-Candidate Screener",
    desc: "Side-by-side candidate comparison radar with automated red flag detection and tailored interview questions.",
    icon: Users,
    color: "from-pink-600 to-purple-600",
    link: "/recruiter/batch-screener",
    badge: "Radar Screener",
  },
  {
    category: "candidate",
    title: "Live Mock Video Interview Studio",
    desc: "Camera & mic video studio with real-time speech transcription, WPM pace HUD, and instant 4-pillar rubric grading.",
    icon: Video,
    color: "from-amber-500 to-orange-600",
    link: "/candidate/live-interview",
    badge: "Live Video",
  },
  {
    category: "candidate",
    title: "Engineering Career Leveling Roadmap",
    desc: "Interactive career leveling ladder (L1-L5), salary benchmarks across INR & USD, and promotion milestone checklists.",
    icon: TrendingUp,
    color: "from-indigo-500 to-purple-600",
    link: "/candidate/career-roadmap",
    badge: "Roadmap",
  },
  {
    category: "recruiter",
    title: "Recruiter Autonomous Talent Radar",
    desc: "Direct candidate scouting by skill matrix, AI match fit, verified badges, and 1-click Google Calendar invites.",
    icon: Target,
    color: "from-purple-500 to-pink-600",
    link: "/recruiter/talent-pool",
    badge: "Talent Radar",
  },
  {
    category: "candidate",
    title: "AI ATS Resume Parser & Score",
    desc: "Instant 0-100% precision match score with missing skills matrix & AI tailored Cover Letter.",
    icon: Sparkles,
    color: "from-indigo-600 to-blue-600",
    link: "/jobs/demo-job-1",
    badge: "ATS Parser",
  },
];

export default function Home() {
  const [jobs, setJobs] = useState(DEFAULT_FEATURED_JOBS);
  const [q, setQ] = useState("");
  const [workModeFilter, setWorkModeFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [studioFilter, setStudioFilter] = useState("all");
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % LIVE_ACTIVITIES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const categories = CATEGORIES;
  const topCompanies = TOP_COMPANIES;
  const advancedPlatformFeatures = ADVANCED_PLATFORM_FEATURES;

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/jobs");
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        setJobs(res.data);
      } else {
        setJobs(DEFAULT_FEATURED_JOBS);
      }
    } catch (err) {
      setJobs(DEFAULT_FEATURED_JOBS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    if (q.trim()) {
      const query = q.toLowerCase();
      const title = (job.title || "").toLowerCase();
      const company = (job.companyName || job.company || "").toLowerCase();
      const skills = (job.skills || []).map((s) => s.toLowerCase()).join(" ");
      const location = (job.location || "").toLowerCase();

      const matchesSearch =
        title.includes(query) || company.includes(query) || skills.includes(query) || location.includes(query);
      if (!matchesSearch) return false;
    }

    if (activeCategory !== "All") {
      const selectedCat = categories.find((c) => c.name === activeCategory);
      if (selectedCat) {
        const title = (job.title || "").toLowerCase();
        const skills = (job.skills || []).map((s) => s.toLowerCase()).join(" ");
        const desc = (job.description || "").toLowerCase();

        const matchesKeyword = selectedCat.keywords.some(
          (kw) => title.includes(kw) || skills.includes(kw) || desc.includes(kw)
        );

        if (!matchesKeyword) return false;
      }
    }

    if (workModeFilter !== "all") {
      const mode = (job.workMode || "").toLowerCase();
      const title = (job.title || "").toLowerCase();
      const location = (job.location || "").toLowerCase();
      const targetMode = workModeFilter.toLowerCase();

      const matchesMode = mode.includes(targetMode) || location.includes(targetMode) || title.includes(targetMode);
      if (!matchesMode && mode !== targetMode) {
        return true;
      }
    }

    return true;
  });

  const filteredStudios = advancedPlatformFeatures.filter((f) => {
    if (studioFilter === "all") return true;
    return f.category === studioFilter;
  });

  const resetFilters = () => {
    setActiveCategory("All");
    setWorkModeFilter("all");
    setQ("");
  };

  const encodedSearch = encodeURIComponent(q.trim() || "Software Engineer");
  const globalLinkedinSearch = `https://www.linkedin.com/jobs/search/?keywords=${encodedSearch}`;
  const globalNaukriSearch = `https://www.naukri.com/${encodedSearch}-jobs`;
  const globalGoogleSearch = `https://www.google.com/search?q=${encodedSearch}+jobs`;
  const globalInternshalaSearch = `https://internshala.com/jobs/${encodedSearch}-jobs/`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white bg-grid-pattern relative">
      {/* Live Activity Ticker Bar */}
      <div className="bg-indigo-950/90 border-b border-indigo-500/20 py-2.5 px-4 backdrop-blur-xl text-xs font-semibold flex items-center justify-center text-indigo-300 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 overflow-hidden">
          <span className="flex h-2 w-2 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="uppercase text-[10px] tracking-widest text-emerald-400 font-extrabold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            Realtime AI Activity
          </span>
          <span className="truncate transition-all duration-500 text-slate-200">{LIVE_ACTIVITIES[tickerIndex]}</span>
        </div>
      </div>

      {/* World-Class Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-20 px-4">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/25 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[300px] bg-purple-600/20 blur-[130px] rounded-full pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[250px] bg-emerald-600/15 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2.5 bg-slate-900/90 backdrop-blur-2xl border border-indigo-500/40 px-4 py-2 rounded-full text-xs font-extrabold text-indigo-300 mb-8 shadow-2xl glow-indigo animate-float">
            <Bot className="w-4 h-4 text-indigo-400 animate-spin" />
            <span>Autonomous AI Ecosystem & Recruitment Operating System</span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-black tracking-tight leading-[1.08]">
            Accelerating Global Tech Careers with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300">
              Autonomous AI Intelligence
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            16+ unified studios: Live Video Mock HUDs, FAANG STAR Storytelling Coach, Autonomous Headhunting Agents, Chaos Engineering Simulators, and Global PPP Salary Analyzers.
          </p>

          {/* Quick Hero Call-to-Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/candidate/live-interview"
              className="bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 text-white px-7 py-3.5 rounded-2xl font-black text-xs shadow-xl shadow-indigo-500/30 transition flex items-center space-x-2"
            >
              <Video className="w-4 h-4 text-amber-400" />
              <span>Launch Live Video AI Studio</span>
            </Link>

            <Link
              to="/recruiter/autonomous-agent"
              className="bg-slate-900/90 hover:bg-slate-800 text-purple-300 border border-purple-500/40 px-7 py-3.5 rounded-2xl font-black text-xs shadow-xl backdrop-blur-xl transition flex items-center space-x-2"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span>Deploy Autonomous Recruiter</span>
            </Link>
          </div>

          {/* Interactive Search Box */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="glass-panel p-4 rounded-3xl shadow-2xl glow-purple border border-slate-700/80">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 flex items-center">
                  <Search className="w-5 h-5 text-indigo-400 absolute left-4" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Type any job title or skill (e.g. Golang, React, Kafka, DevOps, PyTorch)..."
                    className="w-full bg-slate-900/80 text-white placeholder-slate-400 pl-12 pr-4 py-3.5 rounded-2xl text-sm font-medium focus:outline-none border border-slate-700/60 focus:border-indigo-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById("jobs-marketplace")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 text-white px-7 py-3.5 rounded-2xl font-bold text-xs shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Platform</span>
                  </button>
                </div>
              </div>

              {/* Live External World Search Launchers */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-left">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-indigo-400" />
                    <span>Live External Global Search Engine:</span>
                    {q.trim() && <span className="text-amber-400 font-bold">"{q.trim()}"</span>}
                  </span>
                  <span className="text-[10px] text-slate-500">Instant redirection to live verified global postings</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <a
                    href={globalLinkedinSearch}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600/25 hover:bg-blue-600 text-blue-200 hover:text-white border border-blue-500/40 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-md"
                  >
                    <span>Search LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={globalNaukriSearch}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-sky-600/25 hover:bg-sky-600 text-sky-200 hover:text-white border border-sky-500/40 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-md"
                  >
                    <span>Search Naukri.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={globalGoogleSearch}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-rose-600/25 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-500/40 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-md"
                  >
                    <span>Search Google Jobs</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={globalInternshalaSearch}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-cyan-600/25 hover:bg-cyan-600 text-cyan-200 hover:text-white border border-cyan-500/40 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-md"
                  >
                    <span>Search Internshala</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Real-Time KPI Stats Banner */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PLATFORM_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl backdrop-blur-xl shadow-xl flex items-center space-x-4 group hover:border-indigo-500/40 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{stat.value}</h3>
                  <p className="text-[11px] text-slate-400 font-medium">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technologies & Languages Architecture Ribbon */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-slate-900/80 border border-slate-800/80 p-5 rounded-3xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-widest text-indigo-400 flex-shrink-0">
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>Powering Infrastructure:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {TECH_BADGES.map((b, i) => (
              <span
                key={i}
                className="bg-slate-950/90 border border-slate-700/60 text-slate-300 px-3 py-1 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>{b.name}</span>
                <span className="text-[9px] text-slate-500 uppercase">({b.type})</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Hiring Partners & Companies */}
      <div className="max-w-6xl mx-auto px-4 mb-16 relative z-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2">
            <Building className="w-4 h-4 text-indigo-400" />
            Top Verified Hiring Partners & Enterprises
          </h3>
          <span className="text-xs text-slate-500 font-semibold">240+ Companies Hiring Now</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {topCompanies.map((c, i) => (
            <div
              key={i}
              className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 p-4 rounded-2xl transition-all shadow-lg flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-300 font-bold flex items-center justify-center text-xs">
                  {c.logo}
                </div>
                <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                  {c.rating}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-white group-hover:text-indigo-400 transition-colors truncate">
                  {c.name}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{c.activeJobs}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Platform Suite Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-3">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Unified Autonomous Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            16+ Autonomous AI Studios
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Everything you need for candidate evaluation, interview simulation, real-time telemetry, and recruiter automation.
          </p>

          {/* Category Tabs Filter */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All 16+ Studios" },
              { id: "candidate", label: "🧑 Candidate AI Studios" },
              { id: "recruiter", label: "💼 Recruiter Suites" },
              { id: "system", label: "⚡ System & Code Engines" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStudioFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  studioFilter === tab.id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStudios.map((f, i) => {
            const Icon = f.icon;
            return (
              <Link
                key={i}
                to={f.link}
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-3xl transition-all shadow-xl flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${f.color} text-white font-bold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-white group-hover:text-indigo-400 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
                  <span>Launch Studio</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Interactive Global Jobs Marketplace */}
      <div id="jobs-marketplace" className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-white flex items-center gap-2.5">
              <Globe className="w-7 h-7 text-indigo-400" />
              Explore Global Opportunities
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Showing <span className="text-indigo-400 font-bold">{filteredJobs.length}</span> positions for category:{" "}
              <span className="text-amber-400 font-bold uppercase tracking-wider">{activeCategory}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Category pills */}
            <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-slate-700/80 flex items-center space-x-1 overflow-x-auto max-w-full backdrop-blur-xl">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setActiveCategory(cat.name);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition whitespace-nowrap ${
                      activeCategory === cat.name
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Work mode selector */}
            <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-slate-700/80 flex items-center space-x-1 backdrop-blur-xl">
              {["all", "Remote", "Hybrid", "Onsite"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setWorkModeFilter(mode)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                    workModeFilter === mode
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {mode === "all" ? "All Modes" : mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Job Cards Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-52 bg-slate-900/60 border border-slate-800/80 rounded-3xl animate-pulse p-6" />
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center max-w-xl mx-auto border border-slate-800">
            <Briefcase className="w-14 h-14 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-200">No jobs match this specific filter query</h3>
            <p className="text-xs text-slate-400 mt-1 mb-5">
              Click <span className="text-indigo-400 font-semibold">"Reset Filters"</span> to view all verified positions.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold px-5 py-3 rounded-2xl transition shadow-xl"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Filters & Show All Jobs</span>
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>

      {/* Salary Modal */}
      <SalaryPredictorModal isOpen={showSalaryModal} onClose={() => setShowSalaryModal(false)} />
    </div>
  );
}
