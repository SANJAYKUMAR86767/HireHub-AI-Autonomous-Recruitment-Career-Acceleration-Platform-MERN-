# 🚀 HireHub AI — Autonomous Recruitment & Career Acceleration Platform

<div align="center">

![HireHub Banner](https://img.shields.io/badge/HireHub-Autonomous%20AI%20Ecosystem-6366f1?style=for-the-badge&logo=rocket&logoColor=white)
<br />

[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![NodeJS](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%204-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%7C%20Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%203-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Socket.IO](https://img.shields.io/badge/RealTime-Socket.IO-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)
[![Docker](https://img.shields.io/badge/Container-Docker%20%7C%20Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

<p align="center">
  <strong>An enterprise-grade, autonomous recruitment ecosystem featuring live video AI mock studios, compensation & offer analyzers, distributed system design whiteboards, ATS resume deep auditing, recruiter talent sourcing radars, and verifiable cryptographic credentials.</strong>
</p>

[Explore Features](#-key-workspaces--ai-studios) • [Tech Stack](#-technologies--languages-used) • [Architecture](#-system-architecture) • [Getting Started](#-getting-started) • [Deployment](#-deployment-guide)

</div>

---

## ⚡ Technologies & Languages Used

| Layer | Technologies & Frameworks | Languages & Protocols |
|---|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons, Canvas API | JavaScript (ES6+), JSX, HTML5, CSS3 |
| **Media & AI Streaming** | WebRTC MediaStream API, Web Speech Recognition API | Client-Side Audio/Video Streams, Speech-to-Text |
| **Backend API** | Node.js, Express.js 4, RESTful Architecture | JavaScript (Async/Await, ES Modules) |
| **Real-Time Layer** | Socket.IO, WebSockets | Full-Duplex Bidirectional TCP Socket Events |
| **Database & Cache** | MongoDB Atlas, Mongoose ODM, Redis (Optional) | BSON, NoSQL Aggregation, In-Memory Key-Value |
| **Security & Auth** | JWT (JSON Web Tokens), Bcrypt.js, Helmet, CORS | Bearer Token Auth, SHA-256 Hashing |
| **DevOps & Cloud** | Docker, Docker Compose, Render, Vercel, Cloudinary | Containerization, CI/CD YAML |

---

## 🌟 Key Workspaces & AI Studios

### 1. 🎥 Live AI Mock Video Interview Studio (`/candidate/live-interview`)
* Real-time webcam and microphone streaming.
* Live speech-to-text transcription powered by the Web Speech API.
* Real-time telemetry HUD with **Words Per Minute (WPM)** meter and technical keyword density tracking.
* 4-pillar rubric evaluation (Technical Depth, STAR Structure, Clarity, Relevance).

### 2. 💼 AI Compensation & Offer Letter Analyzer (`/candidate/offer-analyzer`)
* Calculates **1st-Year Total Comp** vs **4-Year Annualized Average** (Base, Signing Bonus, Performance Bonus, Equity/ESOPs).
* Computes **Monthly Post-Tax In-Hand** take-home estimates (India & US).
* Market percentile ranking against top-tier tech benchmarks.
* Hidden risk clause radar (clawbacks, non-competes, cliffs).
* **1-Click AI Counter-Offer Email Generator**.

### 3. 🏢 AI Company Culture DNA & Reverse Interview Engine (`/candidate/culture-analyzer`)
* Decodes team engineering autonomy, release cadence, WLB score, code review rigor, and on-call expectations.
* Curated **Reverse Interview Question Matrix** tailored for Hiring Managers, VPs, and Peer Engineers.
* Detects subtle interview red flags and team toxicity warnings.

### 4. 🎥 60-Second Video Resume Elevator Pitch Studio (`/candidate/video-pitch`)
* Live video recording with built-in **Teleprompter Script HUD** and countdown timer.
* Evaluates hook strength, speaking cadence, and quantified achievements.
* Generates a shareable video pitch link for recruiter talent radar profiles.

### 5. 📄 AI ATS Resume Deep Auditor & Bullet Transformer (`/candidate/resume-auditor`)
* **5-Pillar ATS Scorecard**: Impact & Numbers, Action Verb Strength, Brevity, Structural Layout, and Keyword Density.
* **Google XYZ Bullet Transformer**: Converts weak bullet points into 3 high-impact variations (*Metric-Driven*, *Technical Leadership*, and *Problem-Action-Result*).

### 6. 🏗️ Interactive System Design & Architecture Playground (`/candidate/system-design-studio`)
* Visual canvas to assemble distributed systems (CDN, Load Balancers, Redis Cache, Microservices, Kafka, Sharded DB).
* Real-time **AI Resilience & SPOF Auditor**: Evaluates single points of failure, computes estimated QPS handling (up to 100k+ QPS), and latency grades (A+, A, B).

### 7. 📊 2026 Tech Stack Market Demand & Skill Swap Radar (`/candidate/tech-trends`)
* Real-time demand score (0-100), YoY salary growth, and compensation brackets in INR/USD.
* Skill Migration & Career Transition Fast-Tracks (e.g. Node.js -> Go, Python -> GenAI / LangChain) with estimated time to master and average salary lift.

### 8. 🎯 Recruiter Autonomous Talent Radar (`/recruiter/talent-pool`)
* Candidate sourcing by tech skills, verified badges, and AI match compatibility scores.
* 1-Click Google Calendar & Jitsi video interview scheduling.

### 9. ✉️ Recruiter AI Cold Outreach Sequence Generator (`/recruiter/outreach-generator`)
* Generates a 3-stage candidate headhunting sequence (Initial Hook, Value-Add Engineering Follow-up, Final Check-in).

### 10. ✍️ Recruiter AI Job Description Builder & Inclusivity Bias Shield (`/recruiter/post-job`)
* 1-Click job description generator with Inclusivity & Bias Audit score (0-100) and auto-suggested salary ranges.

### 11. 🏅 Verifiable AI Technical Certificates (`/candidate/certification`)
* High-resolution official certificate generator with unique cryptographic credential IDs, issue dates, and 1-click PDF export & LinkedIn sharing.

### 12. 📈 Engineering Career Leveling & Compensation Roadmap (`/candidate/career-roadmap`)
* Leveling ladder (L1 to L5), INR/USD currency converter, tech stack requirements, and promotion checklist.

---

## 🏛️ System Architecture

```
                                  ┌────────────────────────┐
                                  │   React 18 + Vite SPA  │
                                  │   (Tailwind CSS HUD)   │
                                  └───────────┬────────────┘
                                              │
                     ┌────────────────────────┴────────────────────────┐
                     │                                                 │
          HTTPS / REST API Requests                            Full-Duplex WebSockets
                     │                                                 │
                     ▼                                                 ▼
        ┌─────────────────────────┐                       ┌─────────────────────────┐
        │  Express.js API Router  │                       │  Socket.IO Chat Server  │
        │  (Auth, Jobs, AI Hub)   │                       │  (Real-Time Messaging)  │
        └────────────┬────────────┘                       └────────────┬────────────┘
                     │                                                 │
      ┌──────────────┴──────────────┐                                  │
      ▼                             ▼                                  │
┌──────────────┐             ┌──────────────┐                          │
│ MongoDB      │             │ Redis Cache  │                          │
│ Atlas Store  │             │ (Optional)   │                          │
└──────────────┘             └──────────────┘                          │
      ▲                                                                │
      └────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
- [Git](https://git-scm.com/)

---

### Local Installation (Without Docker)

#### 1. Clone the repository:
```bash
git clone https://github.com/SANJAYKUMAR86767/HireHub-AI-Autonomous-Recruitment-Career-Acceleration-Platform-MERN-.git
cd HireHub-AI-Autonomous-Recruitment-Career-Acceleration-Platform-MERN-/hirehub
```

#### 2. Configure Backend:
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

#### 3. Create Admin Account (Optional):
```bash
npm run create-admin -- admin@hirehub.com yourPassword123 "Platform Admin"
```

#### 4. Configure Frontend:
```bash
cd ../client
npm install
npm run dev
```

Visit **http://localhost:5173** in your browser!

---

### 🐳 Run with Docker (1-Click Startup)

```bash
cd hirehub
docker compose up --build
```
- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **MongoDB & Redis**: Initialized automatically inside container network.

---

## ⚙️ Environment Configuration

Create `.env` inside `hirehub/server`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hirehub
JWT_SECRET=your_super_secret_jwt_key_here
CLIENT_URL=http://localhost:5173

# Optional Services (Safe Rule Engine Fallbacks active by default)
ANTHROPIC_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
REDIS_URL=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
```

---

## 📂 Project Structure

```
hirehub/
├── docker-compose.yml          # Docker composition config
├── render.yaml                 # Render backend blueprint
├── server/                     # Express.js REST API & Socket.IO
│   ├── config/                 # Database & Cloudinary connectors
│   ├── controllers/            # Advanced AI, Job, Application & Auth controllers
│   ├── middleware/             # JWT auth & Multer file upload
│   ├── models/                 # User, Job, Application, Message Mongoose schemas
│   ├── routes/                 # Advanced, Auth, Job, Application & Chat routers
│   ├── sockets/                # Real-time chat socket handlers
│   └── app.js / server.js      # Server entry points
└── client/                     # React 18 SPA (Vite + Tailwind CSS)
    ├── src/
    │   ├── components/         # Navbar, AiCopilotDrawer, NotificationDropdown
    │   ├── context/            # AuthContext & SocketContext
    │   ├── pages/
    │   │   ├── candidate/      # LiveVideoInterview, OfferAnalyzer, SystemDesign, etc.
    │   │   ├── recruiter/      # TalentRadar, PostJob, OutreachGenerator, etc.
    │   │   └── admin/          # Admin dashboard & User moderation
    │   ├── services/           # Axios API instance
    │   └── App.jsx             # Master Route Registry
    └── package.json
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
<br />
Developed with ❤️ by **Sanjay Kumar** & the HireHub Engineering Team.
