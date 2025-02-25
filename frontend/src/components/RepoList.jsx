// src/components/RepoList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function RepoList() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Leer el parámetro "filter" de la URL. Si no se especifica, se asume "todos".
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'todos';

  // Función para obtener todos los repositorios del backend
  const fetchRepositories = () => {
    setLoading(true);
    setError(null);
    axios.get('https://github-monitor-zrh3.onrender.com/api/repositories')
      .then(response => {
        setRepos(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al obtener los repositorios');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

    // Función para filtrar repositorios que contengan "obsolete" o "deprecated" en la descripción.
    const filterObsolete = (repo) => {
      if (!repo.description) return true;
      const desc = repo.description.toLowerCase();
      return !(desc.includes("obsolete") || desc.includes("deprecated"));
    };
  
    // Aplicar el filtrado por descripción a todos los repositorios
    let processedRepos = repos.filter(filterObsolete);

  // Se define el criterio de actividad:
  // - Activos: actualizados en los últimos 4 meses.
  // - Inactivos: actualizados hace más de 4 meses.
  const now = new Date();
  const fourMonthsAgo = new Date();
  fourMonthsAgo.setMonth(now.getMonth() - 4);

  let filteredRepos = repos;
  if (filter === 'activos') {
    filteredRepos = repos.filter(repo => new Date(repo.updated_at) >= fourMonthsAgo);
  } else if (filter === 'inactivos') {
    filteredRepos = repos.filter(repo => new Date(repo.updated_at) < fourMonthsAgo);
  } else if (filter === 'mas-recientes') {
   // Ordenar descendente por fecha de actualización
   filteredRepos = [...processedRepos].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }

  return (
    <section className="repo-list">
      <h2>Listado de Repositorios {filter !== 'todos' ? `(${filter})` : ''}</h2>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && filteredRepos.length === 0 && (
        <p>No se encontraron repositorios para el filtro seleccionado.</p>
      )}
      {filteredRepos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Última Actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredRepos.map((repo) => (
              <tr key={repo.repo_id}>
                <td>{repo.name}</td>
                <td>{repo.updated_at}</td>
                <td>
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Ver en GitHub
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

export default RepoList;
