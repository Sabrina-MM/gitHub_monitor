// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className="header">
      <div className="logo">GitWatch</div>
      <nav>
        <ul className="nav-list">
          <li><a href="/">Inicio</a></li>
          <li>
          <Link to="/repositories">Repositorios</Link>
        </li>
          <li><Link to="/estadisticas">Estadísticas</Link></li>
          {/*<li><a href="/acerca-de">Acerca de</a></li>*/}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
