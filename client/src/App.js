import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddPlayer from './pages/AddPlayer';
import PlayerList from './pages/PlayerList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './assets/logo.jpg'; // Assurez-vous d'avoir un logo dans /src/assets/

function App() {
  return (
    <div className="container mt-4">
      {/* Barre de navigation stylisée */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow rounded p-3 mb-4">
        <div className="container-fluid">
          {/* Logo + Nom du site */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="Logo" width="60" height="60"  />
            <span className="fw-bold text-white"></span>
          </Link>
          
          {/* Bouton de menu sur mobile */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Liens de navigation */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold px-3" to="/">🏠 Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold px-3" to="/add">➕ Ajouter un joueur</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold px-3" to="/list">📋 Liste des joueurs</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenu des pages */}
      <div className="bg-light p-4 shadow rounded">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddPlayer />} />
          <Route path="/list" element={<PlayerList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
