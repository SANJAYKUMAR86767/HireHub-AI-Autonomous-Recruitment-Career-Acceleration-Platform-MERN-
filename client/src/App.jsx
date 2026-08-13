import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AiCopilotDrawer from "./components/AiCopilotDrawer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetail from "./pages/JobDetail";
import Chat from "./pages/Chat";

// Candidate Pages
import CandidateDashboard from "./pages/candidate/Dashboard";
import MyApplications from "./pages/candidate/MyApplications";
import InterviewPrep from "./pages/candidate/InterviewPrep";
import LiveVideoInterview from "./pages/candidate/LiveVideoInterview";
import ResumeBuilder from "./pages/candidate/ResumeBuilder";
import ResumeAuditor from "./pages/candidate/ResumeAuditor";
import OfferAnalyzer from "./pages/candidate/OfferAnalyzer";
import SystemDesignStudio from "./pages/candidate/SystemDesignStudio";
import CompanyCultureAnalyzer from "./pages/candidate/CompanyCultureAnalyzer";
import VideoPitchStudio from "./pages/candidate/VideoPitchStudio";
import TechTrendsMatrix from "./pages/candidate/TechTrendsMatrix";
import CareerRoadmap from "./pages/candidate/CareerRoadmap";
import EnglishSpokenCoach from "./pages/candidate/EnglishSpokenCoach";
import AiCodingSandbox from "./pages/candidate/CodingSandbox";
import AiSkillCertification from "./pages/candidate/SkillCertification";
import SalaryNegotiator from "./pages/candidate/SalaryNegotiator";
import PortfolioRanker from "./pages/candidate/PortfolioRanker";
import GlobalCompensation from "./pages/candidate/GlobalCompensation";
import StarBehavioralCoach from "./pages/candidate/StarBehavioralCoach";
import ChaosSystemSimulator from "./pages/candidate/ChaosSystemSimulator";
import VideoTelemetryStudio from "./pages/candidate/VideoTelemetryStudio";
import SkillMatrixGapAnalyzer from "./pages/candidate/SkillMatrixGapAnalyzer";
import InmailPitchGenerator from "./pages/candidate/InmailPitchGenerator";

// Recruiter Pages
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import PostJob from "./pages/recruiter/PostJob";
import Applicants from "./pages/recruiter/Applicants";
import TalentRadar from "./pages/recruiter/TalentRadar";
import RecruiterOutreachGenerator from "./pages/recruiter/RecruiterOutreachGenerator";
import BatchCandidateScreener from "./pages/recruiter/BatchCandidateScreener";
import BooleanSearchGenerator from "./pages/recruiter/BooleanSearchGenerator";
import BlindResumeAuditor from "./pages/recruiter/BlindResumeAuditor";
import AutonomousRecruiterAgent from "./pages/recruiter/AutonomousRecruiterAgent";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminJobs from "./pages/admin/Jobs";

