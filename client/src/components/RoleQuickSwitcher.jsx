import React, { useState } from "react";
import { useAuth, DEMO_USERS } from "../context/AuthContext";
import { UserCheck, Briefcase, Shield, Sparkles, ChevronDown, CheckCircle2 } from "lucide-react";

export default function RoleQuickSwitcher() {
  const { user, loginAsDemo } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    {
      id: "candidate",
      label: "Candidate Mode",
      desc: "Live Video Mock, ATS Auditor, Coding Sandbox",
      icon: UserCheck,
      color: "from-blue-600 to-indigo-600",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
    {
      id: "recruiter",
      label: "Recruiter Studio",
      desc: "Talent Radar, Batch Screener, Post Jobs",
      icon: Briefcase,
      color: "from-purple-600 to-pink-600",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    },
    {
      id: "admin",
      label: "Admin Suite",
      desc: "Platform Metrics, User & Job Moderation",
      icon: Shield,
      color: "from-amber-600 to-orange-600",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    },
  ];

  const currentRole = user?.role || "candidate";

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2.5 bg-slate-900/95 backdrop-blur-2xl border border-indigo-500/40 text-slate-100 px-4 py-2.5 rounded-2xl shadow-2xl shadow-indigo-500/20 hover:border-indigo-400 transition-all group"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
          </span>
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-black tracking-wide uppercase text-slate-200">
            Demo Mode: <span className="text-indigo-400 capitalize">{currentRole}</span>
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute bottom-14 left-0 w-80 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 rounded-3xl p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
              <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    Instant 1-Click Role Switcher
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Switch personas instantly with full zero-friction access
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 mt-2">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isActive = currentRole === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        loginAsDemo(r.id);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-2xl transition-all flex items-center justify-between group ${
                        isActive
                          ? "bg-slate-800/90 border border-indigo-500/40"
                          : "hover:bg-slate-800/50 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${r.color} text-white flex items-center justify-center shadow-md`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-extrabold text-white group-hover:text-indigo-300 transition-colors">
                              {r.label}
                            </span>
                            {isActive && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{r.desc}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
