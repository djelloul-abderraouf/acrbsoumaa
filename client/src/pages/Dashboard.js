import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/players/stats')
      .then(response => response.json())
      .then(data => {
        setStats(data);
        toast.success("Statistiques chargées avec succès !");
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques', error);
        toast.error("Erreur lors de la récupération des statistiques !");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Chargement des statistiques...</p>
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center my-5 text-danger">Impossible de charger les statistiques.</div>;
  }

  // Données pour les graphiques
  const playersByCategoryData = {
    labels: Object.keys(stats.playersByCategory),
    datasets: [
      {
        label: 'Nombre de joueurs',
        data: Object.values(stats.playersByCategory),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const totalAmountsByCategoryData = {
    labels: Object.keys(stats.totalAmounts.byCategory),
    datasets: [
      {
        label: 'Montant total (DA)',
        data: Object.values(stats.totalAmounts.byCategory),
        backgroundColor: ['#4BC0C0', '#FF9F40', '#9966FF'],
      },
    ],
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">📊 Dashboard</h2>

      {/* Statistiques globales */}
      <div className="row text-center mb-4">
        <div className="col-12 col-md-6 mb-3">
          <div className="p-4 bg-primary text-white rounded shadow">
            <h4>👥 Total joueurs</h4>
            <p className="display-6">{stats.totalPlayers}</p>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <div className="p-4 bg-success text-white rounded shadow">
            <h4>💰 Montant total toutes catégories (DA)</h4>
            <p className="display-6">{stats.totalAmounts.total.toLocaleString()} DA</p>
          </div>
        </div>
      </div>

      {/* Statistiques par catégorie */}
      <div className="row text-center mb-4">
        {Object.entries(stats.playersByCategory).map(([category, count]) => (
          <div key={category} className="col-12 col-sm-6 col-md-4 mb-3">
            <div className="p-4 bg-secondary text-white rounded shadow">
              <h4>📌 {category}</h4>
              <p className="display-6">{count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div className="row">
        <div className="col-12 col-md-6 mb-4">
          <h4 className="text-center">📈 Nombre de joueurs par catégorie</h4>
          <Pie data={playersByCategoryData} />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <h4 className="text-center">💵 Montants totaux par catégorie (DA)</h4>
          <Bar data={totalAmountsByCategoryData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
