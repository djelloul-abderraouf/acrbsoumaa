const express = require('express');
const Player = require('../models/Player'); // Importation du modèle

const router = express.Router();

// 📌 Route pour ajouter un joueur
router.post('/add', async (req, res) => {
  try {
    const { nom, prenom, telephone, dateNaissance, categorie, fraisInscription, fraisVetement } = req.body;

    const newPlayer = new Player({
      nom,
      prenom,
      telephone,
      dateNaissance,
      categorie,
      fraisInscription,
      fraisVetement,
    });

    await newPlayer.save();
    res.status(201).json({ message: 'Joueur ajouté avec succès', joueur: newPlayer });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du joueur', error: err.message });
  }
});

// 📌 Route pour récupérer la liste des joueurs
router.get('/list', async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des joueurs', error: err.message });
  }
});

// 📌 Route pour modifier un joueur
router.put('/update/:id', async (req, res) => {
  try {
    const playerId = req.params.id;
    const updatedData = req.body;

    const updatedPlayer = await Player.findByIdAndUpdate(playerId, updatedData, { new: true });
    if (!updatedPlayer) {
      return res.status(404).json({ message: 'Joueur non trouvé' });
    }

    res.status(200).json({ message: 'Joueur mis à jour avec succès', joueur: updatedPlayer });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du joueur', error: err.message });
  }
});



// 📌 Route pour mettre à jour les frais d'inscription d'un joueur
router.put('/update-fees/:id', async (req, res) => {
  try {
    const { mois, status } = req.body; // mois = "janvier", status = true/false
    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.status(404).json({ message: "Joueur non trouvé" });
    }

    player.fraisInscription.set(mois, status);
    await player.save();

    res.status(200).json({ message: `Frais de ${mois} mis à jour`, joueur: player });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour des frais", error: err.message });
  }
});

// 📌 Route pour mettre à jour les frais de vêtements
router.put('/update-clothing/:id', async (req, res) => {
  try {
    const { status } = req.body; // true ou false
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      { fraisVetement: status },
      { new: true }
    );

    if (!player) {
      return res.status(404).json({ message: "Joueur non trouvé" });
    }

    res.status(200).json({ message: "Frais de vêtements mis à jour", joueur: player });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour des frais de vêtements", error: err.message });
  }
});

// 📌 Mettre à jour les montants des paiements
router.put('/update-payment/:id', async (req, res) => {
  try {
    const { fraisInscription, fraisVetement } = req.body; // Récupère les nouveaux montants
    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.status(404).json({ message: "Joueur non trouvé" });
    }

    if (fraisInscription) {
      player.fraisInscription = { ...player.fraisInscription, ...fraisInscription };
    }
    if (fraisVetement !== undefined) {
      player.fraisVetement = fraisVetement;
    }

    await player.save();
    res.status(200).json({ message: "Paiements mis à jour", joueur: player });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour des paiements", error: err.message });
  }
});

// 📌 Supprimer un joueur
router.delete('/delete/:id', async (req, res) => {
  try {
    const playerId = req.params.id;
    const deletedPlayer = await Player.findByIdAndDelete(playerId);

    if (!deletedPlayer) {
      return res.status(404).json({ message: "Joueur non trouvé" });
    }

    res.status(200).json({ message: "Joueur supprimé avec succès", joueur: deletedPlayer });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression du joueur", error: err.message });
  }
});


// 📌 Récupérer les statistiques pour le Dashboard
router.get('/stats', async (req, res) => {
  try {
    const players = await Player.find();

    // Nombre total de joueurs
    const totalPlayers = players.length;

    // Nombre de joueurs par catégorie
    const playersByCategory = players.reduce((acc, player) => {
      acc[player.categorie] = (acc[player.categorie] || 0) + 1;
      return acc;
    }, {});

    // Calcul des montants totaux (frais d'inscription et frais de vêtements)
    const totalAmounts = players.reduce((acc, player) => {
      // Vérifier que fraisInscription est bien un objet et non une Map
      const fraisInscription = player.fraisInscription instanceof Map 
        ? Object.fromEntries(player.fraisInscription) 
        : player.fraisInscription;

      // Somme des frais d'inscription pour tous les mois
      const totalInscription = Object.values(fraisInscription).reduce((sum, amount) => sum + (amount || 0), 0);

      // Vérifier les frais de vêtements
      const totalClothing = player.fraisVetement || 0;

      // Ajouter au total général
      acc.total += totalInscription + totalClothing;

      // Ajouter au total par catégorie
      acc.byCategory[player.categorie] = (acc.byCategory[player.categorie] || 0) + totalInscription + totalClothing;

      return acc;
    }, { total: 0, byCategory: {} });

    res.status(200).json({
      totalPlayers,
      playersByCategory,
      totalAmounts,
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des statistiques", error: err.message });
  }
});




module.exports = router;
