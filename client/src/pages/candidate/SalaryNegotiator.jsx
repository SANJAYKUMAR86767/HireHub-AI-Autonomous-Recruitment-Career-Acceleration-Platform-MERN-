import React, { useState } from "react";
import {
  DollarSign,
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  Copy,
  Check,
  Award,
  Zap,
  Building2,
  PieChart,
  ArrowRight,
  MessageSquare,
  RefreshCw,
  Sliders,
  Scale,
} from "lucide-react";

const HR_PERSONAS = [
  {
    id: "faang",
    name: "Rachel Vance",
    role: "Staff Talent Partner @ FAANG",
    company: "Big Tech Global",
    avatar: "🏢",
    style: "Data-driven, benchmark-focused, flexible on RSU equity & sign-on bonuses.",
    initialMessage:
      "Hello! We are thrilled to extend this offer for the Senior Engineer role. Our package is ₹38 LPA Base + ₹12L Equity over 4 years. Let me know your thoughts on this initial compensation breakdown!",
  },
  {
    id: "startup",
    name: "Alex Thorne",
    role: "Founder & VP Eng @ Series-B Startup",
    company: "HyperScale AI",
    avatar: "🚀",
    style: "Fast-moving, equity-heavy, limited immediate base cash budget.",
    initialMessage:
      "Hey! The engineering team was deeply impressed with your system design round. We can offer ₹28 LPA Base + 0.35% High-Growth ESOPs. We want you leading this critical product pod.",
  },
  {
    id: "conservative",
    name: "Mr. Kapoor",
    role: "Head of HR @ Global Enterprise",
    company: "Legacy FinTech",
    avatar: "💼",
    style: "Strict band policies, high base stability, performance-linked bonus focus.",
    initialMessage:
      "Greetings. We have finalized an offer within our standard L4 compensation band: ₹24 LPA Fixed + 15% Variable Annual Bonus. Please review and confirm your acceptance timeline.",
  },
];

const TACTICAL_SCRIPTS = [
  {
    title: "Competing Offer Leverage",
    desc: "Use an existing higher offer respectfully to drive a 15-30% bump.",
    text: "Thank you for the exciting offer! I'm genuinely passionate about your mission and team. However, I am currently evaluating another strong offer offering ₹X LPA with immediate equity vesting. Since your team remains my top choice, if we can close the base gap to ₹Y LPA, I would be thrilled to sign immediately.",
  },
  {
    title: "Accelerated Equity & Sign-On Bonus",
    desc: "Anchor on a one-time sign-on bonus when the company has rigid base salary bands.",
    text: "I completely understand the internal band constraints on base compensation. Given my track record of scaling high-throughput distributed architectures, would you be open to bridging the differential with a ₹Z Lakh first-year signing bonus or an accelerated 30% first-year equity vesting cliff?",
  },
  {
    title: "Performance Review Review-Window Lock",
    desc: "Agree to current base with a legally committed early 6-month performance & comp review.",
    text: "I am excited to move forward with the team. To align our mutual expectations, can we formally document a 6-month accelerated compensation review tied to specific OKR deliverables (e.g. shipping the v2 AI ingestion pipeline)?",
  },
];

