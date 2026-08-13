import React, { useState } from "react";
import {
  Globe2,
  DollarSign,
  TrendingUp,
  PieChart,
  Scale,
  Sparkles,
  Home,
  Coffee,
  Laptop,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const REGIONS = [
  {
    id: "in_blr",
    country: "India",
    city: "Bengaluru",
    currency: "INR (₹)",
    symbol: "₹",
    flag: "🇮🇳",
    pppFactor: 1.0, // Base
    taxRatePct: 24.5,
    avgRentUSD: 450,
    costOfLivingIndex: 28,
  },
  {
    id: "us_sf",
    country: "USA (California)",
    city: "San Francisco",
    currency: "USD ($)",
    symbol: "$",
    flag: "🇺🇸",
    pppFactor: 3.4,
    taxRatePct: 34.0,
    avgRentUSD: 3100,
    costOfLivingIndex: 100,
  },
  {
    id: "us_tx",
    country: "USA (Texas - No State Tax)",
    city: "Austin",
    currency: "USD ($)",
    symbol: "$",
    flag: "🇺🇸",
    pppFactor: 2.6,
    taxRatePct: 22.0,
    avgRentUSD: 1850,
    costOfLivingIndex: 68,
  },
  {
    id: "uk_lon",
    country: "United Kingdom",
    city: "London",
    currency: "GBP (£)",
    symbol: "£",
    flag: "🇬🇧",
    pppFactor: 2.8,
    taxRatePct: 32.0,
    avgRentUSD: 2400,
    costOfLivingIndex: 82,
  },
  {
    id: "uae_dxb",
    country: "UAE (Zero Tax)",
    city: "Dubai",
    currency: "AED (د.إ)",
    symbol: "AED ",
    flag: "🇦🇪",
    pppFactor: 2.1,
    taxRatePct: 0.0, // 0% Income Tax
    avgRentUSD: 1900,
    costOfLivingIndex: 64,
  },
  {
    id: "de_ber",
    country: "Germany",
    city: "Berlin",
    currency: "EUR (€)",
    symbol: "€",
    flag: "🇩🇪",
    pppFactor: 2.3,
    taxRatePct: 38.5,
    avgRentUSD: 1400,
    costOfLivingIndex: 62,
  },
];

export default function GlobalCompensation() {
  const [baseLPA, setBaseLPA] = useState(38); // in Lakhs INR
  const [selectedHomeRegion, setSelectedHomeRegion] = useState(REGIONS[0]); // India
  const [selectedTargetRegion, setSelectedTargetRegion] = useState(REGIONS[1]); // US SF

  // Convert INR LPA to USD Base equivalent (1 USD ~ 87 INR)
  const baseSalaryUSD = (baseLPA * 100000) / 87;

  // Target PPP Equivalent USD
  const pppEquivalentUSD = baseSalaryUSD * (selectedTargetRegion.pppFactor / selectedHomeRegion.pppFactor);

  // Target Annual Tax & Post-Tax take home
  const targetAnnualTaxUSD = pppEquivalentUSD * (selectedTargetRegion.taxRatePct / 100);
  const targetNetAnnualUSD = pppEquivalentUSD - targetAnnualTaxUSD;
  const targetMonthlyNetUSD = targetNetAnnualUSD / 12;
  const targetMonthlyRentUSD = selectedTargetRegion.avgRentUSD;
  const targetMonthlyDisposableUSD = Math.max(0, targetMonthlyNetUSD - targetMonthlyRentUSD);

  // Home Region Monthly Breakdown
  const homeAnnualTaxUSD = baseSalaryUSD * (selectedHomeRegion.taxRatePct / 100);
  const homeNetAnnualUSD = baseSalaryUSD - homeAnnualTaxUSD;
  const homeMonthlyNetUSD = homeNetAnnualUSD / 12;
  const homeMonthlyRentUSD = selectedHomeRegion.avgRentUSD;
  const homeMonthlyDisposableUSD = Math.max(0, homeMonthlyNetUSD - homeMonthlyRentUSD);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-8 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              <Globe2 className="w-3.5 h-3.5 text-blue-400" />
              <span>International PPP & Cost-of-Living Matrix</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-blue-400" />
              Global Purchasing Power & Salary Normalizer
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Compare global tech compensation across India, US, UK, Germany, and UAE with real-world Purchasing Power Parity (PPP) & tax brackets.
            </p>
          </div>
        </div>

        {/* Input & Region Selection Panel */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Base LPA Slider */}
            <div>
              <div className="flex justify-between text-slate-300 text-xs font-bold mb-2">
                <span>Base Salary in India (INR)</span>
                <span className="text-emerald-400 text-sm font-black">₹{baseLPA} LPA</span>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="2"
                value={baseLPA}
                onChange={(e) => setBaseLPA(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>₹10 LPA</span>
                <span>₹60 LPA</span>
                <span>₹120 LPA</span>
              </div>
            </div>

            {/* Target Country Selector */}
            <div className="md:col-span-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2">
                Compare Against Target Global Hub:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {REGIONS.slice(1).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedTargetRegion(r)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedTargetRegion.id === r.id
                        ? "bg-blue-600/20 border-blue-500 text-white shadow-lg"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="text-xl mb-1">{r.flag}</div>
                    <div className="font-bold text-xs truncate">{r.city}</div>
                    <div className="text-[10px] text-slate-400 truncate">{r.country}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Home Region Card */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{selectedHomeRegion.flag}</span>
                <div>
                  <h3 className="font-black text-lg text-white">
                    {selectedHomeRegion.city}, {selectedHomeRegion.country}
                  </h3>
                  <span className="text-xs text-slate-400">Anchor Base Lifestyle</span>
                </div>
              </div>
              <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                ₹{baseLPA} LPA Fixed
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Net Monthly In-Hand
                </span>
                <span className="text-xl font-black text-white">
                  ₹{((homeMonthlyNetUSD * 87) / 1000).toFixed(0)}k
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  (${Math.round(homeMonthlyNetUSD)} USD)
                </span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                  Monthly Savings Post-Rent
                </span>
                <span className="text-xl font-black text-emerald-400">
                  ₹{((homeMonthlyDisposableUSD * 87) / 1000).toFixed(0)}k
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  (${Math.round(homeMonthlyDisposableUSD)} USD)
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-indigo-400" /> Avg. 2BHK Apartment Rent
                </span>
                <span className="font-bold text-white">
                  ₹{((selectedHomeRegion.avgRentUSD * 87) / 1000).toFixed(0)}k/mo
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-purple-400" /> Income Tax Rate Bracket
                </span>
                <span className="font-bold text-white">~{selectedHomeRegion.taxRatePct}%</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-amber-400" /> Cost of Living Index
                </span>
                <span className="font-bold text-white">
                  {selectedHomeRegion.costOfLivingIndex} / 100
                </span>
              </div>
            </div>
          </div>

          {/* Target Region Card */}
          <div className="bg-gradient-to-br from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-500/40 p-6 rounded-3xl backdrop-blur-xl shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{selectedTargetRegion.flag}</span>
                <div>
                  <h3 className="font-black text-lg text-white">
                    {selectedTargetRegion.city}, {selectedTargetRegion.country}
                  </h3>
                  <span className="text-xs text-blue-300">Target PPP Normalized Match</span>
                </div>
              </div>
              <span className="text-xs font-black text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
                ${Math.round(pppEquivalentUSD).toLocaleString()} USD / yr
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Net Monthly In-Hand
                </span>
                <span className="text-xl font-black text-white">
                  ${Math.round(targetMonthlyNetUSD).toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Post-Tax Income</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-blue-400 block">
                  Monthly Savings Post-Rent
                </span>
                <span className="text-xl font-black text-blue-400">
                  ${Math.round(targetMonthlyDisposableUSD).toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Disposable Cash</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-blue-400" /> Avg. 1BHK / 2BHK Rent
                </span>
                <span className="font-bold text-white">
                  ${selectedTargetRegion.avgRentUSD}/mo
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-purple-400" /> Estimated Tax Rate
                </span>
                <span className="font-bold text-white">
                  {selectedTargetRegion.taxRatePct === 0
                    ? "0% (Zero Tax Haven)"
                    : `~${selectedTargetRegion.taxRatePct}%`}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-amber-400" /> Cost of Living Index
                </span>
                <span className="font-bold text-white">
                  {selectedTargetRegion.costOfLivingIndex} / 100
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
