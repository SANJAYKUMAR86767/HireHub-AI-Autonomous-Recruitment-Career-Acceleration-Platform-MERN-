import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Bookmark, FileText, ArrowRight, Trash2, Briefcase, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/auth/saved-jobs");
      setSavedJobs(res.data);
    } catch (err) {
      console.error("Could not fetch saved jobs", err);
    } finally {
      setLoading(false);
    }
  };

  const removeSavedJob = async (jobId) => {
    try {
      await api.post(`/auth/save-job/${jobId}`);
      setSavedJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Saved & Bookmarked Jobs</h1>
          <p className="text-xs text-slate-500 mt-1">Keep track of interesting opportunities and apply when ready</p>
        </div>
        <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
          {savedJobs.length} Jobs Bookmarked
        </span>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-24 bg-white border border-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : savedJobs.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700 text-sm">No saved jobs yet</h3>
          <p className="text-xs text-slate-400 mt-1">Browse the jobs directory and tap the bookmark icon to save roles here.</p>
          <Link to="/jobs" className="inline-flex items-center space-x-1.5 mt-4 bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl">
            <span>Explore Jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {savedJobs.map((j) => (
            <div key={j._id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-500">{j.company || j.companyName}</span>
                <h3 className="font-bold text-slate-900 text-base mt-0.5">{j.title}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {j.location} · {j.jobType} · {j.salary}
                </p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => removeSavedJob(j._id)}
                  className="p-2.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl border border-slate-200 hover:border-rose-200 transition"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <Link
                  to={`/jobs/${j._id}`}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1 shadow-sm transition"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
