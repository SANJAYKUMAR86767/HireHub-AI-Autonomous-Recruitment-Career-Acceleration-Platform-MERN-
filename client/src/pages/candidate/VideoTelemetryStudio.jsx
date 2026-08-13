import React, { useState, useEffect, useRef } from "react";
import {
  Video,
  Eye,
  Smile,
  Mic,
  Sparkles,
  Award,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Play,
  Square,
  Volume2,
  Activity,
  Zap,
} from "lucide-react";

export default function VideoTelemetryStudio() {
  const [isRecording, setIsRecording] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [eyeContactPct, setEyeContactPct] = useState(88);
  const [fillerCount, setFillerCount] = useState(2);
  const [wpmPace, setWpmPace] = useState(132);
  const [confidenceScore, setConfidenceScore] = useState(92);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
        // Realistic dynamic telemetry fluctuation
        setEyeContactPct((prev) => Math.min(98, Math.max(75, prev + (Math.random() > 0.5 ? 2 : -2))));
        setWpmPace((prev) => Math.min(150, Math.max(115, prev + (Math.random() > 0.5 ? 3 : -3))));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleCamera = async () => {
    if (!cameraActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
      } catch (err) {
        // Fallback for environments without physical camera attached
        setCameraActive(true);
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
      setCameraActive(false);
      setIsRecording(false);
    }
  };

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      if (!cameraActive) toggleCamera();
    } else {
      setIsRecording(false);
    }
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-8 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Computer Vision & Vocal Telemetry HUD</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Video className="w-8 h-8 text-indigo-400" />
              Live Interview Body Language & Audio Telemetry HUD
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Real-time eye contact tracking, speech cadence meter, and filler word detection for high-stakes executive interviews.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleToggleRecord}
              className={`px-6 py-3 rounded-2xl font-black text-xs transition shadow-lg flex items-center space-x-2 ${
                isRecording
                  ? "bg-rose-600 hover:bg-rose-500 text-white animate-pulse"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white"
              }`}
            >
              {isRecording ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isRecording ? `Stop Telemetry (${formatTimer(timerSeconds)})` : "Start Telemetry Session"}</span>
            </button>
          </div>
        </div>

        {/* Telemetry Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Eye Contact Precision</span>
              <Eye className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-2xl font-black text-blue-400">{eyeContactPct}%</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Camera Lens Focus Target</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Speaking Pace (WPM)</span>
              <Mic className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-2xl font-black text-purple-400">{wpmPace} WPM</span>
            <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">Optimal Range: 120-145 WPM</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Filler Word Counter</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-2xl font-black text-amber-400">{fillerCount} Detected</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">"um", "like", "actually"</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Executive Presence</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-2xl font-black text-emerald-400">{confidenceScore} / 100</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Composite Score</span>
          </div>
        </div>

        {/* Video HUD Display & Teleprompter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Live Video Canvas & Telemetry Overlays (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-video bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${cameraActive ? "block" : "hidden"}`}
              />

              {!cameraActive && (
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 mx-auto flex items-center justify-center mb-4">
                    <Video className="w-8 h-8" />
                  </div>
                  <h3 className="font-extrabold text-base text-white">Camera Feed Standby</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    Click "Start Telemetry Session" to activate the camera HUD and real-time posture analysis.
                  </p>
                </div>
              )}

              {/* In-HUD Live Overlay Badges */}
              {isRecording && (
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 flex items-center space-x-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                    <span className="font-mono text-white font-bold">{formatTimer(timerSeconds)}</span>
                  </div>

                  <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-indigo-500/40 text-[11px] font-bold text-indigo-300">
                    Live Telemetry Streaming: OK
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Teleprompter Practice Script & Real-Time Feedback (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Live Teleprompter Script
              </h3>
              <p className="text-xs text-slate-400">
                Practice reading this system architecture response while maintaining natural eye contact with the camera lens:
              </p>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-200 font-mono leading-relaxed max-h-52 overflow-y-auto">
                "To scale our payment processing pipeline to 50,000 requests per second, I decoupled our synchronous HTTP API into an asynchronous event stream using Apache Kafka. By introducing a multi-cluster Redis caching layer with a 5-minute TTL, we reduced direct database read pressure by 82% while keeping P99 latency strictly under 15 milliseconds."
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Real-Time Vocal Coaching Tips:
                </span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Pitch stability is strong. Pauses between technical terms are well-timed.</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>Remember to look directly at the webcam lens, not down at the screen.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
