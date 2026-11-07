<div align="center">

# Klipin — Backend API

**Express.js REST API gateway** untuk Klipin, sistem riset referensi & literatur skripsi.

[![Status](https://img.shields.io/badge/status-academic%20project-blue?style=flat-square)](#)
[![Node.js](https://img.shields.io/badge/Node.js-18%2F20-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-4-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://supabase.com)

<!-- lang-switcher -->
[English](README.md) · **Bahasa Indonesia**

</div>

---

## Tentang

Backend dari **Klipin**, aplikasi bantu mahasiswa mencari, menyimpan, dan meringkas referensi jurnal. Repo ini adalah *API gateway* Node.js yang menangani autentikasi, persistensi data, dan penerusan permintaan ke layanan AI Python terpisah.

> Frontend ada di repo [`frontend-klipin`](https://github.com/Ilhamaji/frontend-klipin).

## Tanggung Jawab

| Area | Detail |
| --- | --- |
| **Autentikasi** | Registrasi, login, hashing password (`bcryptjs`), dan penerbitan **JWT**. |
| **AI Gateway** | Meneruskan pencarian paper & permintaan ringkasan LLM ke layanan Python (FastAPI / Hugging Face). |
| **Persistensi** | Menyimpan riwayat pencarian, artikel yang di-bookmark, dan metadata klasifikasi di PostgreSQL (Supabase). |
| **Validasi & Middleware** | Kebijakan CORS, verifikasi otorisasi, dan penanganan error terpusat. |
| **Readiness probe** | Menangani *cold start* layanan AI di Hugging Face Space dengan probe kesiapan. |

## Tech Stack

| Bagian | Teknologi |
| --- | --- |
| Runtime | Node.js v18 / v20 |
| Framework | Express.js |
| Database | PostgreSQL via Supabase (`pg`) |
| Auth | `jsonwebtoken`, `bcryptjs` |
| HTTP Client | `axios` |
| Deploy | Netlify Functions (`netlify.toml`) |

## Menjalankan

### 1. Prasyarat

- Node.js v18 atau v20
- Instance PostgreSQL (lokal atau Supabase)

### 2. Clone & install

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

### 4. Migrasi database

```bash
# jalankan file di migrations/ sesuai urutan
```

### 5. Jalankan

```bash
npm start
```

## Struktur

```
server.js          # entrypoint Express
config/            # koneksi database & konfigurasi
migrations/        # skema SQL
models/            # query & model data
src/               # route, controller, middleware
netlify/           # adapter deploy Netlify
```

## Dokumentasi

- 🇬🇧 [English](README.md)
- 🇮🇩 [Bahasa Indonesia](README.id.md)

---

<div align="center">
Dibuat oleh <a href="https://github.com/Ilhamaji">Ilham Aji</a>
</div>
