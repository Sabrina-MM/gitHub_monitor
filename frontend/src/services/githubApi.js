// src/services/githubApi.js
import axios from "axios";

/**
 * Realiza una búsqueda de repositorios en GitHub.
 * @param {string} query - El término de búsqueda.
 * @returns {Promise} - Promesa con la respuesta de la API.
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://mi-backend.onrender.com";

export const searchRepositories = (query) => {
  if (!query) {
    return Promise.reject(new Error("El término de búsqueda es obligatorio"));
  }

  return axios.get(`${API_BASE_URL}/api/search_repositories?query=${query}`);
};
