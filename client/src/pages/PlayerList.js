

// import React, { useEffect, useState } from 'react';
// import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';
// import Badge from 'react-bootstrap/Badge';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import Spinner from 'react-bootstrap/Spinner';
// import { toast } from 'react-toastify';

// function PlayerList() {
//   const [players, setPlayers] = useState([]); 
//   const [filteredPlayers, setFilteredPlayers] = useState([]); 
//   const [searchTerm, setSearchTerm] = useState(""); 
//   const [categoryFilter, setCategoryFilter] = useState(""); 
//   const [selectedPlayer, setSelectedPlayer] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [editedPlayer, setEditedPlayer] = useState(null);
  

//   useEffect(() => {
//     fetch('http://localhost:5000/api/players/list')
//       .then(response => response.json())
//       .then(data => {
//         setPlayers(data);
//         setFilteredPlayers(data);
        
//       })
//       .catch(error => console.error('Erreur lors de la récupération des joueurs', error));
      
//   }, []);

//   useEffect(() => {
//     const filtered = players.filter(player => {
//       const matchesSearch =
//         player.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         player.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         player.telephone.includes(searchTerm);

//       const matchesCategory = categoryFilter
//         ? player.categorie === categoryFilter
//         : true;

//       return matchesSearch && matchesCategory;
//     });
//     setFilteredPlayers(filtered);
//   }, [searchTerm, categoryFilter, players]);

//   const handleShowDetails = (player) => {
//     setSelectedPlayer(player);
//     setEditedPlayer({ ...player });
//     setShowModal(true);
//   };

//   const handleFeeChange = (mois, montant) => {
//          setEditedPlayer(prevState => ({
//            ...prevState,
//            fraisInscription: { ...prevState.fraisInscription, [mois]: montant }
//          }));
//        };

//   const handleDeletePlayer = async (id) => {
//     if (window.confirm("Êtes-vous sûr de vouloir supprimer ce joueur ?")) {
//       try {
//         await fetch(`http://localhost:5000/api/players/delete/${id}`, {
//           method: 'DELETE',
//         });
//         setPlayers(players.filter(player => player._id !== id));
//         alert("Joueur supprimé avec succès !");
//       } catch (error) {
//         console.error("Erreur lors de la suppression du joueur", error);
//       }
//     }
//   };

//   const handleSaveChanges = async () => {
//     try {
//       await fetch(`http://localhost:5000/api/players/update/${editedPlayer._id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(editedPlayer)
//       });
//       setPlayers(players.map(player => (player._id === editedPlayer._id ? editedPlayer : player)));
//       alert("Modifications enregistrées !");
//       setShowModal(false);
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour des informations du joueur', error);
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="mb-4 text-center">Liste des joueurs</h2>

//       <div className="row mb-4">
//         <div className="col-12 col-md-6 mb-2">
//           <Form.Control
//             type="text"
//             placeholder="Rechercher par nom, prénom ou téléphone"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="col-12 col-md-4 mb-2">
//           <Form.Select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//           >
//             <option value="">Toutes les catégories</option>
//             <option value="2012/2013">2012/2013</option>
//             <option value="2014/2015">2014/2015</option>
//             <option value="2016/2017">2016/2017</option>
//           </Form.Select>
//         </div>
//         <div className="col-12 col-md-2 mb-2">
//           <Button variant="secondary" className="w-100" onClick={() => {
//             setSearchTerm("");
//             setCategoryFilter("");
//           }}>
//             Réinitialiser
//           </Button>
//         </div>
//       </div>

