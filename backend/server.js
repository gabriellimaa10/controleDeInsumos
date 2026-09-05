require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const registrosRouter = require('./routes/registros');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json({ limit: '256kb' }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, mongoConnected: mongoose.connection.readyState === 1 });
});

app.use('/api/registros', registrosRouter);

// handler de erro genérico (por último)
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err);
  res.status(500).json({ error: 'Erro interno.' });
});

async function start() {
  if (!MONGODB_URI) {
    console.error(
      'Defina a variável de ambiente MONGODB_URI antes de iniciar ' +
      '(ex.: a connection string do seu cluster MongoDB Atlas). Veja .env.example.'
    );
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado ao MongoDB.');
  } catch (err) {
    console.error('Falha ao conectar no MongoDB:', err.message);
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
  });
}

start();
