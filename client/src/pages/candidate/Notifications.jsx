import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Bell, Check, ArrowRight, Trash2, ShieldCheck, Calendar, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

export default function Notifications() {
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/advanced/notifications");
      setNotifs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/advanced/notifications/${id}/read`);
      setNotifs((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const markAllRead = async () => {
    try {
      const unread = notifs.filter((n) => !n.read);
      await Promise.all(unread.map((n) => api.put(`/advanced/notifications/${n._id}/read`)));
      setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const getNotifIcon = (type) => {
    switch (type) {
      case "interview":
        return <Calendar className="w-5 h-5 text-amber-500" />;
      case "apply":
      case "status_change":
        return <Briefcase className="w-5 h-5 text-indigo-500" />;
      default:
        return <Bell className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notification Center</h1>
          <p className="text-xs text-slate-500 mt-1">Stay updated with latest applications status updates & interviews</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={markAllRead}
            disabled={notifs.filter((n) => !n.read).length === 0}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 disabled:text-slate-400 bg-indigo-50 hover:bg-indigo-100 disabled:bg-slate-100 px-4 py-2 rounded-xl transition"
          >
            Mark all read
          </button>
          <Link to="/candidate/dashboard" className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 px-4 py-2 rounded-xl flex items-center gap-1">
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
      ) : notifs.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 shadow-sm">
          <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700 text-sm">All caught up!</h3>
          <p className="text-xs text-slate-400 mt-1">You have no new notifications.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifs.map((n) => (
            <div
              key={n._id}
              className={`border border-slate-200 rounded-2xl p-4 transition flex justify-between items-start gap-4 ${
                n.read ? "bg-slate-50/50 opacity-75" : "bg-white shadow-sm border-indigo-150"
              }`}
            >
              <div className="flex items-start space-x-3.5 min-w-0">
                <div className={`p-2.5 rounded-xl shrink-0 ${n.read ? "bg-slate-100" : "bg-indigo-50"}`}>
                  {getNotifIcon(n.type)}
                </div>
                <div className="min-w-0">
                  <h4 className={`font-bold text-sm text-slate-900 leading-snug flex items-center gap-2`}>
                    {n.title}
                    {!n.read && <span className="w-2 h-2 rounded-full bg-indigo-650 shrink-0" />}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">{n.desc}</p>
                  {n.link && (
                    <Link
                      to={n.link}
                      className="text-[11px] font-bold text-indigo-650 hover:underline mt-2 inline-flex items-center gap-1"
                    >
                      <span>View details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>

              {!n.read && (
                <button
                  onClick={() => markAsRead(n._id)}
                  className="p-2 hover:bg-indigo-100 text-slate-400 hover:text-indigo-600 rounded-xl transition shrink-0"
                  title="Mark as read"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