//       <div className="table-responsive">
//         <Table striped bordered hover responsive>
//           <thead className="bg-primary text-white">
//             <tr>
//               <th>Nom</th>
//               <th>Prénom</th>
//               <th>Catégorie</th>
//               <th>Téléphone</th>
//               {/* <th>Frais Vêtements (€)</th> */}
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredPlayers.map(player => (
//               <tr key={player._id}>
//                 <td>{player.nom}</td>
//                 <td>{player.prenom}</td>
//                 <td><Badge bg="secondary">{player.categorie}</Badge></td>
//                 <td>{player.telephone}</td>
//                 {/* <td>{player.fraisVetement} €</td> */}
//                 <td>
//                   <Button variant="info" size="sm" className="mb-1" onClick={() => handleShowDetails(player)}>
//                     Voir détails
//                   </Button>{' '}
//                   <Button variant="danger" size="sm" onClick={() => handleDeletePlayer(player._id)}>
//                     Supprimer
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Modifier le joueur</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {editedPlayer && (
//             <Form>
//               <Form.Group className="mb-3">
//                 <Form.Label>Nom</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="nom"
//                   value={editedPlayer.nom}
//                   onChange={(e) => setEditedPlayer({ ...editedPlayer, nom: e.target.value })}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Prénom</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="prenom"
//                   value={editedPlayer.prenom}
//                   onChange={(e) => setEditedPlayer({ ...editedPlayer, prenom: e.target.value })}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Téléphone</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="telephone"
//                   value={editedPlayer.telephone}
//                   onChange={(e) => setEditedPlayer({ ...editedPlayer, telephone: e.target.value })}
//                 />
//               </Form.Group>
//               <h6>Frais d'inscription :</h6>
//                <Table bordered size="sm">
//                  <thead>
//                    <tr>
//                      <th>Mois</th>
//                      <th>Montant (€)</th>
//                    </tr>
//                  </thead>
//                  <tbody>
//                    {Object.entries(editedPlayer.fraisInscription).map(([mois, montant]) => (
//                      <tr key={mois}>
//                        <td>{mois.toUpperCase()}</td>
//                        <td>
//                          <Form.Control
//                            type="number"
//                            value={montant}
//                            onChange={(e) => handleFeeChange(mois, parseFloat(e.target.value))}
//                          />
//                        </td>
//                      </tr>
//                    ))}
//                  </tbody>
//                </Table>

//               <h6>Frais de vêtements :</h6>
//               <Form.Group className="mb-3">
//                 <Form.Label>Montant total (€)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={editedPlayer.fraisVetement}
//                   onChange={(e) => setEditedPlayer({ ...editedPlayer, fraisVetement: parseFloat(e.target.value) })}
//                 />
//               </Form.Group>

//             </Form>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Fermer</Button>
//           <Button variant="primary" onClick={handleSaveChanges}>Enregistrer</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default PlayerList;


import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedPlayer, setEditedPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://acrbsoumaa.onrender.com/api/players/list')
      .then(response => response.json())
      .then(data => {
        setPlayers(data);
        setFilteredPlayers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des joueurs', error);
        toast.error("Erreur de connexion !");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = players.filter(player => {
      const matchesSearch =
        player.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.telephone.includes(searchTerm);

      const matchesCategory = categoryFilter
        ? player.categorie === categoryFilter
        : true;

      return matchesSearch && matchesCategory;
    });
    setFilteredPlayers(filtered);
  }, [searchTerm, categoryFilter, players]);

  const handleShowDetails = (player) => {
    setSelectedPlayer(player);
    setEditedPlayer({ ...player });
    setShowModal(true);
  };

  const handleFeeChange = (mois, montant) => {
    setEditedPlayer(prevState => ({
      ...prevState,
      fraisInscription: { ...prevState.fraisInscription, [mois]: montant }
    }));
  };

  const handleDeletePlayer = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce joueur ?")) {
      try {
        await fetch(`https://acrbsoumaa.onrender.com/api/players/delete/${id}`, {
          method: 'DELETE',
        });
        setPlayers(players.filter(player => player._id !== id));
        toast.success("Joueur supprimé avec succès !");
      } catch (error) {
        console.error("Erreur lors de la suppression du joueur", error);
        toast.error("Erreur lors de la suppression !");
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      await fetch(`https://acrbsoumaa.onrender.com/api/players/update/${editedPlayer._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedPlayer)
      });
      setPlayers(players.map(player => (player._id === editedPlayer._id ? editedPlayer : player)));
      toast.success("Modifications enregistrées !");
      setShowModal(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations du joueur', error);
      toast.error("Erreur lors de la mise à jour !");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4 text-center">Liste des joueurs</h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Chargement en cours...</p>
        </div>
      ) : (
        <>
          <div className="row mb-4">
            <div className="col-12 col-md-6 mb-2">
              <Form.Control
                type="text"
                placeholder="Rechercher par nom, prénom ou téléphone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-4 mb-2">
              <Form.Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Toutes les catégories</option>
                <option value="2012/2013">2012/2013</option>
                <option value="2014/2015">2014/2015</option>
                <option value="2016/2017">2016/2017</option>
              </Form.Select>
            </div>
            <div className="col-12 col-md-2 mb-2">
              <Button variant="secondary" className="w-100" onClick={() => {
                setSearchTerm("");
                setCategoryFilter("");
              }}>
                Réinitialiser
              </Button>
            </div>
          </div>

          <div className="table-responsive">
            <Table striped bordered hover responsive>
              <thead className="bg-primary text-white">
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Catégorie</th>
                  <th>Téléphone</th>
                  {/* <th>Frais Vêtements (€)</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.map(player => (
                  <tr key={player._id}>
                    <td>{player.nom}</td>
                    <td>{player.prenom}</td>
                    <td><Badge bg="secondary">{player.categorie}</Badge></td>
                    <td>{player.telephone}</td>
                    {/* <td>{player.fraisVetement} €</td> */}
                    <td>
                      <Button variant="info" size="sm" className="mb-1" onClick={() => handleShowDetails(player)}>
                        Voir détails
                      </Button>{' '}
                      <Button variant="danger" size="sm" onClick={() => handleDeletePlayer(player._id)}>
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}

<Modal show={showModal} onHide={() => setShowModal(false)} centered>
         <Modal.Header closeButton>
           <Modal.Title>Modifier le joueur</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           {editedPlayer && (
             <Form>
               <Form.Group className="mb-3">
                 <Form.Label>Nom</Form.Label>
                 <Form.Control
                   type="text"
                   name="nom"
                   value={editedPlayer.nom}
                   onChange={(e) => setEditedPlayer({ ...editedPlayer, nom: e.target.value })}
                 />
               </Form.Group>

               <Form.Group className="mb-3">
                 <Form.Label>Prénom</Form.Label>
                 <Form.Control
                   type="text"
                   name="prenom"
                   value={editedPlayer.prenom}
                   onChange={(e) => setEditedPlayer({ ...editedPlayer, prenom: e.target.value })}
                 />
               </Form.Group>

               <Form.Group className="mb-3">
                 <Form.Label>Téléphone</Form.Label>
                 <Form.Control
                   type="text"
                   name="telephone"
                   value={editedPlayer.telephone}
                   onChange={(e) => setEditedPlayer({ ...editedPlayer, telephone: e.target.value })}
                 />
               </Form.Group>
               <h6>Frais d'inscription :</h6>
                <Table bordered size="sm">
                  <thead>
                    <tr>
                      <th>Mois</th>
                      <th>Montant (DA)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(editedPlayer.fraisInscription).map(([mois, montant]) => (
                      <tr key={mois}>
                        <td>{mois.toUpperCase()}</td>
                        <td>
                          <Form.Control
                            type="number"
                            value={montant}
                            onChange={(e) => handleFeeChange(mois, parseFloat(e.target.value))}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

               <h6>Frais de vêtements :</h6>
               <Form.Group className="mb-3">
                 <Form.Label>Montant total (DA)</Form.Label>
                 <Form.Control
                   type="number"
                   value={editedPlayer.fraisVetement}
                   onChange={(e) => setEditedPlayer({ ...editedPlayer, fraisVetement: parseFloat(e.target.value) })}
                 />
              </Form.Group>

             </Form>
           )}
         </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Fermer</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Enregistrer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PlayerList;
