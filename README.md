# UCP 1: PENGEMBANGAN APLIKASI WEB
**Mata Kuliah**: Pengembangan Aplikasi Web (AntaraTI501P)  
**Materi**: Library System with Geolocation  
**Prodi**: Teknologi Informasi | **Fakultas**: Teknik  

---

# Library Management System API
Backend REST API untuk Sistem Manajemen Perpustakaan dengan fitur peminjaman berbasis lokasi (Geolocation), dibangun sesuai spesifikasi UCP 1.

## Fitur Utama
- **Manajemen Buku**: CRUD buku dengan validasi stok (Admin).
- **Peminjaman Buku**: Pencatatan peminjaman dengan data geolocation (User).
- **Autentikasi Header**: Simulasi role `admin` dan `user` menggunakan HTTP Header.
- **Relasi Database**: Book hasMany BorrowLog.
- **Pagination**: Tersedia pada endpoint list buku.

## Prasyarat
- Node.js installed
- MySQL Database running

## Cara Install
1. Clone atau ekstrak project ini.
2. Buka terminal di folder project.
3. Jalankan perintah:
   ```bash
   npm install
   ```
4. Sesuaikan konfigurasi database di file `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=library_db
   PORT=3000
   ```
5. Buat database di MySQL dengan nama `library_db`.

## Menjalankan Project
1. **Seeder Data Awal** (Opsional, untuk mengisi data buku):
   ```bash
   node seeders/seed.js
   ```
2. **Jalankan Server**:
   ```bash
   node server.js
   ```
3. API & Web UI akan berjalan di `http://localhost:3000`.

## Fitur Web Interface (User Friendly)
Aplikasi ini sekarang dilengkapi dengan **Landing Page** yang modern:
- **URL**: [http://localhost:3000](http://localhost:3000)
- **Fungsi**: Melihat daftar buku secara visual dan melakukan peminjaman langsung dengan Geolocation browser.
- **Simulasi ID**: Masukkan ID user pada kolom di navigasi untuk simulasi `x-user-id`.

## Dokumentasi API (Postman)

### 1. Public
- **GET** `/api/books` - List buku (Pagination: `?page=1&limit=10`)
- **GET** `/api/books/:id` - Detail buku

### 2. Admin Mode (`x-user-role: admin`)
- **POST** `/api/books` - Tambah buku
  - Body: `{"title": "Judul", "author": "Penulis", "stock": 5}`
- **PUT** `/api/books/:id` - Update buku
- **DELETE** `/api/books/:id` - Hapus buku

### 3. User Mode (`x-user-role: user`, `x-user-id: 123`)
- **POST** `/api/borrow` - Pinjam buku
  - Body: `{"bookId": 1, "latitude": -6.2088, "longitude": 106.8456}`
- **GET** `/api/borrow/history` - Lihat riwayat peminjaman


### Tabel: `books`
- `id` (INT, PK, Auto Increment)
- `title` (STRING, Not Null)
- `author` (STRING, Not Null)
- `stock` (INT, Not Null, Default: 0)
- `createdAt` (DATETIME)
- `updatedAt` (DATETIME)

### Tabel: `borrow_logs`
- `id` (INT, PK, Auto Increment)
- `userId` (INT, Not Null)
- `bookId` (INT, FK -> books.id)
- `borrowDate` (DATETIME, Default: NOW)
- `latitude` (FLOAT, Not Null)
- `longitude` (FLOAT, Not Null)
- `createdAt` (DATETIME)
- `updatedAt` (DATETIME)

**Relasi**: `Book` hasMany `BorrowLog` | `BorrowLog` belongsTo `Book`

## Simulasi Screenshot Output (JSON)

### GET /api/books (Pagination)
```json
{
  "success": true,
  "message": "Data buku berhasil diambil",
  "data": [...],
  "pagination": {
    "total": 5,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### POST /api/borrow (Success)
```json
{
  "success": true,
  "message": "Peminjaman buku berhasil",
  "data": {
    "id": 1,
    "userId": "1",
    "bookId": 2,
    "latitude": -6.2088,
    "longitude": 106.8456,
    "borrowDate": "2026-01-28T11:23:45.000Z"
  }
}
```

