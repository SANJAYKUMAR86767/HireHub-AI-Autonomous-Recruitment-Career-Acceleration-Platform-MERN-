import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role = "candidate" }) {
  const { user, loading, loginAsDemo } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      loginAsDemo(role || "candidate");
    }
  }, [user, loading, role, loginAsDemo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-indigo-400 font-bold text-sm">
        Initializing Workspace...
      </div>
    );
  }

  return children;
}
