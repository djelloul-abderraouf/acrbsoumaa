

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const playerRoutes = require('./routes/playerRoutes'); // Importer les routes


const app = express();

// Middleware
app.use(express.json());
app.use(cors());


require('dotenv').config(); // Charger les variables d'environnement
// Connexion à MongoDB
const mongoURI = process.env.MONGO_URI;
console.log('URI MongoDB :', mongoURI);


mongoose.connect(mongoURI, {
 useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));



// Démarrage du serveur
const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

// Routes
app.use('/api/players', playerRoutes);
