<div align="center">

# ⚙️ Klipin Core Backend - Express.js API Gateway
> **Official Backend REST API Microservice for Klipin Reference System**

[![English](https://img.shields.io/badge/Language-English-red.svg)](README.md)
[![Bahasa Indonesia](https://img.shields.io/badge/Language-Bahasa_Indonesia-blue.svg)](README.id.md)

</div>

---

Welcome to the **Core Backend Repository** of **Klipin - Smart Reference & Literature Research System**. This Node.js Express microservice handles user authentication, data persistence via PostgreSQL, personal article bookmarking, and serves as an API Gateway to the Python AI Service (FastAPI / Hugging Face).

---

## ✨ Key Features & API Responsibilities

- **🔐 Authentication & User Security**: User registration, login, JWT token generation, and secure password hashing.
- **⚡ AI Gateway Routing**: Forwards paper search and LLM summarization requests seamlessly to the Python AI Service.
- **💾 PostgreSQL Data Persistence**: Stores user queries, search histories, bookmarked articles, and classification metadata via Supabase PostgreSQL.
- **🛡️ Request Validation & Middleware**: CORS policy management, authorization verification, and centralized error handling.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js v18.x / v20.x
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: PostgreSQL (via [Supabase](https://supabase.com/))
- **ORMs & Drivers**: `pg`, `knex` / `sequelize` / `prisma`
- **Authentication**: `jsonwebtoken`, `bcryptjs`
- **HTTP Client**: `axios`

---

## ⚙️ Environment Setup & Installation

### 1. Prerequisites
- **Node.js** v18.x or v20.x
- **Yarn** or **npm**
- **PostgreSQL Database** instance

### 2. Installation Steps
```bash
# Clone repository
git clone https://github.com/AI-Research-TS/Backend.git
cd Backend

# Install dependencies
yarn install
```

### 3. Environment Variables Configuration
Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
JWT_SECRET=your_jwt_secret_key_here

# Hybrid Mode (Recommended - Connects to Production HF AI Cloud)
FASTAPI_URL=https://iruuuu-ai-service-skripsi.hf.space

# Full Local Mode (Connects to Local FastAPI Server)
# FASTAPI_URL=http://127.0.0.1:8000
```

### 4. Development Server
```bash
yarn dev
```
The server will start at: **`http://localhost:5000`**

---

## 🔗 Key API Routes

| Endpoint | Method | Middleware | Description |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | None | Register a new user account. |
| `/api/auth/login` | `POST` | None | Authenticate user and return JWT token. |
| `/api/search` | `POST` | `authMiddleware` | Search papers via AI Service & return enriched results. |
| `/api/summarize` | `POST` | `authMiddleware` | Request paper LLM summary from AI Service. |
| `/api/articles` | `GET/POST` | `authMiddleware` | Manage saved user articles in personal library. |

---

## 👥 Organization
Part of **AI-Research-TS** GitHub Organization.
