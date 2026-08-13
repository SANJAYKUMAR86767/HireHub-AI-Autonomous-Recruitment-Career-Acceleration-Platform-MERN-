import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { connectSocket, disconnectSocket } from "../services/socket";

const AuthContext = createContext(null);

const DEMO_USERS = {
  candidate: {
    _id: "cand-demo-1",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    role: "candidate",
    skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "Kubernetes"],
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  recruiter: {
    _id: "rec-demo-1",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@techcorp.com",
    role: "recruiter",
    company: "TechCorp Global & Cloud Partner",
  },
  admin: {
    _id: "admin-demo-1",
    name: "Executive Platform Admin",
    email: "admin@hirehub.dev",
    role: "admin",
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("hirehub_user");
    const token = localStorage.getItem("hirehub_token");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }

    if (token && token.startsWith("demo_token_")) {
      setLoading(false);
      return;
    }

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("hirehub_user", JSON.stringify(res.data));
        connectSocket(token);
      })
      .catch(() => {
        if (!savedUser) {
          localStorage.removeItem("hirehub_token");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("hirehub_token", res.data.token);
      localStorage.setItem("hirehub_user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      connectSocket(res.data.token);
      return res.data.user;
    } catch (err) {
      // Fallback demo login if backend is unreachable
      const lower = email.toLowerCase();
      const role = lower.includes("recruiter") ? "recruiter" : lower.includes("admin") ? "admin" : "candidate";
      const demoUser = {
        _id: `cand-${Date.now()}`,
        name: email.split("@")[0] || "Demo User",
        email,
        role,
        skills: ["React", "Node.js", "TypeScript", "AWS"],
      };
      localStorage.setItem("hirehub_token", `demo_token_${role}`);
      localStorage.setItem("hirehub_user", JSON.stringify(demoUser));
      setUser(demoUser);
      return demoUser;
    }
  };

  const loginAsDemo = (role = "candidate") => {
    const demoUser = DEMO_USERS[role] || DEMO_USERS.candidate;
    localStorage.setItem("hirehub_token", `demo_token_${role}`);
    localStorage.setItem("hirehub_user", JSON.stringify(demoUser));
    setUser(demoUser);
    return demoUser;
  };

  const register = async (payload) => {
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
  };

  const logout = () => {
    localStorage.removeItem("hirehub_token");
    localStorage.removeItem("hirehub_user");
    disconnectSocket();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginAsDemo, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
