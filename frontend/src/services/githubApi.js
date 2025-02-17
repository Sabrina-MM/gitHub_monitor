// src/services/githubApi.js
import axios from "axios";

/**
 * Realiza una búsqueda de repositorios en GitHub.
 * @param {string} query - El término de búsqueda.
 * @returns {Promise} - Promesa con la respuesta de la API.
 */
export const searchRepositories = (query) => {
  if (!query) {
    return Promise.reject(new Error("El término de búsqueda es obligatorio"));
  }

  return axios.get(`http://localhost:5000/api/search_repositories?query=${query}`);
};
