// src/components/SearchForm.jsx (IMPROVED VERSION)

import React, { useState, useEffect } from "react";

// --- FITUR EKSTRA (localStorage) ---
// Helper function untuk mengambil data riwayat dari localStorage
const getInitialHistory = () => {
  const savedHistory = localStorage.getItem("searchHistory");
  return savedHistory ? JSON.parse(savedHistory) : [];
};

/**
 * Komponen Form untuk Pencarian dan Filter Tanggal
 * @param {object} props
 * @param {function} props.onSearch - Fungsi untuk memicu pencarian di App.jsx
 */
function SearchForm({ onSearch }) {
  // State internal untuk input
  const [inputTerm, setInputTerm] = useState("");
  const [inputDate, setInputDate] = useState("");

  // --- FITUR EKSTRA (State) ---
  // State untuk menyimpan riwayat pencarian
  const [history, setHistory] = useState(getInitialHistory);

  // --- FITUR EKSTRA (Save Effect) ---
  // Gunakan useEffect untuk menyimpan 'history' ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }, [history]);

  // Menangani submit form
  const handleSubmit = (event) => {
    event.preventDefault(); // Mencegah reload halaman
    const term = inputTerm.trim();

    // Panggil fungsi onSearch dari App.jsx
    onSearch({ term: term, date: inputDate });

    // --- FITUR EKSTRA (Update History) ---
    // Tambahkan ke riwayat HANYA jika ada kata kunci
    if (term) {
      // Buat riwayat baru, pindahkan 'term' ke depan jika sudah ada
      const newHistory = [term, ...history.filter((item) => item !== term)];
      // Batasi riwayat hanya 5 item terakhir dan update state
      setHistory(newHistory.slice(0, 5));
    }
  };

  // Menangani reset/clear filter
  const handleClear = () => {
    setInputTerm("");
    setInputDate("");
    onSearch({ term: "", date: "" }); // Kirim data kosong untuk me-reset
  };

  // --- FITUR EKSTRA (Click History Item) ---
  const handleHistoryClick = (term) => {
    setInputTerm(term);
    // Langsung picu pencarian saat item riwayat diklik
    onSearch({ term: term, date: inputDate });

    // Perbarui juga urutan riwayat
    const newHistory = [term, ...history.filter((item) => item !== term)];
    setHistory(newHistory.slice(0, 5));
  };

  // --- FITUR EKSTRA (Clear History) ---
  const clearHistory = () => {
    setHistory([]);
    // localStorage akan otomatis ter-update oleh useEffect
  };

  return (
    // Kita bungkus form dan riwayat dalam satu card
    <div className="search-card">
      <form onSubmit={handleSubmit} className="search-form">
        {/* Input Pencarian (Fitur Wajib 2) */}
        <div className="form-group">
          <label htmlFor="searchTerm" className="form-label">
            Search by Keyword
          </label>
          <input
            type="text"
            id="searchTerm"
            value={inputTerm}
            onChange={(e) => setInputTerm(e.target.value)}
            placeholder="e.g., React, Business..."
            className="form-input"
          />
        </div>

        {/* Input Tanggal (Fitur Wajib 4) */}
        <div className="form-group">
          <label htmlFor="dateFilter" className="form-label">
            Filter by Date (From)
            {/* IMPROVED: Tambahkan helper text */}
            {!inputTerm && (
              <span className="date-helper-text">*Requires search keyword</span>
            )}
          </label>
          <input
            type="date"
            id="dateFilter"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            className="form-input"
            disabled={!inputTerm} // IMPROVED: Disable jika tidak ada keyword
          />
        </div>

        {/* Tombol Aksi */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-secondary"
          >
            Clear
          </button>
        </div>
      </form>

      {/* --- FITUR EKSTRA (Render History) --- */}
      {history.length > 0 && (
        <div className="history-section">
          <div className="history-header">
            <h4 className="history-title">Recent Searches:</h4>
            <button onClick={clearHistory} className="history-clear-btn">
              Clear History
            </button>
          </div>
          <div className="history-tags">
            {history.map((term) => (
              <button
                key={term}
                onClick={() => handleHistoryClick(term)}
                className="history-tag"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchForm;
