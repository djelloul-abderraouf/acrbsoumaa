const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  telephone: { type: String, required: true },
  dateNaissance: { type: Date, required: true },
  categorie: { type: String, required: true },
  fraisInscription: { 
    type: Map, 
    of: Number, // Montant pour chaque mois (exemple : { "janvier": 50, "février": 0 })
    default: { 
      "janvier": 0, "février": 0, "mars": 0, "avril": 0, 
      "mai": 0, "juin": 0, "juillet": 0, "août": 0, 
      "septembre": 0, "octobre": 0, "novembre": 0, "décembre": 0
    }
  },
  fraisVetement: { type: Number, default: 0 }, // Montant total des frais de vêtements
});

module.exports = mongoose.model('Player', PlayerSchema);
