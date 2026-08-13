import React, { useState, useEffect } from "react";
import {
  Activity,
  Zap,
  ShieldCheck,
  AlertOctagon,
  Flame,
  RefreshCw,
  Server,
  Database,
  Cpu,
  Radio,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
} from "lucide-react";

export default function ChaosSystemSimulator() {
  const [chaosEvent, setChaosEvent] = useState("healthy");
  const [latencyMs, setLatencyMs] = useState(14);
  const [qps, setQps] = useState(42000);
  const [errorRate, setErrorRate] = useState(0.01);
  const [circuitBreaker, setCircuitBreaker] = useState("CLOSED (Healthy)");
  const [healingProgress, setHealingProgress] = useState(100);

  const triggerChaos = (eventType) => {
    setChaosEvent(eventType);

    if (eventType === "redis_fail") {
      setLatencyMs(420);
      setErrorRate(3.8);
      setCircuitBreaker("HALF-OPEN (Throttling DB)");
      setHealingProgress(35);
    } else if (eventType === "ddos_spike") {
      setQps(145000);
      setLatencyMs(860);
      setErrorRate(12.4);
      setCircuitBreaker("OPEN (Fallback Mode)");
      setHealingProgress(20);
    } else if (eventType === "db_partition") {
      setLatencyMs(650);
      setErrorRate(8.9);
      setCircuitBreaker("HALF-OPEN (Read Replicas Active)");
      setHealingProgress(45);
    } else {
      // Reset to healthy
      setChaosEvent("healthy");
      setLatencyMs(14);
      setQps(42000);
      setErrorRate(0.01);
      setCircuitBreaker("CLOSED (Healthy)");
      setHealingProgress(100);
    }
  };

  const recoverSystem = () => {
    triggerChaos("healthy");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-8 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>Netflix Chaos Monkey Interactive Simulator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Activity className="w-8 h-8 text-rose-400" />
              Distributed Systems Chaos & Self-Healing Sandbox
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Inject catastrophic production infrastructure failures, stress test circuit breakers, and observe real-time self-healing failovers.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={recoverSystem}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-2xl text-xs font-black transition shadow-lg flex items-center space-x-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Auto-Heal System</span>
            </button>
          </div>
        </div>

        {/* Live Telemetry HUD Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl backdrop-blur-xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              P99 Request Latency
            </span>
            <span
              className={`text-2xl font-black ${
                latencyMs > 200 ? "text-rose-400 animate-pulse" : "text-emerald-400"
              }`}
            >
              {latencyMs} ms
            </span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl backdrop-blur-xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Current Throughput (QPS)
            </span>
            <span className="text-2xl font-black text-indigo-400">
              {qps.toLocaleString()} QPS
            </span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl backdrop-blur-xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              HTTP 5xx Error Rate
            </span>
            <span
              className={`text-2xl font-black ${
                errorRate > 1.0 ? "text-rose-400 font-black" : "text-slate-200"
              }`}
            >
              {errorRate}%
            </span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl backdrop-blur-xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Circuit Breaker State
            </span>
            <span className="text-sm font-black text-amber-400 truncate block mt-1">
              {circuitBreaker}
            </span>
          </div>
        </div>

        {/* Chaos Injection Buttons */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <Flame className="w-4 h-4" />
            Inject Chaos Monkey Fault Scenarios:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => triggerChaos("redis_fail")}
              className={`p-4 rounded-2xl border text-left transition-all ${
                chaosEvent === "redis_fail"
                  ? "bg-rose-600/20 border-rose-500 text-white shadow-lg"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <div className="font-extrabold text-xs text-white mb-1">💥 Redis Cluster Outage</div>
              <p className="text-[10px] text-slate-400">
                Simulate complete cache eviction causing DB thundering herd.
              </p>
            </button>

            <button
              onClick={() => triggerChaos("ddos_spike")}
              className={`p-4 rounded-2xl border text-left transition-all ${
                chaosEvent === "ddos_spike"
                  ? "bg-rose-600/20 border-rose-500 text-white shadow-lg"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <div className="font-extrabold text-xs text-white mb-1">⚡ 150k QPS DDoS Flood</div>
              <p className="text-[10px] text-slate-400">
                Saturate load balancer worker threads and trigger rate-limiting.
              </p>
            </button>

            <button
              onClick={() => triggerChaos("db_partition")}
              className={`p-4 rounded-2xl border text-left transition-all ${
                chaosEvent === "db_partition"
                  ? "bg-rose-600/20 border-rose-500 text-white shadow-lg"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <div className="font-extrabold text-xs text-white mb-1">🔌 DB Network Partition</div>
              <p className="text-[10px] text-slate-400">
                Simulate cross-region split-brain with read-only replica failover.
              </p>
            </button>
          </div>
        </div>

        {/* Visual Architectural Topology Map */}
        <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl space-y-6">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
            Live High-Availability Architecture Topology
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-between">
              <Cpu className="w-8 h-8 text-blue-400 mb-2" />
              <span className="text-xs font-bold text-white">Edge CDN & WAF</span>
              <span className="text-[10px] text-emerald-400 font-semibold mt-1">Status: OK</span>
            </div>

            <div
              className={`p-4 rounded-2xl border flex flex-col items-center justify-between ${
                chaosEvent === "ddos_spike"
                  ? "bg-rose-950/40 border-rose-500 text-rose-300"
                  : "bg-slate-950 border-slate-800 text-white"
              }`}
            >
              <Radio className="w-8 h-8 text-purple-400 mb-2" />
              <span className="text-xs font-bold">Envoy Load Balancer</span>
              <span className="text-[10px] font-semibold mt-1">
                {chaosEvent === "ddos_spike" ? "Rate Limiting Active" : "Status: OK"}
              </span>
            </div>

            <div
              className={`p-4 rounded-2xl border flex flex-col items-center justify-between ${
                chaosEvent === "redis_fail"
                  ? "bg-rose-950/40 border-rose-500 text-rose-300 animate-pulse"
                  : "bg-slate-950 border-slate-800 text-white"
              }`}
            >
              <Server className="w-8 h-8 text-amber-400 mb-2" />
              <span className="text-xs font-bold">Redis Cache Tier</span>
              <span className="text-[10px] font-semibold mt-1">
                {chaosEvent === "redis_fail" ? "Node Down (Evicted)" : "Status: OK"}
              </span>
            </div>

            <div
              className={`p-4 rounded-2xl border flex flex-col items-center justify-between ${
                chaosEvent === "db_partition"
                  ? "bg-rose-950/40 border-rose-500 text-rose-300"
                  : "bg-slate-950 border-slate-800 text-white"
              }`}
            >
              <Database className="w-8 h-8 text-indigo-400 mb-2" />
              <span className="text-xs font-bold">PostgreSQL Sharded Cluster</span>
              <span className="text-[10px] font-semibold mt-1">
                {chaosEvent === "db_partition" ? "Read-Only Replica Mode" : "Status: OK"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
