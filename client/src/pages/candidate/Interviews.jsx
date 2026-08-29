import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Calendar, Video, ArrowRight, Timer, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function CandidateInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/applications/mine")
      .then((res) => {
        const list = res.data.filter((a) => a.status === "interview");
        setInterviews(list);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Upcoming Live Interviews</h1>
          <p className="text-xs text-slate-500 mt-1">Manage scheduled calendar sessions and launch video meeting rooms</p>
        </div>
        <Link to="/candidate/dashboard" className="text-xs font-bold text-slate-650 hover:text-slate-900 bg-slate-100 px-4 py-2 rounded-xl flex items-center gap-1">
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
          <h3 className="font-bold text-slate-700 text-sm">No interviews scheduled</h3>
          <p className="text-xs text-slate-400 mt-1">Recruiters will update application status and schedule interview times here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map((a) => (
            <div key={a._id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-500">{a.jobId?.company || "Company"}</span>
                  <h3 className="font-bold text-slate-905 text-base mt-0.5">{a.jobId?.title || "Job Position"}</h3>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-2 font-medium">
                    <Timer className="w-4 h-4 text-slate-400" />
                    <span>Scheduled Time: {a.interviewDate ? new Date(a.interviewDate).toLocaleString() : "Date set by recruiter"}</span>
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
                    <span>Join Video Call</span>
                  </a>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Instructions:</strong> Please ensure you have a working camera and microphone. The interview will take place inside our secure HireHub Video Jitsi Room.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
