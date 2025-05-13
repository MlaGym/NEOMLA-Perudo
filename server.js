// Importazione delle dipendenze
const express = require('express');

const cors = require('cors');
// Inizializzazione di Express
const app = express();

// Configurazione per il parsing del corpo delle richieste
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configurazione CORS (per consentire le richieste cross-origin)
app.use(cors());



// Proteggi le rotte che richiedono l'autenticazione
app.use('/game', (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login'); // Se non autenticato, redirige al login
  }
  next(); // Se autenticato, continua
});

app.use('/lobby', (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login'); // Se non autenticato, redirige al login
  }
  next(); // Se autenticato, continua
});

// Rotte di base
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/main'); // Se autenticato, manda alla pagina principale
  }
  res.redirect('/login'); // Se non autenticato, manda al login
});

// Pagina principale (Home)
app.get('/main', (req, res) => {
  if (req.isAuthenticated()) {
    return res.sendFile(path.join(__dirname, 'public', 'main.html'));
  }
  res.redirect('/login');
});

// Pagina di login
app.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/main');
  }
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Pagina di registrazione
app.get('/register', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/main');
  }
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});
app.post('/chat', (req, res) => {
  const { message } = req.body;

  console.log('Messaggio ricevuto:', message);

  // Qui potresti salvare il messaggio in DB, inviarlo ad altri utenti, ecc.

  res.json({ reply: `Hai scritto: "${message}"` });
});
// Avvio del server sulla porta specificata
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
