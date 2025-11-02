// src/services/newsApi.js

// 1. Ambil API Key dari environment variables
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

/**
 * Fungsi untuk mengambil berita dari NewsAPI
 *
 * @param {object} params - Objek parameter untuk query API
 * @param {string} params.query - Keyword pencarian (fitur wajib 2)
 * @param {string} params.category - Kategori berita (fitur wajib 1)
 * @param {string} params.date - Filter tanggal (fitur wajib 4)
 * @param {number} params.page - Halaman untuk pagination (fitur wajib 5)
 * @returns {Promise<object>} - Hasil dari API (termasuk articles dan totalResults)
 */
export const fetchNews = async ({ query, category, date, page }) => {
  try {
    // 2. Membuat URLSearchParams untuk mengelola parameter query
    const params = new URLSearchParams({
      apiKey: API_KEY,
      pageSize: 10, // Tentukan berapa artikel per halaman
    });

    // 3. Tambahkan page untuk pagination
    if (page) params.append("page", page);

    // 4. PERBAIKAN: Tentukan endpoint berdasarkan ada tidaknya query (search keyword)
    let endpoint;

    if (query) {
      // === CASE 1: ADA SEARCH KEYWORD → Gunakan /everything ===
      endpoint = "/everything";

      // Parameter untuk /everything
      params.append("q", query); // Search keyword
      params.append("language", "en"); // WAJIB: language atau sources

      // Date filter HANYA bekerja di /everything
      if (date) {
        params.append("from", date);
      }

      // Opsional: Sort by relevancy untuk hasil search yang lebih baik
      params.append("sortBy", "relevancy");
    } else {
      // === CASE 2: TIDAK ADA SEARCH KEYWORD → Gunakan /top-headlines ===
      endpoint = "/top-headlines";

      // Parameter untuk /top-headlines
      params.append("country", "us"); // WAJIB: country, category, atau sources

      if (category) {
        params.append("category", category);
      }

      // PENTING: /top-headlines TIDAK MENDUKUNG parameter 'from' (date filter)
      // Jika user mencoba filter tanggal tanpa keyword, beri warning
      if (date) {
        console.warn(
          "⚠️ Date filter tidak tersedia untuk Top Headlines. " +
            "Gunakan search keyword untuk mengaktifkan filter tanggal."
        );
      }
    }

    // 5. Build URL lengkap
    const url = `${BASE_URL}${endpoint}?${params.toString()}`;

    console.log("Fetching URL:", url); // Untuk debugging

    // 6. Lakukan fetch data
    const response = await fetch(url);

    // 7. Error handling jika request gagal
    if (!response.ok) {
      const errorData = await response.json();

      // Berikan error message yang lebih spesifik
      if (response.status === 401) {
        throw new Error("Invalid API Key. Please check your News API key.");
      } else if (response.status === 429) {
        throw new Error("API rate limit exceeded. Please try again later.");
      } else {
        throw new Error(errorData.message || "Gagal mengambil data berita");
      }
    }

    // 8. Kembalikan data JSON
    const data = await response.json();

    // Validasi response
    if (data.status === "error") {
      throw new Error(data.message || "Unknown API error");
    }

    return data;
  } catch (error) {
    console.error("Error in fetchNews:", error);

    // Enhance error message untuk network errors
    if (
      error.message.includes("Failed to fetch") ||
      error.name === "TypeError"
    ) {
      throw new Error("Network error. Please check your internet connection.");
    }

    // Lempar error lagi agar bisa ditangkap oleh komponen yang memanggil
    throw error;
  }
};
