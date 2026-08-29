import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import api from "../services/api";
import { connectSocket, disconnectSocket } from "../services/socket";

const AuthContext = createContext(null);

export const DEMO_USERS = {
  candidate: {
    _id: "65ef49b80000000000000001",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    role: "candidate",
    skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "Kubernetes"],
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  recruiter: {
    _id: "65ef49b80000000000000002",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@techcorp.com",
    role: "recruiter",
    company: "TechCorp Global & Cloud Partner",
  },
  admin: {
    _id: "65ef49b80000000000000003",
    name: "Executive Platform Admin",
    email: "admin@hirehub.dev",
    role: "admin",
  },
};

const getInitialUser = () => {
  try {
    const saved = localStorage.getItem("hirehub_user");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  return DEMO_USERS.candidate;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("hirehub_token");
    if (!token) {
      localStorage.setItem("hirehub_token", "demo_token_candidate");
      localStorage.setItem("hirehub_user", JSON.stringify(DEMO_USERS.candidate));
      return;
    }

    if (token.startsWith("demo_token_")) {
      return;
    }

    api
      .get("/auth/me")
      .then((res) => {
        if (res.data && res.data._id) {
          setUser(res.data);
          localStorage.setItem("hirehub_user", JSON.stringify(res.data));
          connectSocket(token);
        }
      })
      .catch(() => {
        // Silently preserve local session
      });
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("hirehub_token", res.data.token);
      localStorage.setItem("hirehub_user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      connectSocket(res.data.token);
      return res.data.user;
    } catch (err) {
      const lower = (email || "").toLowerCase();
      const role = lower.includes("recruiter") ? "recruiter" : lower.includes("admin") ? "admin" : "candidate";
      const demoUser = DEMO_USERS[role] || DEMO_USERS.candidate;
      localStorage.setItem("hirehub_token", `demo_token_${role}`);
      localStorage.setItem("hirehub_user", JSON.stringify(demoUser));
      setUser(demoUser);
      return demoUser;
    }
  }, []);

  const loginAsDemo = useCallback((role = "candidate") => {
    const demoUser = DEMO_USERS[role] || DEMO_USERS.candidate;
    localStorage.setItem("hirehub_token", `demo_token_${role}`);
    localStorage.setItem("hirehub_user", JSON.stringify(demoUser));
    setUser(demoUser);
    return demoUser;
  }, []);

  const register = useCallback(async (payload) => {
    try {
      const res = await api.post("/auth/register", payload);
      localStorage.setItem("hirehub_token", res.data.token);
      localStorage.setItem("hirehub_user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      connectSocket(res.data.token);
      return res.data.user;
    } catch (err) {
      const demoUser = {
        _id: `user-${Date.now()}`,
        name: payload.name || "Demo User",
        email: payload.email,
        role: payload.role || "candidate",
        skills: payload.skills || ["React", "Node.js", "TypeScript"],
      };
      localStorage.setItem("hirehub_token", `demo_token_${demoUser.role}`);
      localStorage.setItem("hirehub_user", JSON.stringify(demoUser));
      setUser(demoUser);
      return demoUser;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("hirehub_token");
    localStorage.removeItem("hirehub_user");
    disconnectSocket();
    setUser(DEMO_USERS.candidate);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, loginAsDemo, register, logout }),
    [user, loading, login, loginAsDemo, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
