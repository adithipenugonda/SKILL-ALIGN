# 🚀 SkillAlign

### AI-Powered Career & Curriculum Intelligence Platform

SkillAlign bridges the gap between **education and industry** using Artificial Intelligence.

It helps:

* 🎓 Students optimize resumes and identify skill gaps
* 👨‍🏫 Educators modernize curricula using real-time industry requirements
* 🏢 Employers discover industry-ready talent (Upcoming)

---

## 📌 Project Overview

Traditional education often lags behind rapidly changing industry requirements.

SkillAlign solves this problem by providing:

### For Students

* AI Resume Analysis
* ATS Score Calculation
* Skill Gap Identification
* Personalized Skill Recommendations

### For Educators

* AI Curriculum Analysis
* Industry Skill Mapping
* Curriculum Enhancement Suggestions
* Market Alignment Score

---

# 🏗️ Current Development Status

## ✅ Phase 1 - Backend Core Completed

### 🔐 Authentication Module

Features:

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Authentication
* Protected Routes
* Role-based foundation

Implemented:

```text
Register API
Login API
JWT Middleware
Protected Profile Route
```

---

### 📄 Resume Analyzer Module

Features:

* Resume PDF Upload
* Resume Parsing
* Skill Extraction
* ATS Score Calculation
* Missing Skills Detection
* Recommended Skills Generation
* AI Resume Suggestions

Workflow:

```text
Upload Resume
      ↓
Parse PDF
      ↓
Extract Skills
      ↓
Calculate ATS Score
      ↓
Identify Missing Skills
      ↓
Generate AI Suggestions
      ↓
Store in MongoDB
```

Sample Output:

```json
{
  "atsScore": 75,
  "matchedSkills": [
    "React",
    "Node.js",
    "MongoDB"
  ],
  "missingSkills": [
    "Docker",
    "Next.js"
  ]
}
```

---

### 📚 Curriculum Enhancer Module

Features:

* Curriculum PDF Upload
* Curriculum Parsing
* Existing Skill Detection
* Industry Skill Comparison
* Market Alignment Score
* Missing Skills Identification
* AI Curriculum Enhancement

Workflow:

```text
Upload Curriculum
        ↓
Extract Text
        ↓
Analyze Existing Skills
        ↓
Compare With Market Skills
        ↓
Calculate Alignment Score
        ↓
Generate Enhanced Curriculum
        ↓
Save Results
```

Generated Output:

* Outdated Topics
* Missing Skills
* Project Suggestions
* Enhanced Curriculum
* Market Alignment Score

Example:

```json
{
  "marketAlignmentScore": 17,
  "missingSkills": [
    "React",
    "Next.js",
    "Docker",
    "AWS"
  ]
}
```

---

# 🤖 AI Integration

Current AI Provider:

```text
OpenRouter
```

Used For:

* Resume Suggestions
* Curriculum Enhancement
* Skill Recommendations

---

# 🛠️ Tech Stack

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

## Authentication

* JWT
* bcryptjs

## AI

* OpenRouter API

## File Processing

* Multer
* pdf2json

---

# 📂 Backend Structure

```text
backend
│
├── controllers
│   ├── authController.js
│   ├── resumeController.js
│   └── curriculumController.js
│
├── middleware
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
│
├── models
│   ├── User.js
│   ├── Resume.js
│   └── Curriculum.js
│
├── routes
│   ├── authRoutes.js
│   ├── resumeRoutes.js
│   └── curriculumRoutes.js
│
├── services
│   ├── openRouterService.js
│   ├── resumeService.js
│   └── curriculumService.js
│
├── utils
│   ├── pdfParser.js
│   ├── skillExtractor.js
│   ├── atsCalculator.js
│   ├── marketSkillDictionary.js
│   └── curriculumAnalyzer.js
│
├── uploads
│
├── .env
├── server.js
└── package.json
```

---

# 🔌 API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/profile
```

---

## Resume Module

```http
POST   /api/resumes/upload
GET    /api/resumes
GET    /api/resumes/:id
DELETE /api/resumes/:id
```

---

## Curriculum Module

```http
POST   /api/curriculums/upload
GET    /api/curriculums
GET    /api/curriculums/:id
DELETE /api/curriculums/:id
```

---

# 🚧 Upcoming Features

## Student Dashboard

* Company Explorer
* Career Roadmap Generator
* AI Industry Updates
* Internship Tracker
* Placement Preparation Hub

---

## Educator Dashboard

* Research Paper Analyzer
* AI Research Assistant
* Latest AI Updates
* Curriculum Export to PDF
* Industry Trend Dashboard

---

## Employer Dashboard

* Candidate Discovery
* Skill Verification
* Job Posting
* Talent Matching Engine

---

# 🎯 Project Goal

Build a complete AI-powered ecosystem that continuously aligns:

```text
Students
    ↕
Education
    ↕
Industry
```

to create industry-ready talent at scale.

---


