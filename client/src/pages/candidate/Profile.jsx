import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { User, MapPin, Briefcase, GraduationCap, Code, Upload, Save, CheckCircle, Plus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    location: "",
    skills: [],
    experience: [],
    education: [],
    resumeUrl: ""
  });
  const [skillsInput, setSkillsInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  // Experience form inputs
  const [newExp, setNewExp] = useState({ title: "", company: "", years: "" });
  // Education form inputs
  const [newEdu, setNewEdu] = useState({ degree: "", institute: "", year: "" });

  useEffect(() => {
    api.get("/auth/me")
      .then((res) => {
        const data = res.data;
        setProfile({
          name: data.name || "",
          email: data.email || "",
          location: data.location || "",
          skills: data.skills || [],
          experience: data.experience || [],
          education: data.education || [],
          resumeUrl: data.resumeUrl || ""
        });
        setSkillsInput((data.skills || []).join(", "));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaved(false);
    try {
      const skillsArray = skillsInput.split(",").map((s) => s.trim()).filter(Boolean);
      const res = await api.put("/auth/me", {
        name: profile.name,
        location: profile.location,
        skills: skillsArray,
        experience: profile.experience,
        education: profile.education
      });
      setProfile((prev) => ({
        ...prev,
        ...res.data
      }));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    if (!resumeFile) return;
    const formData = new FormData();
    formData.append("resume", resumeFile);
    try {
      setUploading(true);
      setUploadMsg("");
      const res = await api.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadMsg("Resume uploaded and synced!");
      setProfile((prev) => ({ ...prev, resumeUrl: res.data.resumeUrl }));
    } catch (err) {
      setUploadMsg(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const addExperience = () => {
    if (!newExp.title || !newExp.company || !newExp.years) return;
    setProfile((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...newExp, years: Number(newExp.years) }]
    }));
    setNewExp({ title: "", company: "", years: "" });
  };

  const removeExperience = (idx) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx)
    }));
  };

  const addEducation = () => {
    if (!newEdu.degree || !newEdu.institute || !newEdu.year) return;
    setProfile((prev) => ({
      ...prev,
      education: [...prev.education, { ...newEdu, year: Number(newEdu.year) }]
    }));
    setNewEdu({ degree: "", institute: "", year: "" });
  };

  const removeEducation = (idx) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx)
    }));
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 animate-pulse space-y-4">
        <div className="h-10 bg-slate-900 rounded-xl" />
        <div className="h-64 bg-slate-900 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white">Create & Update Profile</h1>
          <p className="text-xs text-slate-400 mt-0.5">Customize your personal bio, experience timeline and skills matrix</p>
        </div>
        <Link
          to="/candidate/dashboard"
          className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
        >
          <span>Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Personal Details */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="font-extrabold text-sm text-indigo-400 flex items-center gap-1.5">
            <User className="w-4 h-4" /> Personal Profile Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
              <input
                required
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
              <input
                disabled
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-500 focus:outline-none cursor-not-allowed"
                value={profile.email}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Location</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  placeholder="e.g. Bengaluru, Karnataka, IN"
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Resume Management */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="font-extrabold text-sm text-indigo-400 flex items-center gap-1.5">
            <Upload className="w-4 h-4" /> ATS Sync Resume
          </h3>
          {profile.resumeUrl ? (
            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-850">
              Current Active Resume:{" "}
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="text-indigo-400 font-extrabold underline">
                View Resume PDF
              </a>
            </p>
          ) : (
            <p className="text-xs text-slate-400">No resume uploaded. Sync one to calculate AI match ratings against jobs.</p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-500/10 file:text-indigo-300 hover:file:bg-indigo-500/20"
            />
            <button
              type="button"
              onClick={uploadResume}
              disabled={uploading || !resumeFile}
              className="w-full sm:w-auto bg-slate-950 hover:bg-slate-800 disabled:bg-slate-800 text-white px-5 py-2 rounded-xl text-xs font-bold transition shadow-sm border border-slate-850"
            >
              {uploading ? "Analyzing & Syncing..." : "Upload PDF"}
            </button>
          </div>
          {uploadMsg && <p className="text-xs text-slate-300 font-semibold">{uploadMsg}</p>}
        </div>

        {/* Skills Matrix */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="font-extrabold text-sm text-indigo-400 flex items-center gap-1.5">
            <Code className="w-4 h-4" /> Tech Stack & Skills
          </h3>
          <p className="text-xs text-slate-400">Comma-separated keywords used for indexing recommendation models.</p>
          <textarea
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            placeholder="React, Node.js, MongoDB, TypeScript, AWS..."
            className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            rows={3}
          />
        </div>

        {/* Experience Timeline */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="font-extrabold text-sm text-indigo-400 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4" /> Professional Experience
          </h3>
          
          <div className="space-y-3">
            {profile.experience.map((exp, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-850 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">{exp.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{exp.company} · {exp.years} Years</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeExperience(idx)}
                  className="p-2 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-850 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              placeholder="Job Title (e.g. Frontend Dev)"
              className="bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-white"
              value={newExp.title}
              onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
            />
            <input
              placeholder="Company Name"
              className="bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-white"
              value={newExp.company}
              onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
            />
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Years"
                className="bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-white w-20 shrink-0"
                value={newExp.years}
                onChange={(e) => setNewExp({ ...newExp, years: e.target.value })}
              />
              <button
                type="button"
                onClick={addExperience}
                className="flex-1 bg-slate-950 hover:bg-slate-800 text-indigo-400 hover:text-white border border-slate-850 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>
        </div>

        {/* Education History */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="font-extrabold text-sm text-indigo-400 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" /> Education & Credentials
          </h3>

          <div className="space-y-3">
            {profile.education.map((edu, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-850 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">{edu.degree}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{edu.institute} · Class of {edu.year}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeEducation(idx)}
                  className="p-2 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-850 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              placeholder="Degree / Course (e.g. B.Tech)"
              className="bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-white"
              value={newEdu.degree}
              onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
            />
            <input
              placeholder="Institute Name"
              className="bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-white"
              value={newEdu.institute}
              onChange={(e) => setNewEdu({ ...newEdu, institute: e.target.value })}
            />
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Year"
                className="bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-white w-24 shrink-0"
                value={newEdu.year}
                onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
              />
              <button
                type="button"
                onClick={addEducation}
                className="flex-1 bg-slate-950 hover:bg-slate-800 text-indigo-400 hover:text-white border border-slate-850 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 via-purple-650 to-indigo-600 hover:from-indigo-600 hover:to-purple-750 text-white font-black px-8 py-3.5 rounded-2xl text-xs shadow-xl transition flex items-center gap-1.5 shadow-indigo-500/25"
          >
            <Save className="w-4 h-4" /> Save Profile Details
          </button>
          {saved && (
            <span className="text-xs font-extrabold text-emerald-450 flex items-center gap-1">
              <CheckCircle className="w-4 h-4 animate-bounce" /> Profile Updated Successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
