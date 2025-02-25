// src/components/RepoSearch.jsx
import React, { useState } from "react";
import { searchRepositories } from "../services/githubApi";
import RepoTabs from "./RepoTabs";


function RepoSearch({ onSearchResults }) {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para determinar si un repositorio es activo (actualizado en los últimos 4 meses)
  const isActiveRepo = (repo) => {
    if (repo.description) {
      const desc = repo.description.toLowerCase();
      if (desc.includes("obsolete") || desc.includes("deprecated")) {
        return false; // Se considera inactivo por estar marcado en la descripción
      }
    }
    const updatedAt = new Date(repo.updated_at);
    const now = new Date();
    const fourMonthsAgo = new Date();
    fourMonthsAgo.setMonth(now.getMonth() - 4);
    return updatedAt >= fourMonthsAgo;
  };
  

  const handleSearch = () => {
    if (!query) return; // Evitar búsqueda vacía
    setLoading(true);
    setError(null);
    searchRepositories(query)
      .then((response) => {
        // Se espera que la respuesta tenga 'items'
        const results = response.data.items;
      
        setRepos(results);
        if (onSearchResults) {
          onSearchResults(results);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al buscar repositorios");
        setLoading(false);
      });
  };


 // Callback para recibir resultados de las pestañas "Temas destacados"
 const handleTabResults = (results) => {
  setRepos(results);
  if (onSearchResults) onSearchResults(results);
};
   

  return (
    <div className="repo-search">
      <h2>Buscar Repositorios por "nombre de usuario" o "nombre de repositorio" </h2>
      <div className="search-form">
        <input
          type="text"
          placeholder="Ejemplo: usuario/nombre_repositorio"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {/* Pestañas de temas destacados */}
      <RepoTabs onTabResults={handleTabResults} />
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {repos.length > 0 && (
        <div className="repo-results">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estrellas</th>
                <th>Fecha de Creacion</th>
                <th>Enlace</th>
                <th>Ultima Actualización</th>
                <th>Visibilidad</th>
              </tr>
            </thead>
            <tbody>
            {repos.map((repo) => {
                const active = isActiveRepo(repo.updated_at);
                return (
                  <tr key={repo.id} className={active ? "active-card" : "inactive-card"}>
                    <td>{repo.name}</td>
                    <td>{repo.description}</td>
                    <td>{repo.stargazers_count}</td>
                    <td>{repo.created_at}</td>
                    <td>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver en GitHub
                      </a>
                    </td>
                    <td>{repo.updated_at}</td>
                    <td>{repo.visibility}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RepoSearch;
