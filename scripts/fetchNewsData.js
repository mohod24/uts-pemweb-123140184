import axios from "axios";
import fs from "fs";

const API_KEY = "3d6e64e02e8b40539f2f71be076fea0c";
const BASE_URL = "https://newsapi.org/v2";

// Fungsi untuk fetch dari berbagai kategori
async function fetchAllNewsData() {
  const categories = [
    "general",
    "business",
    "technology",
    "sports",
    "entertainment",
    "health",
    "science",
  ];
  const allArticles = [];

  try {
    console.log("🔄 Fetching news data...");

    // 1. Fetch top headlines dari setiap kategori
    for (const category of categories) {
      console.log(`📰 Fetching ${category}...`);

      const response = await axios.get(`${BASE_URL}/top-headlines`, {
        params: {
          apiKey: API_KEY,
          country: "us",
          category: category,
          pageSize: 15, // 15 artikel per kategori
        },
      });

      if (response.data.articles) {
        // Tambahkan kategori ke setiap artikel
        const articlesWithCategory = response.data.articles.map((article) => ({
          ...article,
          category: category,
        }));
        allArticles.push(...articlesWithCategory);
      }

      // Delay untuk avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // 2. Fetch beberapa artikel umum untuk search
    console.log("📰 Fetching general articles...");
    const generalResponse = await axios.get(`${BASE_URL}/everything`, {
      params: {
        apiKey: API_KEY,
        q: "news",
        language: "en",
        sortBy: "publishedAt",
        pageSize: 30,
      },
    });

    if (generalResponse.data.articles) {
      allArticles.push(...generalResponse.data.articles);
    }

    // 3. Remove duplicates berdasarkan URL
    const uniqueArticles = Array.from(
      new Map(allArticles.map((article) => [article.url, article])).values()
    );

    // 4. Simpan ke JSON
    const newsData = {
      status: "ok",
      totalResults: uniqueArticles.length,
      articles: uniqueArticles,
      generatedAt: new Date().toISOString(),
    };

    // Simpan file
    fs.writeFileSync(
      "./src/data/newsData.json",
      JSON.stringify(newsData, null, 2)
    );

    console.log(
      `✅ Success! Saved ${uniqueArticles.length} articles to newsData.json`
    );
    return newsData;
  } catch (error) {
    console.error("❌ Error fetching news:", error.message);
    throw error;
  }
}

// Jalankan fungsi
fetchAllNewsData();
