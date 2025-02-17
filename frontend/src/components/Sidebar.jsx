// src/components/Sidebar.jsx
import React from 'react';
import Banner from './Banner';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Filtros</h3>
      <ul>
      <li>
          <Link to="/top-repositories">Top Repositorios</Link>
        </li>
        <li>
          <Link to="/repositories?filter=activos">Activos</Link>
        </li>
        <li>
          <Link to="/repositories?filter=inactivos">Inactivos</Link>
        </li>
        <li>
          <Link to="/repositories">Todos</Link>
        </li>
        {/*<li><Link to="/estadisticas">Estadísticas</Link></li>*/}
        <Banner /> 



      </ul>
    </aside>
  );
}

export default Sidebar;
