import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/logoImage.png";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("nome");
    navigate("/loginpage");
  };

  return (
    <nav className="navbar-container">

      {/* Logo */}
      <div className="navbar-left">
        <img src={logoImage} alt="MindCare Logo" className="navbar-logo" />
      </div>

      {/* Menu padrão (web) */}
      <div className="navbar-right">
        <button onClick={() => navigate("/")} className="navbar-btn">
          Home
        </button>

        <button
          onClick={() => navigate("/dashboard-cliente")}
          className="navbar-btn"
        >
          Dashboard
        </button>

        <button onClick={handleLogout} className="navbar-btn logout-btn">
          Sair
        </button>
      </div>
    </nav>
  );
};
