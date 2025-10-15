import React from "react";
import "../styles/Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">
          AutoForm <span>Bot 🤖</span>
        </h1>
        <p className="subtitle">
          Automatiza envíos de Google Forms con estilo y precisión ⚙️
        </p>
      </div>
    </header>
  );
}
