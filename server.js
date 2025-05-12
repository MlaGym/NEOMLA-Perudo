const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();//gor mongodb

const app = express();
const server = http.createServer(app);

// Abilita CORS per localhost e Render
app.use(cors());
const path = require('path');
const porturi = process.env.PORT;
const urirender = process.env.RENDER_URI;

// Serve file statici dalla cartella 'public'
app.use(express.static(path.join(__dirname,'public')));
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:'+porturi,                // per sviluppo locale
      urirender    // per produzione su Render
    ],
    methods: ['GET', 'POST']
  }
});

// Rotta test per controllo HTTP
app.get('/', (req, res) => {
  //correttamente è aggiungere la cartella 'public'
  res.sendFile(path.join(__dirname, 'public','index.html'));
});

// Socket.io
//versione testing
io.on('connection', (socket) => {
  console.log('🟢 Utente connesso');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // invia a tutti i client
  });

  socket.on('disconnect', () => {
    console.log('🔴 Utente disconnesso');
  });
});

// Porta dinamica per Render o 3000 in locale
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Server in ascolto su porta ${PORT}`);
});

