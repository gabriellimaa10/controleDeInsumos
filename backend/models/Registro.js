const mongoose = require('mongoose');

// Espelha o que a calculadora (index.html) já monta no navegador —
// ver currentInputSnapshot() e lastResult no front-end.
const InputSchema = new mongoose.Schema({
  pSolo: Number,
  textura: String,
  dataLaudo: String,
  distAgua: Number,
  cultura: String,
  area: Number,
  declive: String,
  tipoDejeto: String,
  teorP2O5: Number,
  disponivel: Number
}, { _id: false });

const ResultSchema = new mongoose.Schema({
  level: String,
  doseP2O5Ha: Number,
  doseManureHa: Number,
  doseManureTotal: Number,
  manureUnit: String,
  cropLabel: String,
  clayLabel: String,
  slopeLabel: String
}, { _id: false });

const RegistroSchema = new mongoose.Schema({
  label: { type: String, required: true, trim: true },
  savedAt: { type: Date, required: true, default: Date.now },
  input: { type: InputSchema, default: () => ({}) },
  result: { type: ResultSchema, default: () => ({}) }
}, { timestamps: true });

module.exports = mongoose.model('Registro', RegistroSchema);
