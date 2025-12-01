import React from "react";
import { Link } from "react-router-dom";
import "./SidebarCliente.css";

interface Props {
  nomeUsuario: string;
}

const SidebarCliente: React.FC<Props> = ({ nomeUsuario }) => {
  return (
    <aside className="sidebar-cliente">
      <div className="logo-area">
        <span className="logo">🧠 MindCare</span>
        <p className="bemvindo">Olá, {nomeUsuario}</p>
      </div>

      <nav className="menu">
        <Link to="/consultas">Minhas Consultas</Link>
        <Link to="/calendarioprofissional">Marcar Consulta</Link>        
      </nav>

      <div className="footer-sidebar">
        <Link className="sair" to="/loginpage">
          Sair
        </Link>
      </div>
    </aside>
  );
};

export default SidebarCliente;
