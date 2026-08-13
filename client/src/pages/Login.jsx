import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Sparkles,
  User,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  Lock,
  Mail,
} from "lucide-react";

export default function Login() {
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      const dest =
        user.role === "recruiter"
          ? "/recruiter/dashboard"
          : user.role === "admin"
          ? "/admin/dashboard"
          : "/candidate/dashboard";
      navigate(dest);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    const user = loginAsDemo(role);
    const dest =
      role === "recruiter"
        ? "/recruiter/dashboard"
        : role === "admin"
        ? "/admin/dashboard"
        : "/candidate/dashboard";
    navigate(dest);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-white shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-indigo-600 flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-indigo-500/25">
            <Briefcase className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black">Log in to HireHub AI</h1>
          <p className="text-xs text-slate-400 mt-1">
            Access autonomous AI mock interviews, candidate radar & offer analyzers.
          </p>
        </div>

        {/* 1-Click Instant Demo Portals */}
        <div className="mb-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 block">
            ⚡ 1-Click Instant Demo Login (No Registration Needed)
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("candidate")}
              className="p-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-bold transition flex flex-col items-center justify-center gap-1"
            >
              <User className="w-4 h-4" />
              <span>Candidate</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("recruiter")}
              className="p-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-bold transition flex flex-col items-center justify-center gap-1"
            >
              <Briefcase className="w-4 h-4" />
              <span>Recruiter</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold transition flex flex-col items-center justify-center gap-1"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black py-3 rounded-xl text-xs shadow-lg shadow-indigo-500/25 transition flex items-center justify-center space-x-2"
          >
            <span>{loading ? "Authenticating..." : "Log in to Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-xs text-slate-400 text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-400 font-bold hover:underline">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
