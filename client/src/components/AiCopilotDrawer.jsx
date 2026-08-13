import React, { useState, useRef, useEffect } from "react";
import api from "../services/api";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Copy,
  Check,
  ChevronRight,
  Zap,
  HelpCircle,
  TrendingUp,
  FileText,
  DollarSign,
  Minimize2,
  Maximize2,
} from "lucide-react";

export default function AiCopilotDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Hi! I am **HireHub Copilot**, your real-time AI Career Coach & Recruiting Specialist. How can I accelerate your career or hiring workflow today?",
      chips: ["STAR Behavioral Guide", "Salary Negotiation Script", "Resume ATS Keywords", "System Design Checklist"],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const sendMessage = async (customPrompt) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;

    const userMessage = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInput("");
    setLoading(true);

    try {
      const res = await api.post("/advanced/copilot", { prompt: textToSend });
      const assistantMessage = {
        role: "assistant",
        text: res.data.reply,
        chips: res.data.actionChips || ["Practice Mock Interview", "Check Salary Predictor"],
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const lower = textToSend.toLowerCase();
      let reply = "Here are tailored recommendations from your AI Career Copilot:\n\n1. **Quantify Results**: Format your bullet points using the Google XYZ formula: *'Accomplished [X] as measured by [Y] by doing [Z]'*.\n2. **System Reliability**: Emphasize latency improvements, p99 reductions, and automated testing.\n3. **Live Mock Practice**: Use our **Live Mock Video Studio** to practice answering under real-time audio analysis.";
      let chips = ["STAR Behavioral Guide", "Salary Negotiation Script", "System Design Checklist"];

      if (lower.includes("star") || lower.includes("behavior")) {
        reply = "### ⭐ STAR Behavioral Framework for Senior Engineers:\n- **Situation**: Contextualize the business problem (e.g. 'Our checkout API experienced 15% latency degradation under peak Cyber Monday traffic').\n- **Task**: The explicit technical objective you owned (e.g. 'I was tasked with diagnosing the bottleneck and restoring sub-100ms response times').\n- **Action**: The specific architectural solutions you led (e.g. 'I profiled the PostgreSQL queries, introduced Redis cache-aside, and decoupled notification webhooks with Kafka').\n- **Result**: Quantifiable business outcome (e.g. 'P99 latency dropped by 65%, handling 25,000 QPS with 0 dropped orders').";
        chips = ["Salary Negotiation Script", "System Design Checklist"];
      } else if (lower.includes("salary") || lower.includes("negotiat") || lower.includes("offer")) {
        reply = "### 💼 Senior Executive Counter-Offer Script:\n*'Thank you for extending this offer. I am genuinely excited about the architectural challenges at your company. Based on current market percentiles and the level of technical ownership for this role, I am targeting a base of ₹X LPA (or $Y) with an updated equity grant of Z. If we can reach this alignment, I am ready to sign immediately.'*";
        chips = ["Check Offer Analyzer", "STAR Behavioral Guide"];
      } else if (lower.includes("system") || lower.includes("design") || lower.includes("architect")) {
        reply = "### 🏗️ Distributed System Design Checklist:\n1. **Edge**: Cloudflare CDN for static asset caching & DDoS absorption.\n2. **Routing**: Envoy / Nginx Load Balancer with SSL termination & health checks.\n3. **Caching**: Redis Cache-Aside with TTL expirations for 80% read reduction.\n4. **Decoupling**: Apache Kafka event streaming for asynchronous burst processing.\n5. **Persistence**: Sharded PostgreSQL/MongoDB with Read Replicas & PgBouncer pooling.";
        chips = ["Launch System Design Studio", "Check Tech Trends"];
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: reply,
          chips,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      {/* Floating Trigger Button in Bottom-Right */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-3.5 rounded-full shadow-2xl shadow-indigo-500/40 flex items-center space-x-2.5 transition-all transform hover:scale-105 group border border-indigo-400/30"
          title="Open AI Career Copilot"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
          </div>
          <span className="font-extrabold text-xs tracking-wide">HireHub AI Copilot</span>
          <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase">
            Live
          </span>
        </button>
      )}

      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-slate-950 text-slate-100 shadow-2xl border-l border-slate-800 flex flex-col backdrop-blur-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-extrabold text-sm text-white">HireHub AI Copilot</h3>
                  <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                    GPT-4 / Claude Powered
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Real-time career strategist, recruiter insights & code coach</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
              title="Close Copilot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Chips Bar */}
          <div className="px-4 py-2.5 bg-slate-900/50 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-slate-400 text-[11px] font-bold shrink-0">Quick Prompts:</span>
            {[
              "STAR Method Framework",
              "Salary Counter-Offer Script",
              "ATS Resume Bullet Fixer",
              "System Design Checklist",
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => sendMessage(chip)}
                disabled={loading}
                className="shrink-0 bg-slate-800 hover:bg-indigo-600/30 hover:border-indigo-500/50 text-slate-300 hover:text-white border border-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  m.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[92%] rounded-2xl p-4 text-xs leading-relaxed ${
                    m.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-none shadow-md"
                      : "bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none shadow-lg"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-white/10 text-[10px] font-bold uppercase tracking-wider opacity-80">
                    <span className="flex items-center gap-1">
                      {m.role === "user" ? (
                        <>
                          <User className="w-3 h-3" /> You
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-amber-400" /> HireHub AI Assistant
                        </>
                      )}
                    </span>
                    {m.role === "assistant" && (
                      <button
                        onClick={() => copyToClipboard(m.text, idx)}
                        className="hover:text-white flex items-center gap-1 transition"
                        title="Copy to clipboard"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="whitespace-pre-wrap font-sans text-xs space-y-2">
                    {m.text}
                  </div>

                  {/* Dynamic Action Chips */}
                  {m.chips && m.chips.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-800 flex flex-wrap gap-1.5">
                      {m.chips.map((chip, cIdx) => (
                        <button
                          key={cIdx}
                          onClick={() => sendMessage(chip)}
                          disabled={loading}
                          className="text-[10px] bg-slate-800 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-500/30 px-2 py-1 rounded-md transition font-medium"
                        >
                          {chip} →
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 text-slate-400 text-xs px-4 py-3 rounded-2xl w-fit animate-pulse">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                <span>HireHub AI Copilot is synthesizing advice...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything (e.g. 'Draft answer for conflict with manager', 'Next.js 15 interview prep')..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white p-2.5 rounded-xl transition shadow-md shadow-indigo-600/30"
              title="Send Prompt"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
