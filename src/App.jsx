// src/App.jsx

import { useState, useEffect } from "react";
//import { fetchNews } from "./services/newsApilocal";
//import ini hanya dipakai saat kita menggunakan API key di env.local
import { getTopHeadlines, searchNews } from "./services/newsApilocal";
import Navbar from "./components/Navbar";
import SearchForm from "./components/SearchForm";
import Pagination from "./components/Pagination";
import ArticleCard from "./components/ArticleCard";
import SkeletonCard from "./components/SkeletonCard";
import Footer from "./components/Footer";
import "./index.css";

const getInitialFavorites = () => {
  const savedFavorites = localStorage.getItem("favorites");
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

function App() {
  // === STATE ===

  // State untuk data dari API
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  // State untuk UI & Kontrol API
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk parameter query (Fitur Wajib)
  const [category, setCategory] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; //dipergunakan ketika mamakai data berita yang difetch dari mockNewsData.json agar tampilan pagination tetap ada
  // const pageSize = 12; dipergunakan ketika mamakai data berita yang difetch API dari env.local
  // State untuk Fitur Ekstra (Bookmark)
  const [favorites, setFavorites] = useState(getInitialFavorites);

  // === EFEK (useEffect) ===

  // Efek untuk mengambil data berita saat parameter query berubah
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const getArticles = async () => {
      try {
        let data;

        if (searchTerm || selectedDate) {
          data = await searchNews(
            searchTerm,
            selectedDate,
            currentPage,
            pageSize // <-- Tambahkan ini
          );
        } else {
          data = await getTopHeadlines(
            category,
            currentPage,
            pageSize // <-- Tambahkan ini
          );
        }

        setArticles(data.articles);
        setTotalResults(data.totalResults);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, [category, searchTerm, selectedDate, currentPage]);

  // === HANDLER ===

  // Handler untuk Navbar
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSearchTerm("");
    setSelectedDate("");
    setCurrentPage(1);
  };

  // Handler untuk SearchForm
  const handleSearch = ({ term, date }) => {
    setSearchTerm(term);
    setSelectedDate(date);
    setCurrentPage(1);
    if (term) {
      setCategory("");
    } else if (!term && !date) {
      setCategory("general");
    }
  };

  // Handler untuk Pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handler untuk Fitur Ekstra (Bookmark)
  const handleToggleFavorite = (article) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.url === article.url);

    if (isAlreadyFavorite) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.url !== article.url)
      );
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, article]);
    }
  };

  // Helper untuk mengecek apakah artikel ada di favorit
  const isArticleFavorite = (articleUrl) => {
    return favorites.some((fav) => fav.url === articleUrl);
  };

  // === PENYEMPURNAAN TAMPILAN (Judul Dinamis) ===
  const pageTitle = searchTerm
    ? `Search results for "${searchTerm}"`
    : `Top Headlines in ${
        category.charAt(0).toUpperCase() + category.slice(1)
      }`;

  // === RENDER ===

  return (
    <div className="app">
      <Navbar
        currentCategory={category}
        onCategoryChange={handleCategoryChange}
      />

      <main className="container">
        <SearchForm onSearch={handleSearch} />

        <div className="mt-4">
          {/* Fitur Ekstra (Loading Skeleton) */}
          {isLoading && (
            <div className="articles-grid">
              {[...Array(9)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          )}

          {/* Fitur Ekstra (Error Handling Baik) */}
          {error && (
            <div className="error-message">
              <h2 className="error-title">Oops! Something went wrong.</h2>
              <p>{error}</p>
              <p className="error-description">
                Please check your API key or network connection.
              </p>
            </div>
          )}

          {/* Tampilan Hasil (Jika tidak loading DAN tidak error) */}
          {!isLoading && !error && (
            <>
              {/* PENYEMPURNAAN TAMPILAN: Judul Dinamis */}
              <h2 className="page-title">{pageTitle}</h2>

              <div className="articles-grid">
                {articles.length > 0 ? (
                  articles.map((article, index) => (
                    // Fitur Ekstra (Menggunakan ArticleCard)
                    <ArticleCard
                      key={article.url || index}
                      article={article}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={isArticleFavorite(article.url)}
                    />
                  ))
                ) : (
                  <p className="empty-state">
                    No articles found. Try adjusting your search or category.
                  </p>
                )}
              </div>

              <Pagination
                currentPage={currentPage}
                totalResults={totalResults}
                pageSize={pageSize}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
