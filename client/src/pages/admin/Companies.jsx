import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { ShieldCheck, Award, ArrowRight, Building, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminCompanies() {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users");
      // Filter only recruiter accounts
      const recs = res.data.filter((u) => u.role === "recruiter");
      setRecruiters(recs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const verify = async (id) => {
    try {
      await api.put(`/admin/recruiters/${id}/verify`);
      // Update local state dynamically
      setRecruiters((prev) =>
        prev.map((r) => (r._id === id ? { ...r, companyVerified: true } : r))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Registered Companies</h1>
          <p className="text-xs text-slate-500 mt-1">Audit and verify recruiters and company credentials</p>
        </div>
        <Link to="/admin/dashboard" className="text-xs font-bold text-indigo-600 hover:text-indigo-850 flex items-center space-x-1">
          <span>Back to Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-20 bg-white border border-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : recruiters.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
          <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700 text-sm">No registered recruiters found</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {recruiters.map((r) => (
            <div key={r._id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-150">
                  {(r.companyName || r.name).charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{r.companyName || "No Company Specified"}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Recruiter: {r.name} · {r.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                {r.companyVerified ? (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-250 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Corporate Partner</span>
                  </span>
                ) : (
                  <button
                    onClick={() => verify(r._id)}
                    className="bg-indigo-650 hover:bg-indigo-750 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm"
                  >
                    Grant Verification Badge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
