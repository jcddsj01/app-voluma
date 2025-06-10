const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado ao MongoDB Atlas!'))
.catch(err => console.error('Erro ao conectar ao MongoDB Atlas:', err));

// Rotas
const livrosRoutes = require('./routes/livros');
app.use('/livros', livrosRoutes);

// Inicialização
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
