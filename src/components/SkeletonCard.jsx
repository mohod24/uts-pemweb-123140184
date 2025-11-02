import React from "react";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      {/* Gambar Palsu */}
      <div className="skeleton-image"></div>

      {/* Judul Palsu */}
      <div className="skeleton-title"></div>

      {/* Teks Palsu */}
      <div className="skeleton-text"></div>

      {/* Link Palsu */}
      <div className="skeleton-link"></div>
    </div>
  );
}

export default SkeletonCard;

