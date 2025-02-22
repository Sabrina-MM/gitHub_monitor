// src/components/Estadisticas.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los elementos necesarios en Chart.js
Chart.register(ArcElement, Tooltip, Legend);

function Estadisticas() {
  const [stats, setStats] = useState({
    total: 0,
    activos: 0,
    inactivos: 0
  });
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('https://github-monitor-zrh3.onrender.com/api/repositories')
      .then(response => {
        const repos = response.data;
        const now = new Date();
        const fourMonthsAgo = new Date();
        fourMonthsAgo.setMonth(now.getMonth() - 4);

        let activos = 0;
        let inactivos = 0;

        repos.forEach(repo => {
          const updatedAt = new Date(repo.updated_at);
          if (updatedAt >= fourMonthsAgo) {
            activos++;
          } else {
            inactivos++;
          }
        });

        setStats({
          total: repos.length,
          activos,
          inactivos
        });

        setChartData({
          labels: ['Activos', 'Inactivos'],
          datasets: [
            {
              label: 'Repositorios',
              data: [activos, inactivos],
              backgroundColor: ['#36A2EB', '#FF6384'],
              hoverBackgroundColor: ['#36A2EB', '#FF6384']
            }
          ]
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching repositories:", err);
        setError('Error al obtener los repositorios');
        setLoading(false);
      });
  }, []);

  return (
    <section className="estadisticas">
      <h2>Estadísticas de Repositorios</h2>
      {loading && <p>Cargando datos...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <div className="resumen">
            <p>Total de repositorios: {stats.total}</p>
            <p>Activos: {stats.activos} ({((stats.activos/stats.total)*100 || 0).toFixed(2)}%)</p>
            <p>Inactivos: {stats.inactivos} ({((stats.inactivos/stats.total)*100 || 0).toFixed(2)}%)</p>
          </div>
          {chartData && (
            <div style={{ maxWidth: '500px', margin: 'auto' }}>
              <Pie data={chartData} />
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Estadisticas;
