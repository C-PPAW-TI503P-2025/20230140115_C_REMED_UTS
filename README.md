# Library Management System API
Backend REST API untuk Sistem Manajemen Perpustakaan dengan fitur peminjaman berbasis lokasi (Geolocation).

Fitur Utama
- **Manajemen Buku**: CRUD buku dengan validasi stok (Admin).
- **Peminjaman Buku**: Pencatatan peminjaman dengan data geolocation (User).
- **Autentikasi Header**: Simulasi role `admin` dan `user` menggunakan HTTP Header.
- **Relasi Database**: Book hasMany BorrowLog.
- **Pagination**: Tersedia pada endpoint list buku.

Prasyarat
- Node.js installed
- MySQL Database running

 Cara Install
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

Menjalankan Project
1. **Seeder Data Awal** (Opsional, untuk mengisi data buku):
   ```bash
   node seeders/seed.js
   ```
2. **Jalankan Server**:
   ```bash
   node server.js
   ```
3. API & Web UI akan berjalan di `http://localhost:3000`.

Fitur Web Interface (User Friendly)
Aplikasi ini sekarang dilengkapi dengan **Landing Page** yang modern:
- **URL**: [http://localhost:3000](http://localhost:3000)
- **Fungsi**: Melihat daftar buku secara visual dan melakukan peminjaman langsung dengan Geolocation browser.
- **Simulasi ID**: Masukkan ID user pada kolom di navigasi untuk simulasi `x-user-id`.

#Dokumentasi API (Postman)

1. Public
- **GET** `/api/books` - List buku (Pagination: `?page=1&limit=10`)
- **GET** `/api/books/:id` - Detail buku

2. Admin Mode (`x-user-role: admin`)
- **POST** `/api/books` - Tambah buku
  - Body: `{"title": "Judul", "author": "Penulis", "stock": 5}`
- **PUT** `/api/books/:id` - Update buku
- **DELETE** `/api/books/:id` - Hapus buku

 3. User Mode (`x-user-role: user`, `x-user-id: 123`)
- **POST** `/api/borrow` - Pinjam buku
  - Body: `{"bookId": 1, "latitude": -6.2088, "longitude": 106.8456}`
- **GET** `/api/borrow/history` - Lihat riwayat peminjaman


Tabel: `books`
- `id` (INT, PK, Auto Increment)
- `title` (STRING, Not Null)
- `author` (STRING, Not Null)
- `stock` (INT, Not Null, Default: 0)
- `createdAt` (DATETIME)
- `updatedAt` (DATETIME)

Tabel: `borrow_logs`
- `id` (INT, PK, Auto Increment)
- `userId` (INT, Not Null)
- `bookId` (INT, FK -> books.id)
- `borrowDate` (DATETIME, Default: NOW)
- `latitude` (FLOAT, Not Null)
- `longitude` (FLOAT, Not Null)
- `createdAt` (DATETIME)
- `updatedAt` (DATETIME)

*Relasi*: `Book` hasMany `BorrowLog` | `BorrowLog` belongsTo `Book`

Simulasi Screenshot Output (JSON)

GET /api/books (Pagination)
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

POST /api/borrow (Success)
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

<img width="1315" height="886" alt="Screenshot 2026-01-28 114644" src="https://github.com/user-attachments/assets/44971f35-fce3-4108-a522-128ba0959ae7" />

<img width="1553" height="895" alt="Screenshot 2026-01-28 114717" src="https://github.com/user-attachments/assets/365a17a5-f872-41b9-9729-5b74c1fc72e8" />

<img width="1919" height="916" alt="Screenshot 2026-01-28 115110" src="https://github.com/user-attachments/assets/1c9a466d-28e5-4524-a69c-28e22daa3db7" />

<img width="1007" height="435" alt="Screenshot 2026-01-28 115246" src="https://github.com/user-attachments/assets/33ddec02-8d45-4cff-8b73-04cd1fb0b2f2" />

<img width="1919" height="1030" alt="Screenshot 2026-01-28 115441" src="https://github.com/user-attachments/assets/3088f26a-cef4-4053-b7b5-1af6d23345e7" />

<img width="1919" height="1017" alt="Screenshot 2026-01-28 115453" src="https://github.com/user-attachments/assets/2f595a2c-e8bb-426c-9cc1-4b8df9c9fe4a" />





