import React from "react";

const categories = ["General", "Technology", "Business", "Sports"];

function Navbar({ currentCategory, onCategoryChange }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">News Portal-184</h1>
        <ul className="navbar-menu">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => onCategoryChange(category.toLowerCase())}
                className={`navbar-button ${
                  currentCategory === category.toLowerCase() ? "active" : ""
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;