import RoleQuickSwitcher from "./components/RoleQuickSwitcher";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/chat/:userId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />

        {/* Candidate Routes */}
        <Route path="/candidate/dashboard" element={
          <ProtectedRoute role="candidate"><CandidateDashboard /></ProtectedRoute>
        } />
        <Route path="/candidate/applications" element={
          <ProtectedRoute role="candidate"><MyApplications /></ProtectedRoute>
        } />
        <Route path="/candidate/interview-prep" element={
          <ProtectedRoute role="candidate"><InterviewPrep /></ProtectedRoute>
        } />
        <Route path="/candidate/live-interview" element={
          <ProtectedRoute role="candidate"><LiveVideoInterview /></ProtectedRoute>
        } />
        <Route path="/candidate/video-telemetry" element={
          <ProtectedRoute role="candidate"><VideoTelemetryStudio /></ProtectedRoute>
        } />
        <Route path="/candidate/resume-builder" element={
          <ProtectedRoute role="candidate"><ResumeBuilder /></ProtectedRoute>
        } />
        <Route path="/candidate/resume-auditor" element={
          <ProtectedRoute role="candidate"><ResumeAuditor /></ProtectedRoute>
        } />
        <Route path="/candidate/offer-analyzer" element={
          <ProtectedRoute role="candidate"><OfferAnalyzer /></ProtectedRoute>
        } />
        <Route path="/candidate/salary-negotiator" element={
          <ProtectedRoute role="candidate"><SalaryNegotiator /></ProtectedRoute>
        } />
        <Route path="/candidate/portfolio-ranker" element={
          <ProtectedRoute role="candidate"><PortfolioRanker /></ProtectedRoute>
        } />
        <Route path="/candidate/global-compensation" element={
          <ProtectedRoute role="candidate"><GlobalCompensation /></ProtectedRoute>
        } />
        <Route path="/candidate/star-coach" element={
          <ProtectedRoute role="candidate"><StarBehavioralCoach /></ProtectedRoute>
        } />
        <Route path="/candidate/chaos-simulator" element={
          <ProtectedRoute role="candidate"><ChaosSystemSimulator /></ProtectedRoute>
        } />
        <Route path="/candidate/skill-matrix-gap" element={
          <ProtectedRoute role="candidate"><SkillMatrixGapAnalyzer /></ProtectedRoute>
        } />
        <Route path="/candidate/inmail-pitch" element={
          <ProtectedRoute role="candidate"><InmailPitchGenerator /></ProtectedRoute>
        } />
        <Route path="/candidate/system-design-studio" element={
          <ProtectedRoute role="candidate"><SystemDesignStudio /></ProtectedRoute>
        } />
        <Route path="/candidate/culture-analyzer" element={
          <ProtectedRoute role="candidate"><CompanyCultureAnalyzer /></ProtectedRoute>
        } />
        <Route path="/candidate/video-pitch" element={
          <ProtectedRoute role="candidate"><VideoPitchStudio /></ProtectedRoute>
        } />
        <Route path="/candidate/tech-trends" element={<TechTrendsMatrix />} />
        <Route path="/candidate/career-roadmap" element={<CareerRoadmap />} />
        <Route path="/candidate/english-coach" element={
          <ProtectedRoute role="candidate"><EnglishSpokenCoach /></ProtectedRoute>
        } />
        <Route path="/candidate/coding-sandbox" element={
          <ProtectedRoute role="candidate"><AiCodingSandbox /></ProtectedRoute>
        } />
        <Route path="/candidate/certification" element={
          <ProtectedRoute role="candidate"><AiSkillCertification /></ProtectedRoute>
        } />

        {/* Recruiter Routes */}
        <Route path="/recruiter/dashboard" element={
          <ProtectedRoute role="recruiter"><RecruiterDashboard /></ProtectedRoute>
        } />
        <Route path="/recruiter/post-job" element={
          <ProtectedRoute role="recruiter"><PostJob /></ProtectedRoute>
        } />
        <Route path="/recruiter/jobs/:jobId/applicants" element={
          <ProtectedRoute role="recruiter"><Applicants /></ProtectedRoute>
        } />
        <Route path="/recruiter/talent-pool" element={
          <ProtectedRoute role="recruiter"><TalentRadar /></ProtectedRoute>
        } />
        <Route path="/recruiter/batch-screener" element={
          <ProtectedRoute role="recruiter"><BatchCandidateScreener /></ProtectedRoute>
        } />
        <Route path="/recruiter/boolean-generator" element={
          <ProtectedRoute role="recruiter"><BooleanSearchGenerator /></ProtectedRoute>
        } />
        <Route path="/recruiter/blind-resume" element={
          <ProtectedRoute role="recruiter"><BlindResumeAuditor /></ProtectedRoute>
        } />
        <Route path="/recruiter/autonomous-agent" element={
          <ProtectedRoute role="recruiter"><AutonomousRecruiterAgent /></ProtectedRoute>
        } />
        <Route path="/recruiter/outreach-generator" element={
          <ProtectedRoute role="recruiter"><RecruiterOutreachGenerator /></ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>
        } />
        <Route path="/admin/jobs" element={
          <ProtectedRoute role="admin"><AdminJobs /></ProtectedRoute>
        } />
      </Routes>

      {/* Global AI Career Copilot Assistant Drawer */}
      <AiCopilotDrawer />

      {/* Global Demo Role Switcher */}
      <RoleQuickSwitcher />
    </>
  );
}
