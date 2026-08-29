import React, { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "../components/JobCard";
import { Search, Sparkles, Filter, RefreshCw, Sliders, Briefcase, MapPin } from "lucide-react";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [workModeFilter, setWorkModeFilter] = useState("all");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    if (search.trim()) {
      const query = search.toLowerCase();
      const title = (job.title || "").toLowerCase();
      const company = (job.companyName || job.company || "").toLowerCase();
      const skills = (job.skills || []).map((s) => s.toLowerCase()).join(" ");
      if (!title.includes(query) && !company.includes(query) && !skills.includes(query)) return false;
    }

    if (locationFilter.trim()) {
      const loc = (job.location || "").toLowerCase();
      if (!loc.includes(locationFilter.toLowerCase())) return false;
    }

    if (jobTypeFilter !== "all") {
      const type = (job.jobType || "").toLowerCase();
      if (type !== jobTypeFilter.toLowerCase()) return false;
    }

    if (workModeFilter !== "all") {
      const mode = (job.workMode || "").toLowerCase();
      if (mode !== workModeFilter.toLowerCase()) return false;
    }

    return true;
  });

  const resetFilters = () => {
    setSearch("");
    setLocationFilter("");
    setJobTypeFilter("all");
    setWorkModeFilter("all");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[200px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>HireHub AI Job Board</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Global Developer Jobs Board</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Explore active openings seeded from premium recruiters and pre-vetted AI startups.
          </p>
        </div>

        {/* Filter controls panel */}
        <div className="glass-panel p-6 rounded-3xl shadow-xl flex flex-col gap-4">
          <div className="flex items-center space-x-2 font-extrabold text-xs uppercase tracking-wider text-indigo-400">
            <Sliders className="w-4 h-4" />
            <span>Search & Filters</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job Title, Skills, or Company..."
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Location Input */}
            <div className="relative flex items-center">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3" />
              <input
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="Filter by Location..."
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Job Type Dropdown */}
            <select
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">All Job Types</option>
              <option value="Full-time">Full-Time</option>
              <option value="Part-time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>

            {/* Work Mode Dropdown */}
            <select
              value={workModeFilter}
              onChange={(e) => setWorkModeFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">All Work Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">On-Site</option>
            </select>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
            <span className="text-[11px] text-slate-400 font-bold">
              Showing {filteredJobs.length} matching jobs
            </span>
            <button
              onClick={resetFilters}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-slate-900 border border-slate-850 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 shadow-xl">
            <Briefcase className="w-12 h-12 text-indigo-500 mx-auto mb-3 animate-pulse" />
            <h3 className="font-bold text-white text-sm">No Jobs Matched</h3>
            <p className="text-[11px] text-slate-500 mt-1">Try resetting your filters or adjust the keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
