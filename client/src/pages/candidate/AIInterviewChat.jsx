import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Sparkles,
  Bot,
  RefreshCw,
  Award,
  Volume2,
  Mic,
} from "lucide-react";

const INTERVIEW_PERSONAS = [
  {
    id: "tech_lead",
    name: "AI Systems Architect",
    role: "Technical Evaluation Engine",
    avatar: "🤖",
    description: "Evaluates System Design, scalability limits, database architectures, and core CS fundamentals.",
    initialMessage: "Welcome to the Technical Evaluation Sandbox. I am your AI Systems Architect. To start, please introduce yourself and outline the core technical stack you are most proficient with.",
    prompts: {
      introduce: "Great. Since you mentioned those technologies, can you explain how you handle state management in a large-scale React application, or how you optimize database queries in MongoDB?",
      project: "Excellent explanation. In your HireHub project, how did you handle real-time video telemetry without causing network lag or CPU bottlenecks?",
      default: "Interesting response. Let's pivot to systems design. If you had to build a real-time notification system like Uber's driver matching with 100k requests/sec, how would you design the cache and message queuing layers?",
      oops: "Good points. Can you explain the difference between method overloading and overriding in OOPs, and give a brief example of Polymorphism?",
      dbms: "Perfect. What are database transactions, and why are ACID properties critical for transactional systems?"
    }
  },
  {
    id: "hr_lead",
    name: "AI Behavioral Evaluator",
    role: "STAR Story & Leadership Coach",
    avatar: "🛡️",
    description: "Audits cultural fit, situational adaptability, conflict resolution, and leadership principles.",
    initialMessage: "Hello. I am the AI Behavioral Evaluator. Our focus is on leadership dynamics, situational decisions, and organizational alignment. Please introduce yourself and share your core career motivations.",
    prompts: {
      introduce: "Very nice. Can you tell me about a time when you faced a major technical challenge or conflict in a team, and how you resolved it?",
      project: "Tell me about the most impactful feature you built in your HireHub project. What was the core problem it solved, and how did you measure its success?",
      default: "How do you handle feedback when your code review receives critical comments from a senior engineer?",
      oops: "How do you balance fast feature delivery versus writing clean, maintainable code?",
      dbms: "Why are you interested in joining our company, and what unique value do you bring to the engineering team?"
    }
  },
  {
    id: "startup_cto",
    name: "AI Full-Stack Engineer",
    role: "Rapid Product Prototyping Lead",
    avatar: "⚡",
    description: "Evaluates API design patterns, full-stack shipping velocity, deployment systems, and MVP scalability.",
    initialMessage: "Hello! I am your AI Full-Stack Evaluation Agent. We focus on engineering agility, REST/GraphQL design, and database normalization. Please introduce yourself and describe the fastest you have ever built and deployed an app.",
    prompts: {
      introduce: "Nice. If I ask you to integrate a new payment gateway like Stripe into a Node.js/Express backend by tomorrow morning, what steps will you take?",
      project: "Your HireHub project looks very features-rich. How did you structure the MERN stack architecture to keep the client and server decoupled yet highly sync'ed via WebSockets?",
      default: "We experience sudden traffic spikes when our AI features trend. How would you quickly autoscale our Node.js services hosted on Docker/AWS?",
      oops: "What is your preference: SQL (like PostgreSQL) or NoSQL (like MongoDB), and why?",
      dbms: "How do you keep yourself updated with modern frameworks and AI engineering tools?"
    }
  }
];

export default function AIInterviewChat() {
  const [selectedPersona, setSelectedPersona] = useState(INTERVIEW_PERSONAS[0]);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [qCount, setQCount] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        sender: "hr",
        text: selectedPersona.initialMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
    ]);
    setQCount(0);
  }, [selectedPersona]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please type your answer.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };

    recognition.start();
  };

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg = {
      sender: "candidate",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText("");
    setIsTyping(true);

    try {
      const historyPrompt = `You are a professional tech recruiter acting as "${selectedPersona.name}" (${selectedPersona.role}).
We are having a mock job interview.
History:
${newMessages.slice(-5).map((m) => `${m.sender === "candidate" ? "Candidate" : "Interviewer"}: ${m.text}`).join("\n")}
Candidate says: "${userMsg.text}"

Response requirements:
1. Act as the interviewer. Do NOT break character.
2. Reply specifically to what the candidate said (1-2 sentences).
3. Ask ONE follow-up question related to their answer or tech stack (e.g. React state, MongoDB indexing, system scalability, or team conflicts).
4. Keep the total response under 60 words.`;

      const res = await api.post("/advanced/copilot", { prompt: historyPrompt });
      const aiResponseText = res.data.reply;

      setMessages((prev) => [
        ...prev,
        {
          sender: "hr",
          text: aiResponseText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "hr",
          text: "I see. That makes sense. Can you explain your decision-making process for choosing that tech stack?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRestart = () => {
    setMessages([
      {
        sender: "hr",
        text: selectedPersona.initialMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
    ]);
    setQCount(0);
    setInputText("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>HireHub AI Recruiter Simulation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Bot className="w-8 h-8 text-indigo-400" />
              HireHub AI Interview Arena
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Have real-time, interactive chat conversations with specialized HireHub AI recruiter personas. Practice your pitch, technical answers, and STAR responses.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-panel glow-indigo rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[520px]">
              <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-2xl flex items-center justify-center">
                    {selectedPersona.avatar}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white">{selectedPersona.name}</h3>
                    <p className="text-[11px] text-slate-400">{selectedPersona.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => speakText(messages[messages.length - 1]?.text)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
                    title="Speak Last Response"
                  >
                    <Volume2 className="w-4 h-4 text-indigo-400" />
                  </button>
                  <button
                    onClick={handleRestart}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
                    title="Restart Conversation"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

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
                      <Sparkles className="w-4 h-4 animate-spin text-indigo-400" />
                      <span>{selectedPersona.name} is reading and typing a follow-up...</span>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center space-x-2">
                <button
                  onClick={toggleVoiceInput}
                  className={`p-3 rounded-2xl border transition ${
                    isListening
                      ? "bg-rose-600 border-rose-500 text-white animate-pulse"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                  title={isListening ? "Listening..." : "Enable Voice Input"}
                >
                  <Mic className="w-4 h-4" />
                </button>
                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your interview response..."
                  className="flex-1 bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white px-5 py-3 rounded-2xl font-bold text-xs flex items-center space-x-1.5 transition shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel glow-purple p-5 rounded-3xl shadow-xl">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block mb-4">
                Select Interviewer:
              </span>
              <div className="space-y-3">
                {INTERVIEW_PERSONAS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPersona(p)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start space-x-3.5 ${
                      selectedPersona.id === p.id
                        ? "bg-indigo-600/10 border-indigo-500 shadow-lg text-white"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-3xl">{p.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-black text-white">{p.name}</h4>
                      <p className="text-[10px] text-indigo-400 font-bold mb-1">{p.role}</p>
                      <p className="text-[10px] text-slate-500 leading-snug line-clamp-2">{p.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-panel glow-indigo p-5 rounded-3xl">
              <h4 className="font-extrabold text-xs text-white mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                STAR storytelling strategy
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                Interviews are audited based on the **STAR** structure. When answering Marcus Kael's behavioral questions, structure your answer as:
              </p>
              <div className="space-y-2 text-[10px] font-semibold text-slate-400">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span>**Situation:** Set the context of your task.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span>**Task:** What was your goal?</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span>**Action:** What engineering actions did you perform?</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span>**Result:** The positive metric result.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
