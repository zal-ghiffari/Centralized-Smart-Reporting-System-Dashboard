# Centralized Smart Reporting System

Web app Node.js (Express) dengan light theme dan layout full-width.

## Halaman
- Landing (`/`): Deskripsi sistem, tombol ke Dashboard, Playground, API Docs, Workflow. Menampilkan gambar workflow (`public/img/workflow-sistem.png`).
- Dashboard (`/dashboard`): Embed Metabase via token signed.
- Playground (`/playground`):
  - Form laporan (nama/anonymous, isi laporan) → proxy ke webhook n8n.
  - Pelaporan via Email (mailto) dan Telegram bot.
  - Tabel Unit Kerja/Layanan (data dari Postgres `unit_kerja`).
  - Tabel Aktivitas Email SMTP2GO (5 terbaru, 1 bulan terakhir, fallback tanpa tanggal).
- Workflow (`/workflow`): Embed visual workflow menggunakan `@n8n_io/n8n-demo-component`, data dari `public/data/workflow.json`.

## Struktur Direktori
- `src/server.js` – server, static, route mounting
- `src/db.js` – koneksi Postgres (`pg`)
- `src/routes/embed.js` – generate URL embed Metabase
- `src/routes/playground.js` – proxy kirim laporan ke webhook
- `src/routes/units.js` – ambil data `unit_kerja`
- `src/routes/email.js` – ambil aktivitas email SMTP2GO
- `public/index.html` – landing
- `public/dashboard.html` – Metabase iframe loader
- `public/playground.html` – playground + tabel
- `public/workflow.html` – viewer workflow (n8n-demo)
- `public/data/workflow.json` – sumber workflow untuk viewer
- `public/css/styles.css` – styling light mode

## Konfigurasi Lingkungan (.env)
Wajib:
- `PORT=3000`
- `DATABASE_URL=postgres://user:password@localhost:5432/smart_reporting`
- `PGSSL=false`

Metabase embed:
- `METABASE_SITE_URL=https://your-metabase.domain`
- `METABASE_SECRET_KEY=YOUR_SECRET`
- `METABASE_DASHBOARD_ID=101`

SMTP2GO (aktivitas email):
- `SMTP2GO_API_KEY=api-XXXX`

## Menjalankan
```bash
npm install
npm run dev
```

Kunjungi:
- `http://localhost:3000/`
- `http://localhost:3000/dashboard`
- `http://localhost:3000/playground`
- `http://localhost:3000/workflow`

## Catatan
- Jika tabel `unit_kerja` belum ada, buat terlebih dahulu atau sesuaikan query di `src/routes/units.js`.
- Pastikan API key SMTP2GO aktif agar tabel aktivitas email terisi.
