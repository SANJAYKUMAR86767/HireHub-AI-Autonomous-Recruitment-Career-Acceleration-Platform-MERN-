import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { Briefcase, Eye, Trash2, Edit2, ArrowRight, ToggleLeft, ToggleRight, Sparkles } from "lucide-react";

export default function RecruiterJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/jobs/mine");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      await api.delete(`/jobs/${id}`);
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (job) => {
    const nextStatus = (job.status || "open") === "open" ? "closed" : "open";
    try {
      const res = await api.put(`/jobs/${job._id}`, { status: nextStatus });
      setJobs((prev) => prev.map((j) => (j._id === job._id ? { ...j, status: nextStatus } : j)));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Job Postings</h1>
          <p className="text-xs text-slate-500 mt-1">Audit active roles, view applicants pipeline and change status settings</p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/recruiter/post-job"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm"
          >
            Post New Job
          </Link>
          <Link to="/recruiter/dashboard" className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 px-4 py-2 rounded-xl flex items-center gap-1">
            <span>Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-20 bg-white border border-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
          <Briefcase className="w-12 h-12 text-slate-350 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700 text-sm">No jobs posted yet</h3>
          <p className="text-xs text-slate-400 mt-1">Get started by publishing your first job listing today.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((j) => (
            <div key={j._id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-slate-900 text-base">{j.title}</h3>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    (j.status || "open") === "open"
                      ? "bg-emerald-55 text-emerald-700 border-emerald-200"
                      : "bg-slate-100 text-slate-500 border-slate-200"
                  }`}>
                    {j.status || "open"}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {j.location} · {j.jobType} · {j.salary || `₹${j.salaryMin} - ₹${j.salaryMax}`}
                </p>
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md mt-2 inline-block">
                  {j.applicantCount || 0} Candidates in pipeline
                </span>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => toggleStatus(j)}
                  className={`p-2 rounded-xl border transition flex items-center gap-1 text-xs font-semibold ${
                    (j.status || "open") === "open"
                      ? "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      : "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
                  }`}
                  title={ (j.status || "open") === "open" ? "Close Job Posting" : "Re-open Job Posting" }
                >
                  { (j.status || "open") === "open" ? <ToggleRight className="w-5 h-5 text-emerald-600" /> : <ToggleLeft className="w-5 h-5 text-slate-400" /> }
                  <span>Status</span>
                </button>
                <Link
                  to={`/recruiter/jobs/${j._id}/applicants`}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition"
                  title="View Pipeline"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => deleteJob(j._id)}
                  className="p-2.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl border border-slate-200 hover:border-rose-200 transition"
                  title="Delete Posting"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
