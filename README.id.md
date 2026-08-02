<div align="center">

# ⚙️ Klipin Core Backend - Express.js API Gateway
> **Microservice REST API Backend Resmi untuk Sistem Referensi Klipin**

[![English](https://img.shields.io/badge/Language-English-red.svg)](README.md)
[![Bahasa Indonesia](https://img.shields.io/badge/Language-Bahasa_Indonesia-blue.svg)](README.id.md)

</div>

---

Selamat datang di **Repository Backend Utama** dari **Klipin - Smart Reference & Literature Research System**. Microservice Node.js Express ini menangani autentikasi pengguna, penyimpanan data melalui PostgreSQL, bookmark pustaka pribadi, serta bertindak sebagai API Gateway menuju Python AI Service (FastAPI / Hugging Face).

---

## ✨ Fitur Utama & Tanggung Jawab API

- **🔐 Autentikasi & Keamanan Pengguna**: Pendaftaran pengguna, login, pembuatan token JWT, dan pengacakan kata sandi aman.
- **⚡ AI Gateway Routing**: Mengarahkan pencarian artikel dan permintaan ringkasan LLM ke Python AI Service secara lancar.
- **💾 Penyimpanan Data PostgreSQL**: Menyimpan kata kunci pencarian, riwayat, bookmark artikel, dan metadata klasifikasi melalui Supabase PostgreSQL.
- **🛡️ Validasi & Middleware**: Pengaturan kebijakan CORS, verifikasi otorisasi, dan penanganan error terpusat.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js v18.x / v20.x
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: PostgreSQL (melalui [Supabase](https://supabase.com/))
- **Autentikasi**: `jsonwebtoken`, `bcryptjs`
- **HTTP Client**: `axios`

---

## ⚙️ Konfigurasi & Cara Menjalankan

### 1. Prasyarat
- **Node.js** v18.x atau v20.x
- **Yarn** atau **npm**
- Database **PostgreSQL**

### 2. Langkah Instalasi
```bash
# Clone repository
git clone https://github.com/AI-Research-TS/Backend.git
cd Backend

# Install dependencies
yarn install
```

### 3. Konfigurasi Variabel Lingkungan
Buat file `.env` pada folder utama:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
JWT_SECRET=your_jwt_secret_key_here

# Mode Hybrid (Direkomendasikan - Terhubung ke HF AI Cloud)
FASTAPI_URL=https://iruuuu-ai-service-skripsi.hf.space

# Mode Lokal Penuh (Terhubung ke Server FastAPI Lokal)
# FASTAPI_URL=http://127.0.0.1:8000
```

### 4. Menjalankan Server Backend
```bash
yarn dev
```
Server akan aktif pada: **`http://localhost:5000`**

---

## 🔗 Rute Utama API

| Endpoint | Method | Middleware | Deskripsi |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | None | Pendaftaran akun pengguna baru. |
| `/api/auth/login` | `POST` | None | Autentikasi pengguna & mengembalikan token JWT. |
| `/api/search` | `POST` | `authMiddleware` | Pencarian artikel via AI Service & mengembalikan hasil kaya metadata. |
| `/api/summarize` | `POST` | `authMiddleware` | Meminta ringkasan artikel LLM dari AI Service. |
| `/api/articles` | `GET/POST` | `authMiddleware` | Mengelola simpanan artikel di pustaka pribadi. |

---

## 👥 Organisasi
Bagian dari Organisasi GitHub **AI-Research-TS**.
