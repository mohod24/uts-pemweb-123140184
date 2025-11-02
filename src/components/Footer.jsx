import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} News Portal-184.
            mohdmusyaffa.123140184@student.itera.ac.id
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
