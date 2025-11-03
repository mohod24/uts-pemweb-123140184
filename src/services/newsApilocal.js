// Service untuk membaca data dari JSON lokal (mock data)

// Import data JSON yang sudah kita simpan
import newsData from "../../scripts/src/data/newsData.json";

// Validasi data saat load
if (!newsData || !newsData.articles) {
  console.error("newsData.json tidak valid atau kosong!");
  console.error(
    "Pastikan file src/data/newsData.json ada dan berisi articles array"
  );
}

// List kategori yang valid (untuk validasi)
const VALID_CATEGORIES = [
  "general",
  "business",
  "technology",
  "sports",
  "entertainment",
  "health",
  "science",
];

/**
 * Get top headlines dengan filter kategori
 * Fungsi ini meniru behavior dari News API getTopHeadlines
 */
export const getTopHeadlines = async (
  category = "",
  page = 1,
  pageSize = 12
) => {
  try {
    // Validasi input
    if (page < 1) {
      console.warn("Page tidak boleh < 1, diset ke 1");
      page = 1;
    }
    if (pageSize < 1 || pageSize > 100) {
      console.warn("PageSize tidak valid, diset ke 12");
      pageSize = 12;
    }

    // Simulasi delay (agar terasa seperti fetching API real)
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Validasi data exists
    if (!newsData.articles || newsData.articles.length === 0) {
      throw new Error("Data artikel tidak ditemukan di newsData.json");
    }

    let filteredArticles = [...newsData.articles];

    console.log("Total artikel di database:", filteredArticles.length);

    // ===== FILTER BERDASARKAN KATEGORI =====
    if (category) {
      // Validasi kategori
      if (!VALID_CATEGORIES.includes(category.toLowerCase())) {
        console.warn(
          `Kategori "${category}" tidak valid. Kategori valid:`,
          VALID_CATEGORIES
        );
      }

      filteredArticles = filteredArticles.filter(
        (article) =>
          article.category &&
          article.category.toLowerCase() === category.toLowerCase()
      );

      console.log(
        `Filter kategori "${category}":`,
        filteredArticles.length,
        "artikel"
      );

      // Warning jika tidak ada artikel
      if (filteredArticles.length === 0) {
        console.warn(`Tidak ada artikel untuk kategori "${category}"`);
      }
    }

    // ===== SORT BY DATE (NEWEST FIRST) =====
    filteredArticles.sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);

      // Handle invalid dates
      if (isNaN(dateA.getTime())) return 1;
      if (isNaN(dateB.getTime())) return -1;

      return dateB - dateA;
    });

    // ===== PAGINATION =====
    const totalResults = filteredArticles.length;
    const totalPages = Math.ceil(totalResults / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

    console.log(
      `Halaman ${page}/${totalPages}: ${paginatedArticles.length} artikel (Total: ${totalResults})`
    );

    // Warning jika page melebihi total
    if (page > totalPages && totalResults > 0) {
      console.warn(`Page ${page} melebihi total halaman (${totalPages})`);
    }

    // ===== RETURN DATA (Format sama dengan News API) =====
    return {
      status: "ok",
      totalResults: totalResults,
      articles: paginatedArticles,
      // Extra metadata (opsional, untuk debugging)
      _meta: {
        page: page,
        pageSize: pageSize,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.error("Error in getTopHeadlines:", error);
    console.error("Stack trace:", error.stack);
    throw new Error("Gagal memuat data berita. Coba refresh halaman.");
  }
};

/**
 * Search news dengan query dan date filter
 * Fungsi ini meniru behavior dari News API searchNews
 */
export const searchNews = async (
  query,
  fromDate = null,
  page = 1,
  pageSize = 12
) => {
  try {
    // Validasi input
    if (page < 1) {
      console.warn("Page tidak boleh < 1, diset ke 1");
      page = 1;
    }
    if (pageSize < 1 || pageSize > 100) {
      console.warn("PageSize tidak valid, diset ke 12");
      pageSize = 12;
    }

    // Simulasi delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Validasi data exists
    if (!newsData.articles || newsData.articles.length === 0) {
      throw new Error("Data artikel tidak ditemukan di newsData.json");
    }

    let filteredArticles = [...newsData.articles];

    console.log("Total artikel di database:", filteredArticles.length);

    // ===== FILTER BERDASARKAN SEARCH KEYWORD =====
    if (query && query.trim() !== "") {
      const searchLower = query.toLowerCase().trim();

      filteredArticles = filteredArticles.filter((article) => {
        // Cari di title, description, atau content
        const titleMatch = article.title?.toLowerCase().includes(searchLower);
        const descMatch = article.description
          ?.toLowerCase()
          .includes(searchLower);
        const contentMatch = article.content
          ?.toLowerCase()
          .includes(searchLower);

        return titleMatch || descMatch || contentMatch;
      });

      console.log(
        `Filter keyword "${query}":`,
        filteredArticles.length,
        "artikel"
      );

      // Warning jika tidak ada hasil
      if (filteredArticles.length === 0) {
        console.warn(`Tidak ada hasil untuk keyword "${query}"`);
      }
    }

    // ===== FILTER BERDASARKAN TANGGAL =====
    if (fromDate) {
      const fromDateTime = new Date(fromDate).getTime();

      // Validasi date
      if (isNaN(fromDateTime)) {
        console.warn(`Format tanggal tidak valid: "${fromDate}"`);
      } else {
        const beforeFilter = filteredArticles.length;

        filteredArticles = filteredArticles.filter((article) => {
          const articleDate = new Date(article.publishedAt).getTime();
          // Skip artikel dengan tanggal invalid
          if (isNaN(articleDate)) return false;
          return articleDate >= fromDateTime;
        });

        console.log(
          `Filter tanggal >= "${fromDate}":`,
          filteredArticles.length,
          "artikel (dari",
          beforeFilter,
          ")"
        );
      }
    }

    // ===== SORT BY DATE (NEWEST FIRST) =====
    filteredArticles.sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);

      // Handle invalid dates
      if (isNaN(dateA.getTime())) return 1;
      if (isNaN(dateB.getTime())) return -1;

      return dateB - dateA;
    });

    // ===== PAGINATION =====
    const totalResults = filteredArticles.length;
    const totalPages = Math.ceil(totalResults / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

    console.log(
      `Halaman ${page}/${totalPages}: ${paginatedArticles.length} artikel (Total: ${totalResults})`
    );

    // Warning jika page melebihi total
    if (page > totalPages && totalResults > 0) {
      console.warn(`Page ${page} melebihi total halaman (${totalPages})`);
    }

    // ===== RETURN DATA (Format sama dengan News API) =====
    return {
      status: "ok",
      totalResults: totalResults,
      articles: paginatedArticles,
      // Extra metadata (opsional)
      _meta: {
        page: page,
        pageSize: pageSize,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        query: query,
        fromDate: fromDate,
      },
    };
  } catch (error) {
    console.error("Error in searchNews:", error);
    console.error("Stack trace:", error.stack);
    throw new Error("Gagal memuat data berita. Coba refresh halaman.");
  }
};

// Export default (opsional)
export default { getTopHeadlines, searchNews };
