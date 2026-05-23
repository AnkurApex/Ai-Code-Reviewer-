# 🤖 AI Code Reviewer

<div align="center">

![AI Code Reviewer Banner](https://img.shields.io/badge/AI-Code%20Reviewer-blue?style=for-the-badge&logo=github)

### 🚀 Review Your GitHub Pull Requests Instantly with AI

**Paste any GitHub PR URL → Get instant bug detection, security analysis & performance insights in seconds.**

</div>

---

## 🎯 Problem Statement

Developers spend **2–3 hours manually reviewing pull requests**, and critical bugs, security vulnerabilities, or performance issues are still often missed. This leads to:

- ❌ Slow development cycles
- ❌ Bugs reaching production
- ❌ Security vulnerabilities going unnoticed
- ❌ Inconsistent code quality across teams

---

## 💡 Our Solution

An **AI-powered Code Review Agent** that integrates directly with GitHub, fetches PR diffs automatically, and provides categorized, actionable feedback within seconds — no manual code pasting required.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔗 **GitHub PR Integration** | Paste any public GitHub PR URL — app fetches code automatically |
| 🔴 **Bug Detection** | Logic errors, null checks, anti-patterns with line numbers |
| 🟠 **Security Analysis** | Hardcoded secrets, SQL injection, XSS vulnerabilities |
| 🟡 **Performance Issues** | Inefficient loops, memory leaks, redundant API calls |
| 🟢 **Code Suggestions** | Naming conventions, code smells, best practices |
| 📊 **Quality Score** | 0–100 visual score meter with Excellent/Good/Poor rating |
| 📋 **PR Summary** | 2–3 line overview of what the PR does |

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React.js** + **Vite** — Fast, modern UI
- 🎨 Custom CSS — Dark theme, responsive design

### Backend
- 🟢 **Node.js** + **Express.js** — REST API server
- 🤖 **Google Gemini 1.5 Flash** — AI-powered code analysis
- 🐙 **GitHub REST API v3** — Automatic PR diff fetching

### Architecture
```
User → React Frontend
     → Node.js Backend
     → GitHub API (fetch PR diff)
     → Gemini AI (analyze code)
     → Categorized JSON response
     → Results displayed on UI
```

---

## 📸 Screenshots

### 🏠 Landing Page
> Clean input interface with quick-try PR examples
![Landing Page](./assets/landing.png)

### 📊 Review Results
> Score meter + categorized bugs, security, performance cards
![Review Results](./assets/results.png)

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- Google Gemini API Key → [Get here](https://aistudio.google.com)
- GitHub Personal Access Token → [Get here](https://github.com/settings/tokens)

### 1. Clone the Repository
```bash
git clone https://github.com/AnkurApex/Ai-Code-Reviewer.git
cd Ai-Code-Reviewer
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in `/backend`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GITHUB_TOKEN=your_github_token_here
PORT=3000
```

Start backend:
```bash
npm run dev
```
✅ Backend runs on `http://localhost:3000`

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
✅ Frontend runs on `http://localhost:5173`

---

## 🧪 Test With These Real PRs

```
https://github.com/expressjs/express/pull/5957
https://github.com/axios/axios/pull/6728
https://github.com/facebook/react/pull/31195
```

---

## 📁 Project Structure

```
Ai-Code-Reviewer/
├── assets/                          # README assets (screenshots)
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── ai.controller.js     # Request handler
│   │   ├── routes/
│   │   │   └── ai.routes.js         # API routes
│   │   └── services/
│   │       ├── ai.service.js        # Gemini AI integration
│   │       └── github.service.js    # GitHub PR fetching
│   ├── app.js                       # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── InputSection.jsx      # PR URL input
    │   │   ├── ScoreCard.jsx         # Quality score display
    │   │   ├── ReviewCard.jsx        # Bug/Security/Perf cards
    │   │   ├── SummaryBox.jsx        # PR summary
    │   │   └── LoadingSpinner.jsx
    │   ├── services/
    │   │   └── api.js                # Backend API calls
    │   └── App.jsx                   # Main component
    └── package.json
```

---

## 🔮 Future Scope

- [ ] GitHub OAuth login — review private repositories
- [ ] Auto-post AI review comments directly on GitHub PR
- [ ] GitLab & Bitbucket support
- [ ] Slack / Discord alerts for critical issues
- [ ] Historical review dashboard
- [ ] Support for multiple AI models (Claude, GPT-4)
