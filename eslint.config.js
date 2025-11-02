// File konfigurasi ESLint
// ESLint adalah tool yang membantu kita menulis kode yang rapi dan konsisten
// Dia akan memberi tahu kita jika ada kode yang kurang baik atau berpotensi error

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Ignore folder 'dist' - folder ini berisi hasil build yang tidak perlu di-check
  globalIgnores(['dist']),
  
  {
    // files: file-file mana yang akan di-check oleh ESLint
    files: ['**/*.{js,jsx}'], // Semua file .js dan .jsx
    
    // extends: gunakan aturan dari config yang sudah ada
    extends: [
      js.configs.recommended,                    // Aturan dasar JavaScript yang direkomendasikan
      reactHooks.configs['recommended-latest'],  // Aturan untuk React Hooks
      reactRefresh.configs.vite,                 // Aturan untuk React Fast Refresh di Vite
    ],
    
    // languageOptions: pengaturan bahasa JavaScript yang digunakan
    languageOptions: {
      ecmaVersion: 2020,        // Versi JavaScript (ES2020)
      globals: globals.browser, // Gunakan global variables untuk browser (window, document, dll)
      
      parserOptions: {
        ecmaVersion: 'latest',           // Gunakan versi JavaScript terbaru
        ecmaFeatures: { jsx: true },     // Aktifkan support untuk JSX (syntax React)
        sourceType: 'module',            // Kita pakai ES Modules (import/export)
      },
    },
    
    // rules: aturan custom kita
    rules: {
      // 'no-unused-vars': jangan error jika ada variabel yang tidak dipakai
      // TAPI, abaikan variabel yang namanya huruf besar atau underscore (biasanya konstanta)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
