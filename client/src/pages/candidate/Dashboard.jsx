import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  FileText,
  Upload,
  Sparkles,
  Code2,
  Award,
  ArrowRight,
  CheckCircle2,
  Compass,
  Briefcase,
  Video,
  MessageSquare,
  Globe,
  ExternalLink,
  TrendingUp,
  Terminal,
  ShieldCheck,
  BookOpen,
  DollarSign,
  Layers,
  FileCode2,
  Calendar,
  Bookmark,
  ChevronRight,
  TrendingDown,
  Timer
} from "lucide-react";
import { Link } from "react-router-dom";
import JobCard from "../../components/JobCard";

export default function CandidateDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [skillsInput, setSkillsInput] = useState("");
  const [saved, setSaved] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [apps, setApps] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);

  useEffect(() => {
    api.get("/auth/me").then((res) => {
      setProfile(res.data);
      setSkillsInput((res.data.skills || []).join(", "));
    });

    api
      .get("/advanced/recommendations")
      .then((res) => setRecommendedJobs(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingRecs(false));

    api
      .get("/applications/mine")
      .then((res) => setApps(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingApps(false));
  }, []);

  const saveSkills = async () => {
    try {
      const skillsArray = skillsInput.split(",").map((s) => s.trim()).filter(Boolean);
      await api.put("/auth/me", { skills: skillsArray });
      setSaved(true);
      setProfile((p) => ({ ...p, skills: skillsArray }));
      setTimeout(() => setSaved(false), 2000);

      api.get("/advanced/recommendations").then((res) => setRecommendedJobs(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    if (!resumeFile) return;
    const formData = new FormData();
    formData.append("resume", resumeFile);
    try {
      setUploading(true);
      const res = await api.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadMsg("Resume parsed & uploaded successfully!");
      setProfile((p) => ({ ...p, resumeUrl: res.data.resumeUrl }));
    } catch (err) {
      setUploadMsg(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Computations for Stats Cards
  const totalAppsCount = apps.length;
  const upcomingInterviews = apps.filter((a) => a.status === "interview");
  const interviewsCount = upcomingInterviews.length;
  const offersCount = apps.filter((a) => a.status === "hired").length;
  const responseRate = totalAppsCount > 0 
    ? Math.round(((apps.filter(a => ["interview", "hired", "shortlisted"].includes(a.status)).length) / totalAppsCount) * 100) 
    : 100;

  const getStatusColor = (status) => {
    switch (status) {
      case "hired":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "interview":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "shortlisted":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "rejected":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      default:
        return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner Greeting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            Welcome back, {user?.name || "Job Seeker"}! 👋
          </h1>
          <p className="text-xs text-slate-400 mt-1">Here's your job search and AI interview preparation overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/candidate/saved-jobs"
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
          >
            <Bookmark className="w-4 h-4 text-indigo-400" />
            <span>Saved Jobs</span>
          </Link>
          <Link
            to="/candidate/applications"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-md shadow-indigo-600/30"
          >
            <span>My Applications</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={FileText}
          label="Total Applications"
          value={totalAppsCount}
          subtitle="+100% this week"
          color="text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
        />
        <StatCard
          icon={Calendar}
          label="Upcoming Interviews"
          value={interviewsCount}
          subtitle={`${interviewsCount} scheduled rounds`}
          color="text-amber-400 bg-amber-500/10 border-amber-500/20"
        />
        <StatCard
          icon={CheckCircle2}
          label="Offers Received"
          value={offersCount}
          subtitle="Offered / Hired positions"
          color="text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
        />
        <StatCard
          icon={TrendingUp}
          label="Recruiter Response Rate"
          value={`${responseRate}%`}
          subtitle="Avg feedback score"
          color="text-purple-400 bg-purple-500/10 border-purple-500/20"
        />
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Upcoming Interviews & Job Recommendations */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Upcoming Interviews */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                Upcoming Interviews
              </h3>
              {interviewsCount > 0 && (
                <span className="text-[10px] bg-amber-500/20 border border-amber-500/30 text-amber-300 font-extrabold px-2 py-0.5 rounded-full uppercase">
                  {interviewsCount} Upcoming
                </span>
              )}
            </div>

            {loadingApps ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-16 bg-slate-800 rounded-xl" />
              </div>
            ) : upcomingInterviews.length === 0 ? (
              <div className="border border-dashed border-slate-800 rounded-2xl p-8 text-center text-xs text-slate-500">
                No interviews scheduled yet. Recruiters will schedule sessions here.
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingInterviews.map((a) => (
                  <div key={a._id} className="bg-slate-950/80 border border-slate-850 p-4 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white text-xs leading-none">
                          {a.jobId?.title || "MERN Developer"}
                        </h4>
                        <span className="text-[10px] text-slate-400 block mt-1">
                          {a.jobId?.company || "HireHub Partner"}
                        </span>
                      </div>
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        Online
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                      <Timer className="w-3.5 h-3.5 text-slate-500" />
                      <span>{a.interviewDate ? new Date(a.interviewDate).toLocaleString() : "Date pending"}</span>
                    </div>
                    <a
                      href="https://meet.jit.si/HireHubInterview"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-indigo-600 hover:bg-indigo-750 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Interview Room</span>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Jobs */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
            <h3 className="font-extrabold text-white text-sm flex items-center gap-2 mb-4">
              <Compass className="w-4 h-4 text-indigo-400" />
              Recommended Jobs (Based on Skills)
            </h3>

            {loadingRecs ? (
              <div className="space-y-3">
                {[1, 2].map((n) => (
                  <div key={n} className="h-20 bg-slate-850 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : recommendedJobs.length === 0 ? (
              <div className="border border-dashed border-slate-850 rounded-2xl p-8 text-center text-xs text-slate-500">
                No recommended jobs yet. Add more tech stack skills to trigger matches!
              </div>
            ) : (
              <div className="space-y-3">
                {recommendedJobs.slice(0, 3).map(({ job, matchPercentage }) => (
                  <div key={job._id} className="bg-slate-950 border border-slate-850/60 p-4 rounded-2xl flex items-center justify-between gap-2 hover:border-indigo-500/50 transition">
                    <div>
                      <h4 className="font-bold text-white text-xs">{job.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {job.companyName || job.company} · {job.location || "Remote"}
                      </p>
                    </div>
                    <Link
                      to={`/jobs/${job._id}`}
                      className="bg-indigo-600/10 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/20 px-3 py-1.5 rounded-lg text-[10px] font-bold transition shrink-0"
                    >
                      Apply ({matchPercentage}%)
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Latest Application Status Pipeline */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Latest Application Status
              </h3>
              <Link to="/candidate/applications" className="text-[11px] font-bold text-indigo-400 hover:underline">
                View All Applications →
              </Link>
            </div>

            {loadingApps ? (
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-16 bg-slate-850 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : apps.length === 0 ? (
              <div className="border border-dashed border-slate-850 rounded-2xl p-12 text-center text-slate-400">
                <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h4 className="font-bold text-slate-300 text-xs">No applications submitted yet</h4>
                <p className="text-[10px] text-slate-500 mt-1">Explore job postings and submit your AI applications.</p>
                <Link
                  to="/jobs"
                  className="mt-4 inline-flex bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition"
                >
                  Explore Jobs Board
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {apps.slice(0, 5).map((a) => (
                  <div key={a._id} className="bg-slate-950 border border-slate-850 p-4 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-xs font-bold text-indigo-400 shrink-0 border border-slate-800">
                        {(a.jobId?.company || a.jobId?.companyName || "C").charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-xs truncate">
                          {a.jobId?.title || "Position Title"}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                          {a.jobId?.company || "Company"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border ${getStatusColor(a.status)}`}>
                        {a.status === "hired" ? "Offered 🎉" : a.status}
                      </span>
                      <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                        {a.aiScore}% Match
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Candidate Status Conversion Pipeline Bar Chart */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-white text-sm">Your Application Pipeline Funnel</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-350 mb-1.5">
                  <span>Applied Roles</span>
                  <span>{apps.length} Jobs</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-850">
                  <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000" style={{ width: apps.length > 0 ? "100%" : "0%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-350 mb-1.5">
                  <span>Shortlisted (Under Review)</span>
                  <span>{apps.filter((a) => ["shortlisted", "interview", "hired"].includes(a.status)).length} Jobs</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-850">
                  <div className="bg-purple-500 h-full rounded-full transition-all duration-1000" style={{ width: apps.length > 0 ? `${(apps.filter((a) => ["shortlisted", "interview", "hired"].includes(a.status)).length / apps.length) * 100}%` : "0%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-350 mb-1.5">
                  <span>Interviews Scheduled</span>
                  <span>{apps.filter((a) => ["interview", "hired"].includes(a.status)).length} Jobs</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-850">
                  <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: apps.length > 0 ? `${(apps.filter((a) => ["interview", "hired"].includes(a.status)).length / apps.length) * 100}%` : "0%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-350 mb-1.5">
                  <span>Offered / Hired</span>
                  <span>{apps.filter((a) => a.status === "hired").length} Jobs</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-850">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: apps.length > 0 ? `${(apps.filter((a) => a.status === "hired").length / apps.length) * 100}%` : "0%" }} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Global External Job Crawlers Shortcut */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <h3 className="font-extrabold text-white text-sm mb-4">
          Direct External Application Portals
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <a
            href="https://www.linkedin.com/jobs"
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <span>Apply on LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.naukri.com"
            target="_blank"
            rel="noreferrer"
            className="bg-sky-600/20 hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/30 px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <span>Apply on Naukri.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.google.com/search?q=software+engineer+jobs"
            target="_blank"
            rel="noreferrer"
            className="bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <span>Apply on Google Jobs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://internshala.com/jobs"
            target="_blank"
            rel="noreferrer"
            className="bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/30 px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <span>Apply on Internshala</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Integrated Master AI Acceleration Tools */}
      <div>
        <h3 className="font-extrabold text-white text-lg mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          Integrated Master AI Workspaces & Acceleration Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCommandCard
            title="🤖 ChatGPT AI Interview Arena"
            desc="Chat back-and-forth in real-time with specialized AI recruiter personas. Practice technical and behavioral rounds, use voice dictation, and get instant evaluation."
            icon={MessageSquare}
            color="glass-panel glow-indigo text-indigo-400 border-indigo-500/20"
            link="/candidate/ai-chat"
          />
          <FeatureCommandCard
            title="💻 AI Coding & Algorithm Sandbox"
            desc="A fully functional JavaScript compiler and execution sandbox. Compile and run algorithms against real test cases and get detailed complexity review."
            icon={Terminal}
            color="glass-panel glow-purple text-purple-400 border-purple-500/20"
            link="/candidate/coding-sandbox"
          />
          <FeatureCommandCard
            title="📚 AI Study & Learning Hub"
            desc="Search and study any computer science topic or coding algorithm directly. Get instant study notes, interactive code snippets, and revision flashcards."
            icon={BookOpen}
            color="glass-panel glow-indigo text-indigo-400 border-indigo-500/20"
            link="/candidate/learning-hub"
          />
          <FeatureCommandCard
            title="📄 ATS Deep Resume Auditor"
            desc="Scan your resume plain-text against ATS guidelines, calculate formatting and keyword metrics, and rewrite weak bullets using the Google XYZ formula."
            icon={FileCode2}
            color="glass-panel glow-purple text-emerald-400 border-emerald-500/20"
            link="/candidate/resume-auditor"
          />
          <FeatureCommandCard
            title="🏗️ System Design Whiteboard Studio"
            desc="Draw distributed systems architectures visually using nodes like Load Balancers, Redis caches, and Kafka brokers. Run AI audits for SPOFs."
            icon={Layers}
            color="glass-panel glow-indigo text-cyan-400 border-cyan-500/20"
            link="/candidate/system-design-studio"
          />
          <FeatureCommandCard
            title="📝 Smart Resume Builder"
            desc="Build clean, ATS-friendly resumes using structured fields. Preview layouts dynamically and export/print high-quality PDFs instantly."
            icon={FileText}
            color="glass-panel glow-purple text-teal-400 border-teal-500/20"
            link="/candidate/resume-builder"
          />
        </div>
      </div>

      {/* Skills Management & Resume Upload Section */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Skills Management */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <Code2 className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">Your Tech Stack & Skills</h3>
          </div>
          <p className="text-xs text-slate-400 mb-3">Add comma-separated skills to power the AI matching algorithm.</p>
          <textarea
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            placeholder="React, Node.js, MongoDB, TypeScript, Python, AWS, Docker, Kubernetes..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 mb-3"
            rows={3}
          />
          <div className="flex items-center justify-between">
            <button
              onClick={saveSkills}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition"
            >
              Save Skills Profile
            </button>
            {saved && (
              <span className="text-xs font-bold text-emerald-450 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Updated!
              </span>
            )}
          </div>
        </div>

        {/* ATS Resume Upload */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <Upload className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">Upload ATS Resume</h3>
          </div>
          {profile?.resumeUrl ? (
            <p className="text-xs text-slate-350 mb-3 bg-slate-950 p-3 rounded-xl border border-slate-850">
              Active Resume:{" "}
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="text-indigo-400 font-bold underline">
                View PDF File
              </a>
            </p>
          ) : (
            <p className="text-xs text-slate-400 mb-3">Upload your PDF resume for instant AI scoring against job postings.</p>
          )}
          <form onSubmit={uploadResume} className="space-y-3">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-500/10 file:text-indigo-300 hover:file:bg-indigo-500/20"
            />
            <button
              disabled={uploading || !resumeFile}
              className="w-full bg-slate-950 hover:bg-slate-850 disabled:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
            >
              {uploading ? "Parsing PDF..." : "Upload & Sync Resume"}
            </button>
          </form>
          {uploadMsg && <p className="text-xs text-slate-400 mt-2 font-semibold">{uploadMsg}</p>}
        </div>

      </div>

    </div>
  );
}

function FeatureCommandCard({ title, desc, icon: Icon, color, link }) {
  return (
    <Link
      to={link}
      className={`p-6 rounded-3xl border ${color} hover:shadow-2xl hover:scale-[1.02] transition-all flex flex-col justify-between group text-slate-200`}
    >
      <div>
        <div className="p-3 rounded-2xl bg-slate-950 w-fit border border-slate-850 mb-4 group-hover:scale-110 transition-transform">
          <Icon className="w-5 h-5" />
        </div>
        <h4 className="font-extrabold text-sm text-white mb-2">{title}</h4>
        <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
      </div>
      <div className="mt-6 pt-3 border-t border-slate-800/80 text-xs font-bold text-indigo-400 flex items-center justify-between group-hover:text-indigo-300 transition-colors">
        <span>Launch AI Workspace</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
      </div>
    </Link>
  );
}

function StatCard({ icon: Icon, label, value, subtitle, color }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-sm flex items-center space-x-4 relative overflow-hidden backdrop-blur-xl">
      <div className={`p-3.5 rounded-2xl ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400">{label}</p>
        <p className="text-2xl font-black text-white mt-0.5">{value}</p>
        <span className="text-[10px] text-slate-500 mt-1 block">{subtitle}</span>
      </div>
    </div>
  );
}
