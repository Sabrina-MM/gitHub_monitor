// src/components/RepoTabs.jsx
import React, { useState } from 'react';
import { searchRepositories } from '../services/githubApi';

function RepoTabs({ onTabResults }) {
  // Lista de temas o categorías
  const themes = ['UpCloudLtd', 'react', 'node', 'docker']; //'kubernetes', 
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTabClick = (theme) => {
    setActiveTab(theme);
    setLoading(true);
    setError(null);
    // Utilizamos el servicio para buscar repositorios por tema
    searchRepositories(theme)
      .then((response) => {
        // Llamamos al callback para enviar los resultados al componente padre (por ejemplo, RepoSearch o Dashboard)
        if (onTabResults) onTabResults(response.data.items);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error al buscar repositorios para ' + theme);
        setLoading(false);
      });
  };

  return (
    <div className="repo-tabs">
      <h3>Temas destacados</h3>
      <div className="tabs">
        {themes.map((theme) => (
          <button
            key={theme}
            className={`tab-button ${activeTab === theme ? 'active' : ''}`}
            onClick={() => handleTabClick(theme)}
          >
            {theme}
          </button>
        ))}
      </div>
      {loading && <p>Cargando repositorios...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default RepoTabs;
