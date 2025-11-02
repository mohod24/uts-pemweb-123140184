// File konfigurasi Tailwind CSS
// Tailwind adalah framework CSS yang membantu kita styling website dengan mudah

/** @type {import('tailwindcss').Config} */
export default {
  // content: memberitahu Tailwind dimana file-file kita yang menggunakan class Tailwind
  // Tailwind akan scan file-file ini untuk mencari class yang dipakai
  content: [
    "./index.html",               // File HTML utama
    "./src/**/*.{js,ts,jsx,tsx}", // Semua file JS/JSX di folder src dan sub-foldernya
                                
  ],
  
  // theme: pengaturan tema seperti warna, font, spacing, dll
  theme: {
    // extend: menambahkan custom theme tanpa menghapus theme default Tailwind
    extend: {
      // Kita bisa tambahkan warna custom, font custom, dll disini
    },
  },
  
  // plugins: plugin tambahan untuk memperluas fungsi Tailwind
  plugins: [],
};
