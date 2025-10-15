// src/App.jsx
import React from "react";
import Header from "./components/Header";
import BotForm from "./components/BotForm";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <Header />
      <BotForm />
      <Footer />
    </div>
  );
}