export default function SalaryNegotiator() {
  const [selectedPersona, setSelectedPersona] = useState(HR_PERSONAS[0]);
  const [messages, setMessages] = useState([
    {
      sender: "hr",
      text: HR_PERSONAS[0].initialMessage,
      time: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Compensation Breakdown Calculator State
  const [baseSalary, setBaseSalary] = useState(3600000);
  const [bonus, setBonus] = useState(600000);
  const [equity4Yr, setEquity4Yr] = useState(2400000);
  const [targetIncrease, setTargetIncrease] = useState(20);

  const annualizedEquity = equity4Yr / 4;
  const currentTotalCTC = baseSalary + bonus + annualizedEquity;
  const projectedCTC = currentTotalCTC * (1 + targetIncrease / 100);
  const extraGainPerYear = projectedCTC - currentTotalCTC;

  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: "candidate",
      text: textToSend,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = "";
      const lower = textToSend.toLowerCase();

      if (lower.includes("competing") || lower.includes("another offer") || lower.includes("market")) {
        aiResponseText = `I appreciate your transparency regarding the other opportunity. We definitely value your technical depth and don't want to lose you over numbers. I spoke with leadership—we can adjust the base to ₹${(
          (baseSalary * 1.12) /
          100000
        ).toFixed(1)} LPA and add a ₹${((bonus * 1.5) / 100000).toFixed(
          1
        )}L joining bonus. Would that allow you to make a decision today?`;
      } else if (lower.includes("equity") || lower.includes("esop") || lower.includes("sign-on") || lower.includes("bonus")) {
        aiResponseText = `That's a very reasonable proposal. While our base band is calibrated across the engineering ladder, we have flexibility on equity and one-time incentives. We can increase your 4-year grant by 25% and offer an expedited performance appraisal at Month 6.`;
      } else {
        aiResponseText = `Thank you for sharing your perspective. Our goal is to ensure you feel well-compensated and excited for the long haul. Let me take this proposal to the compensation committee this afternoon and revert with an enhanced revision.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "hr",
          text: aiResponseText,
          time: "Just now",
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleCopyScript = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleSwitchPersona = (persona) => {
    setSelectedPersona(persona);
    setMessages([
      {
        sender: "hr",
        text: persona.initialMessage,
        time: "Just now",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-8 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Interactive AI Negotiation Sandbox</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-emerald-400" />
              AI Salary & Offer Negotiation Studio
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Simulate high-stakes recruiter counter-offers, leverage strategic scripts, and compute multi-year total comp gains.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl text-right">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Estimated Average Lift
              </span>
              <span className="text-lg font-black text-emerald-400">+18% to +32% CTC</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Chat Simulator, Right Comp Calculator & Scripts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: HR Simulator Chat (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Persona Switcher */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-3xl backdrop-blur-xl">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-3">
                Select Recruiter HR Persona:
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {HR_PERSONAS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSwitchPersona(p)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      selectedPersona.id === p.id
                        ? "bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10 text-white"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xl">{p.avatar}</span>
                      {selectedPersona.id === p.id && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white truncate">{p.name}</h4>
                      <p className="text-[10px] text-slate-400 truncate">{p.company}</p>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-indigo-300/80 mt-3 italic bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-500/20">
                💡 <span className="font-semibold">Persona Style:</span> {selectedPersona.style}
              </p>
            </div>

            {/* Chat Box */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col h-[480px]">
              {/* Chat Header */}
              <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-xl flex items-center justify-center">
                    {selectedPersona.avatar}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white">{selectedPersona.name}</h3>
                    <p className="text-[11px] text-slate-400">{selectedPersona.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSwitchPersona(selectedPersona)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
                  title="Restart Simulation"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      m.sender === "candidate" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-3xl px-5 py-3.5 text-xs sm:text-sm leading-relaxed shadow-lg ${
                        m.sender === "candidate"
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none"
                          : "bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-bl-none"
                      }`}
                    >
                      <p className="font-medium whitespace-pre-wrap">{m.text}</p>
                      <span className="text-[10px] opacity-60 mt-1 block text-right">
                        {m.time}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl rounded-bl-none px-4 py-3 text-xs text-indigo-400 flex items-center space-x-2">
                      <Bot className="w-4 h-4 animate-bounce" />
                      <span>{selectedPersona.name} is formulating a counter-response...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center space-x-3">
                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your strategic counter-proposal..."
                  className="flex-1 bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white px-5 py-3 rounded-2xl font-bold text-xs flex items-center space-x-1.5 transition shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Tactical Scripts & Total Comp Visualizer (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Interactive Comp Calculator */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-emerald-400" />
                  Offer Lift Leverage Calculator
                </h3>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  +{targetIncrease}% Anchor
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Base Annual Salary (INR)</span>
                    <span className="text-white font-bold">
                      ₹{(baseSalary / 100000).toFixed(1)} LPA
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000000"
                    max="9000000"
                    step="100000"
                    value={baseSalary}
                    onChange={(e) => setBaseSalary(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>4-Year Equity Grant (ESOP / RSUs)</span>
                    <span className="text-white font-bold">
                      ₹{(equity4Yr / 100000).toFixed(1)} Lakhs
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="200000"
                    value={equity4Yr}
                    onChange={(e) => setEquity4Yr(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Target Negotiation Lift (%)</span>
                    <span className="text-emerald-400 font-bold">+{targetIncrease}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="45"
                    step="1"
                    value={targetIncrease}
                    onChange={(e) => setTargetIncrease(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              {/* Calculation Summary Card */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 grid grid-cols-2 gap-3 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">
                    Current 1st-Yr Total CTC
                  </span>
                  <span className="text-base font-black text-white">
                    ₹{(currentTotalCTC / 100000).toFixed(1)} LPA
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase block font-bold">
                    Projected Target CTC
                  </span>
                  <span className="text-base font-black text-emerald-400">
                    ₹{(projectedCTC / 100000).toFixed(1)} LPA
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 text-center">
                💰 Potential extra earning:{" "}
                <span className="text-white font-bold">
                  ₹{(extraGainPerYear / 100000).toFixed(2)} Lakhs / year
                </span>
              </p>
            </div>

            {/* Tactical Negotiation Scripts */}
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                1-Click Proven Counter-Offer Scripts:
              </span>

              {TACTICAL_SCRIPTS.map((script, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl hover:border-indigo-500/40 transition-all shadow-md group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-bold text-xs text-white group-hover:text-indigo-400 transition-colors">
                      {script.title}
                    </h4>
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => handleSend(script.text)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg transition"
                      >
                        Try in Chat
                      </button>
                      <button
                        onClick={() => handleCopyScript(script.text, idx)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                        title="Copy Script"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2">{script.desc}</p>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-slate-300 font-mono line-clamp-2">
                    {script.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
