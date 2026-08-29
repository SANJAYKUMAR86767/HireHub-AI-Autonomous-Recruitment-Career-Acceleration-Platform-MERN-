import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Calendar, Video, ArrowRight, Timer, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecruiterInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/applications/recruiter/interviews")
      .then((res) => setInterviews(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Scheduled Interviews Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">Track upcoming candidate evaluations, meeting dates, and notes</p>
        </div>
        <Link to="/recruiter/dashboard" className="text-xs font-bold text-slate-650 hover:text-slate-900 bg-slate-100 px-4 py-2 rounded-xl flex items-center gap-1">
          <span>Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((n) => (
            <div key={n} className="h-24 bg-white border border-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : interviews.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
          <Calendar className="w-12 h-12 text-slate-350 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700 text-sm">No interviews scheduled yet</h3>
          <p className="text-xs text-slate-400 mt-1">To schedule an interview, open an applicant pipeline from your dashboard and click "Schedule Live Interview".</p>
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map((a) => (
            <div key={a._id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-indigo-650 bg-indigo-50 px-2 py-0.5 rounded-md">
                    Role: {a.jobId?.title || "MERN Developer"}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mt-2 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Candidate: {a.candidateId?.name}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{a.candidateId?.email}</p>
                  
                  <div className="flex items-center space-x-1.5 text-xs text-slate-650 mt-3 font-semibold text-slate-700">
                    <Timer className="w-4 h-4 text-indigo-550" />
                    <span>Time Slot: {a.interviewDate ? new Date(a.interviewDate).toLocaleString() : "Date set by recruiter"}</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <a
                    href="https://meet.jit.si/HireHubInterview"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 shadow-sm transition"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Launch meeting room</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
