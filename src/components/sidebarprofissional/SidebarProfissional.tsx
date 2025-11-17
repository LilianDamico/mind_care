// src/components/sidebarprofissional/SidebarProfissional.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./SidebarProfissional.css";

const SidebarProfissional: React.FC = () => {
  const nome = localStorage.getItem("userNome") || "Profissional";

  return (
    <aside className="sidebar-profissional">
      <div>
        <p className="bemvindo">Olá, {nome}</p>
      </div>

      <nav className="menu">
        <Link to="/calendarioprofissional">Minha Agenda</Link>
        <Link to="/prescricoes">Prescrições</Link>
        <Link to="/prontuarios">Prontuários</Link>
        <Link to="/consultas/profissional">Consultas Agendadas</Link>
      </nav>

      <div className="footer-sidebar">
        <Link
          className="sair"
          to="/"
          onClick={() => {
            localStorage.clear();
          }}
        >
          Sair
        </Link>
      </div>
    </aside>
  );
};

export default SidebarProfissional;
