// src/components/TopRepositories.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaGithub } from 'react-icons/fa';

function TopRepositories() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Ejemplo de búsqueda: repositorios con al menos 1 estrella, ordenados por estrellas, limitado a 10
    axios.get('https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&per_page=10')
      .then(response => {
        setRepos(response.data.items);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Error al obtener los top repositorios');
        setLoading(false);
      });
  }, []);

  return (
    <section className="top-repositories">
      <h2>Top 10 Repositorios de GitHub</h2>
      {loading && <p className="loading">Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && repos.length === 0 && (
        <p className="no-data">No se encontraron repositorios.</p>
      )}
      {!loading && !error && repos.length > 0 && (
        <table className="repos-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th><FaStar /> Estrellas</th>
              <th>Última Actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {repos.map(repo => (
              <tr key={repo.id}>
                <td>{repo.full_name}</td>
                <td>{repo.stargazers_count}</td>
                <td>{new Date(repo.updated_at).toLocaleDateString()}</td>
                <td>
                  <a 
                    className="github-link"
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FaGithub /> Ver en GitHub
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default TopRepositories;
