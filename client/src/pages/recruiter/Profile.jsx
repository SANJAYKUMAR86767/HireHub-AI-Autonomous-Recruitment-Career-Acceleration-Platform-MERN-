import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Building, User, Mail, Save, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecruiterProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    companyName: "",
    companyVerified: false
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get("/auth/me")
      .then((res) => {
        setProfile({
          name: res.data.name || "",
          email: res.data.email || "",
          companyName: res.data.companyName || "",
          companyVerified: res.data.companyVerified || false
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaved(false);
    try {
      const res = await api.put("/auth/me", {
        name: profile.name,
        companyName: profile.companyName
      });
      setProfile((prev) => ({
        ...prev,
        name: res.data.name,
        companyName: res.data.companyName
      }));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 animate-pulse space-y-4">
        <div className="h-10 bg-slate-900 rounded-xl" />
        <div className="h-48 bg-slate-900 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white">Company Profile</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage recruitment account details and corporate settings</p>
        </div>
        <Link
          to="/recruiter/dashboard"
          className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
        >
          <span>Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Recruiter Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              required
              className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Work Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              disabled
              className="w-full bg-slate-950 border border-slate-855 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-500 cursor-not-allowed focus:outline-none"
              value={profile.email}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Company / Entity Name</label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              required
              placeholder="e.g. Acme Tech Solutions"
              className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              value={profile.companyName}
              onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
            />
          </div>
        </div>

        {/* Verification status badge */}
        <div className="pt-2">
          {profile.companyVerified ? (
            <div className="flex items-center space-x-2 text-emerald-450 bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-2xl text-xs font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Verified Corporate Recruiter Account</span>
            </div>
          ) : (
            <div className="text-amber-450 bg-amber-500/10 border border-amber-500/25 p-3 rounded-2xl text-xs font-semibold leading-relaxed">
              <strong>Pending Admin Verification:</strong> Job postings are active but do not yet carry the gold Corporate Verified badge.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-md transition"
          >
            Save Settings
          </button>
          {saved && (
            <span className="text-xs font-bold text-emerald-450 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Updated!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
