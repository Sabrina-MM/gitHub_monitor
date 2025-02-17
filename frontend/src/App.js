// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
//import Banner from './components/Banner';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RepoList from './components/RepoList';
import Footer from './components/Footer';
import Estadisticas from './components/Estadisticas';
import TopRepositories from './components/TopRepositories';

import './App.css'; // Importa el fichero global de estilos

function App() {
  return (
    <div className="app-container">
      <Header />
      
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/repositories" element={<RepoList />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/top-repositories" element={<TopRepositories />} />

          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
