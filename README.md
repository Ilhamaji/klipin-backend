<div align="center">

# Klipin — Backend API

**Express.js REST API gateway** for Klipin, a literature-research tool for thesis writing.

[![Status](https://img.shields.io/badge/status-academic%20project-blue?style=flat-square)](#)
[![Node.js](https://img.shields.io/badge/Node.js-18%2F20-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-4-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://supabase.com)

**English** · [Bahasa Indonesia](README.id.md)

</div>

---

## About

The backend of **Klipin**, a tool that helps students find, save, and summarise journal references. This repo is the Node.js *API gateway*: it handles authentication and persistence, and forwards AI work to a separate Python service.

> The frontend lives in [`klipin-frontend`](https://github.com/Ilhamaji/klipin-frontend).

## Responsibilities

| Area | Detail |
| --- | --- |
| **Authentication** | Registration, login, password hashing (`bcryptjs`), and **JWT** issuance. |
| **AI gateway** | Forwards paper search and LLM summary requests to the Python service (FastAPI / Hugging Face). |
| **Persistence** | Stores search history, bookmarked articles, and classification metadata in PostgreSQL (Supabase). |
| **Validation & middleware** | CORS policy, authorisation checks, and centralised error handling. |
| **Readiness probe** | Covers cold starts on the Hugging Face Space that hosts the AI service. |

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | Node.js v18 / v20 |
| Framework | Express.js |
| Database | PostgreSQL via Supabase (`pg`) |
| Auth | `jsonwebtoken`, `bcryptjs` |
| HTTP client | `axios` |
| Deployment | Netlify Functions (`netlify.toml`) |

## Getting Started

### 1. Prerequisites

- Node.js v18 or v20
- A PostgreSQL instance (local or Supabase)

### 2. Clone and install

```bash
git clone https://github.com/Ilhamaji/klipin-backend.git
cd klipin-backend
npm install
```

### 3. Environment

```bash
cp .env.example .env
```

```env
PORT=3000
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your_secret_key
AI_SERVICE_URL=https://your-ai-service.hf.space
```

### 4. Migrate the database

Run the files in `migrations/` in order.

### 5. Start

```bash
npm start
```

## Project Layout

```
server.js          # Express entrypoint
config/            # database connection and config
migrations/        # SQL schema
models/            # queries and data models
src/               # routes, controllers, middleware
netlify/           # Netlify deploy adapter
```

---

<div align="center">
Built by <a href="https://github.com/Ilhamaji">Ilham Aji</a>
</div>
