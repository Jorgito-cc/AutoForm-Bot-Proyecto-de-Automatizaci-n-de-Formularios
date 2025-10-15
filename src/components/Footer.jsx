import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        💻 Desarrollado por{" "}
        <a
          href="https://github.com/Jorgito-cc/AutoForm-Bot---Backend-de-Automatizaci-n-con-Playwright"
          target="_blank"
          rel="noopener noreferrer"
          className="author-link"
        >
          Jorge Choque Calle
        </a>{" "}
        — 2025
      </p>
    </footer>
  );
}
