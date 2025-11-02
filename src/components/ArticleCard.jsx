import React, { useState } from "react";

function ArticleCard({ article, onToggleFavorite, isFavorite }) {
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    onToggleFavorite(article);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Placeholder image dengan warna berbeda berdasarkan source
  const getPlaceholderImage = () => {
    const colors = [
      "4F46E5", // Indigo
      "7C3AED", // Violet
      "DB2777", // Pink
      "DC2626", // Red
      "EA580C", // Orange
      "0891B2", // Cyan
    ];

    // Hash sederhana dari source name untuk konsistensi warna
    const hash = article.source.name.split("").reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);

    const color = colors[hash % colors.length];
    const text = encodeURIComponent(article.source.name || "News");

    return `https://via.placeholder.com/400x200/${color}/FFFFFF?text=${text}`;
  };

  return (
    <div className="article-card">
      {/* Tombol Favorit yang Diperbarui (lebih modern) */}
      <button
        onClick={handleFavoriteClick}
        className={`favorite-button ${isFavorite ? "active" : ""}`}
        aria-label="Toggle Favorite"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="favorite-icon"
          fill={isFavorite ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </button>

      <div>
        {/* Gambar dengan error handling */}
        <img
          src={
            imageError || !article.urlToImage
              ? getPlaceholderImage()
              : article.urlToImage
          }
          alt={article.title}
          className="article-image"
          onError={handleImageError}
          loading="lazy"
        />
        <div className="article-content">
          <h3 className="article-title">{article.title}</h3>
          <p className="article-meta">
            {article.source.name} -{" "}
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="article-link"
      >
        Read more...
      </a>
    </div>
  );
}

export default ArticleCard;

