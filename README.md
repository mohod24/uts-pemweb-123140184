#  portal-berita-react-184

Proyek ini adalah sebuah portal berita yang dibuat menggunakan React.js sebagai bagian dari Ujian Tengah Semester (UTS) Mata Kuliah Pemrograman Web.

- **Nama:** Mohd.Musyaffa Alief Athallah
- **NIM:** 123140184

---

## 📝 Deskripsi Proyek

**portal-berita-react-184** adalah aplikasi web *front-end* yang memungkinkan pengguna untuk menjelajahi, mencari, dan memfilter berita. Aplikasi ini dirancang untuk bekerja dengan NewsAPI, namun untuk keperluan pengembangan dan demonstrasi, proyek ini dikonfigurasi secara default untuk berjalan menggunakan **data mock lokal** (`mockNewsData.json`).

### Fitur Utama (Sesuai Spesifikasi)

1.  **Browse Berdasarkan Kategori:** Pengguna dapat melihat berita berdasarkan kategori yang telah ditentukan (General, Technology, Business, Sports) melalui Navbar.
2.  **Pencarian (Search):** Pengguna dapat mencari artikel berita menggunakan kata kunci.
3.  **Filter Tanggal:** Pengguna dapat memfilter hasil pencarian (berdasarkan kata kunci) mulai dari tanggal tertentu. Fitur ini akan aktif jika ada kata kunci yang dimasukkan.
4.  **Paginasi:** Navigasi halaman diimplementasikan untuk menjelajahi daftar artikel yang panjang.

### Fitur Ekstra (Penyempurnaan)

Selain fitur wajib, proyek ini juga mencakup beberapa penyempurnaan:

* **Mode Data Lokal:** Secara default, aplikasi mengambil data dari file JSON lokal (`src/data/mockNewsData.json`) untuk menghindari *rate limit* API selama pengembangan.
* **Bookmark / Favorit:** Pengguna dapat menyimpan artikel favorit mereka. Data favorit disimpan secara permanen di `localStorage` peramban.
* **Riwayat Pencarian:** Aplikasi menyimpan 5 riwayat pencarian terakhir pengguna di `localStorage` dan menampilkannya sebagai *tag* yang dapat diklik untuk pencarian cepat.
* **Loading Skeleton:** Menampilkan *placeholder* (kerangka) saat data sedang dimuat, memberikan pengalaman pengguna yang lebih baik.
* **Penanganan Error Gambar:** Jika gambar artikel gagal dimuat, sebuah gambar *placeholder* dinamis akan ditampilkan.

---

## 🚀 Instalasi dan Menjalankan

Proyek ini dapat dijalankan dalam dua mode: menggunakan data lokal (default) atau mengisi ulang data lokal dengan data *live* dari NewsAPI.

### 1. Menjalankan Proyek (Mode Data Lokal - Default)

Mode ini tidak memerlukan API Key dan langsung menggunakan file `mockNewsData.json` yang sudah disediakan.

1.  **Clone repository:**
    ```bash
    git clone [URL_REPOSITORY_ANDA]
    ```
2.  **Masuk ke direktori proyek:**
    ```bash
    cd nama-folder-proyek
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```
5.  Buka `http://localhost:5173` (atau port lain yang ditampilkan) di peramban Anda.

---

### 2. (Opsional) Mengisi Ulang Data Lokal dengan Data Live

Jika Anda ingin memperbarui file `mockNewsData.json` dengan berita terbaru dari NewsAPI:

1.  **Dapatkan API Key:** Buat akun di [https://newsapi.org/](https://newsapi.org/) untuk mendapatkan API Key gratis Anda.

2.  **Masukkan API Key:**
    * Buka file `scripts/fetchNewsData.js`.
    * Ganti nilai `API_KEY` di baris ke-6 dengan API Key Anda.
    ```javascript
    // scripts/fetchNewsData.js
    const API_KEY = "MASUKKAN_API_KEY_ANDA_DISINI";
    ```

3.  **Jalankan Skrip:**
    Pastikan Anda berada di direktori utama proyek, lalu jalankan perintah berikut di terminal:
    ```bash
    node scripts/fetchNewsData.js
    ```
4.  Skrip akan mengambil data baru dari API dan menimpannya di `src/data/mockNewsData.json`.

---

## 🌐 Link Deployment

Aplikasi ini telah di-hosting dan dapat diakses secara publik melalui tautan berikut:

**[MASUKKAN_LINK_DEPLOYMENT_ANDA_DISINI (misal: Vercel, Netlify)]**

---

## 📸 Screenshot Aplikasi

Berikut adalah tampilan dari aplikasi portal berita yang sedang berjalan.

*(Tips: Ganti `PATH_KE_SCREENSHOT_ANDA.png` dengan nama file screenshot Anda setelah Anda menambahkannya ke proyek)*

![Tampilan Halaman Utama Aplikasi](PATH_KE_SCREENSHOT_ANDA.png)
