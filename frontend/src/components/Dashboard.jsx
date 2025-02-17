// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import RepoSearch from './RepoSearch';

function Dashboard() {
  const [searchResults, setSearchResults] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);

  // Esta función se pasará a RepoSearch y se llamará cuando se obtengan los resultados
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  // Cada vez que searchResults cambie, se recalculan los totales
  useEffect(() => {
    const now = new Date();
    const fourMonthsAgo = new Date();
    fourMonthsAgo.setMonth(now.getMonth() - 4);

    let active = 0;
    let inactive = 0;
    searchResults.forEach(repo => {
      const updatedAt = new Date(repo.updated_at);
      if (updatedAt >= fourMonthsAgo) {
        active++;
      } else {
        inactive++;
      }
    });
    setActiveCount(active);
    setInactiveCount(inactive);
  }, [searchResults]);

  return (
    <section className="dashboard">
      {/* Se pasa el callback al componente de búsqueda */}
      <RepoSearch onSearchResults={handleSearchResults} />
      <h2>Resumen de Actividad</h2>
      <div className="cards">
        <div className="card active-card">
          <h3>Repositorios Activos</h3>
          <p>{activeCount}</p>
        </div>
        <div className="card inactive-card">
          <h3>Repositorios Inactivos</h3>
          <p>{inactiveCount}</p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
