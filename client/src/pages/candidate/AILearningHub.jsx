import React, { useState } from "react";
import api from "../../services/api";
import {
  Sparkles,
  Search,
  BookOpen,
  Code,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Cpu,
  Bookmark,
  ExternalLink,
  ChevronDown,
  HelpCircle,
  Terminal,
} from "lucide-react";
import { Link } from "react-router-dom";

const SYLLABUS_DECKS = [
  {
    title: "JavaScript Closures & Async",
    topic: "javascript",
    category: "Languages",
    summary: "Scope chain, execution context, event loop, macrotasks vs microtasks.",
    prompt: "Explain JavaScript closures, the event loop, and how promises execute asynchronously with clear code examples.",
  },
  {
    title: "React Virtual DOM & Hooks",
    topic: "react",
    category: "Frontend",
    summary: "Reconciliation, diffing algorithm, state batches, useMemo & useCallback.",
    prompt: "Explain how React's Virtual DOM works, what reconciliation is, and how to optimize components using useMemo and useCallback.",
  },
  {
    title: "DBMS ACID & Indexing",
    topic: "dbms",
    category: "Databases",
    summary: "Transactions, Atomicity, Isolation levels, B-Trees index optimization.",
    prompt: "Explain database transactions, ACID properties, and how B-Tree indexes speed up SQL query execution.",
  },
  {
    title: "System Design Caching & Sharding",
    topic: "system design",
    category: "System Design",
    summary: "Cache-aside pattern, horizontal scaling, sharding keys, load balancers.",
    prompt: "Explain distributed system design: how caching (Redis) and database sharding work, and how consistent hashing is used.",
  },
  {
    title: "DSA Search & Two-Pointers",
    topic: "dsa",
    category: "Data Structures",
    summary: "Binary search log N bounds, two-pointer logic, and sliding window.",
    prompt: "Explain binary search, time complexities of sorting algorithms, and how the two-pointer approach solves array search challenges.",
  }
];

export default function AILearningHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});

  const generateLesson = async (promptText) => {
    const finalPrompt = promptText || searchQuery;
    if (!finalPrompt.trim()) return;

    setLoading(true);
    setLessonContent("");
    setQuizAnswers({});
    try {
      const res = await api.post("/advanced/copilot", { prompt: finalPrompt });
      setLessonContent(res.data.reply);
    } catch (err) {
      console.error(err);
      setLessonContent("Failed to generate AI Lesson. Please make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDeck = (deck) => {
    setSelectedDeck(deck);
    generateLesson(deck.prompt);
  };

  const toggleQuizAnswer = (idx) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-purple-950 to-slate-900 rounded-3xl p-6 shadow-2xl border border-indigo-500/20 text-white">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1.5 animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Interactive AI Education & Concept Hub</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">HireHub AI Study & Learning Sandbox</h1>
          <p className="text-xs text-indigo-200 mt-1 max-w-2xl">
            Directly search and study any computer science topic or coding algorithm. Powered by Google Gemini / Claude models, get instant lessons with theory, code snippets, and interview tips.
          </p>
        </div>

        {/* Top Interactive Concept Selector */}
        <div className="space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
            Click to Study Core Placement Subjects:
          </span>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
            {SYLLABUS_DECKS.map((deck, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectDeck(deck)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedDeck?.title === deck.title
                    ? "bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10 text-white"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div>
                  <span className="text-[9px] font-black uppercase bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full block w-fit mb-2">
                    {deck.category}
                  </span>
                  <h4 className="text-xs font-bold text-white leading-tight mb-1">{deck.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-snug line-clamp-2">{deck.summary}</p>
                </div>
                <div className="mt-4 text-[9px] font-bold text-indigo-400 flex items-center space-x-1">
                  <span>Start Studying</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic AI Lesson Generator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Lesson Body (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Search Bar */}
            <div className="glass-panel glow-indigo p-4 rounded-3xl shadow-xl flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What topic do you want to learn? (e.g. What is event loop?, Explain SQL Joins, B-Trees)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                  disabled={loading}
                />
              </div>
              <button
                onClick={() => generateLesson()}
                disabled={loading || !searchQuery.trim()}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white text-xs font-black px-6 py-3 rounded-2xl shadow-lg transition flex items-center gap-1.5 shrink-0"
              >
                <Cpu className="w-4 h-4" />
                <span>{loading ? "Generating Study Deck..." : "Generate AI Lesson"}</span>
              </button>
            </div>

            {/* Generated Lesson Content */}
            {(lessonContent || loading) && (
              <div className="glass-panel glow-purple rounded-3xl p-6 shadow-2xl space-y-6 min-h-[400px]">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <Sparkles className="w-12 h-12 text-indigo-400 animate-spin" />
                    <p className="text-xs text-slate-400 font-bold">HireHub AI Educator is indexing topic data and drafting study notes...</p>
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                    {lessonContent}
                  </div>
                )}
              </div>
            )}

            {!lessonContent && !loading && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-indigo-500 animate-pulse" />
                <h3 className="font-bold text-white text-sm">Select a syllabus deck or search any topic to generate custom AI study notes</h3>
                <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">Lessons are generated with clear theory explanations, code samples, and interview preparation checklists.</p>
              </div>
            )}
          </div>

          {/* Right Sidebar: Placement Preparation Guide (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Quiz / Flashcards */}
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                <HelpCircle className="w-4.5 h-4.5 text-indigo-400" />
                Quick Revision Flashcards
              </h3>
              
              <div className="space-y-3">
                {[
                  {
                    q: "What is dynamic programming (DP)?",
                    a: "An algorithm design technique that solves complex problems by breaking them into overlapping subproblems, solving each once, and storing their results (memoization/tabulation) to avoid redundant computations."
                  },
                  {
                    q: "Why do we use indexes in MongoDB / SQL?",
                    a: "Indexes speed up read query execution times by allowing the database to search sorted index keys (B-Tree index pointers) rather than performing a slow sequential collection/table scan."
                  },
                  {
                    q: "Difference between process and thread?",
                    a: "A process is an independent program execution unit with its own memory space. A thread is a lightweight execution sub-unit inside a process that shares memory and resources with other sibling threads."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <h4 className="text-[11px] font-black text-white flex items-start gap-1">
                      <span className="text-indigo-400">Q.</span>
                      <span>{item.q}</span>
                    </h4>
                    <button
                      onClick={() => toggleQuizAnswer(idx)}
                      className="mt-2 text-[10px] text-indigo-400 font-bold flex items-center gap-1 hover:text-indigo-300"
                    >
                      <span>{quizAnswers[idx] ? "Hide Answer" : "Show Answer"}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${quizAnswers[idx] ? "rotate-180" : ""}`} />
                    </button>
                    {quizAnswers[idx] && (
                      <p className="mt-2 text-[10px] text-slate-300 leading-relaxed bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        {item.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sandbox Quick Link */}
            <div className="bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-500/20 p-5 rounded-3xl space-y-3">
              <h4 className="font-extrabold text-xs text-white flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Run Code Sandbox
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Want to test a code snippet you learned in the lesson? Launch our real JS Coding Sandbox to run algorithms and trace outputs.
              </p>
              <Link
                to="/candidate/coding-sandbox"
                className="inline-flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl transition shadow-md"
              >
                <span>Open Sandbox</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
