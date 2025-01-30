import React, { useState } from 'react';

function AddPlayer() {
  const [player, setPlayer] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    dateNaissance: '',
    categorie: '2012/2013', // Valeur par défaut
    fraisInscription: {
      janvier: false, février: false, mars: false, avril: false,
      mai: false, juin: false, juillet: false, août: false,
      septembre: false, octobre: false, novembre: false, décembre: false
    },
    fraisVetement: false,
    montantPaye: 0
  });

  const handleChange = (e) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/players/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(player)
      });
      const data = await response.json();
      console.log(data);
      alert('Joueur ajouté avec succès !');
    } catch (error) {
      console.error("Erreur lors de l'ajout du joueur", error);
    }
  };

  return (
    <div className="container">
      <h2>Ajouter un joueur</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input type="text" name="nom" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Prénom</label>
          <input type="text" name="prenom" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Téléphone</label>
          <input type="text" name="telephone" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Date de naissance</label>
          <input type="date" name="dateNaissance" className="form-control" onChange={handleChange} required />
        </div>
        
        {/* Sélection de la catégorie */}
        <div className="mb-3">
          <label className="form-label">Catégorie</label>
          <select name="categorie" className="form-select" onChange={handleChange} value={player.categorie} required>
            <option value="2012/2013">2012/2013</option>
            <option value="2014/2015">2014/2015</option>
            <option value="2016/2017">2016/2017</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Ajouter</button>
      </form>
    </div>
  );
}

export default AddPlayer;
