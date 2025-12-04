import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/logoImage.png";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  // 👉 estado que controla o menu mobile
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/loginpage");
  };

  return (
    <>
      <nav className="navbar-container">

        {/* Botão hamburguer */}
        <button className="navbar-hamburger" onClick={toggleSidebar}>
          ☰
        </button>

        <div className="navbar-left">
          <img src={logoImage} alt="MindCare Logo" className="navbar-logo" />
        </div>

        {/* Menu desktop */}
        <div className="navbar-right">
          <button onClick={() => navigate("/")} className="navbar-btn">Home</button>
          <button onClick={() => navigate("/dashboard-cliente")} className="navbar-btn">Dashboard</button>
          <button onClick={handleLogout} className="navbar-btn logout-btn">Sair</button>
        </div>
      </nav>

      {/* -------------------------
          MENU MOBILE / DRAWER
      -------------------------- */}
      <div className={`mobile-sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>×</button>

        <button onClick={() => navigate("/")} className="mobile-link">Home</button>
        <button onClick={() => navigate("/dashboard-cliente")} className="mobile-link">Dashboard</button>
        <button onClick={handleLogout} className="mobile-link logout">Sair</button>
      </div>

      {/* overlay escurecendo o fundo */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
    </>
  );
};
