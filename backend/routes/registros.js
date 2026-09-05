const express = require('express');
const Registro = require('../models/Registro');

const router = express.Router();

function toApi(doc) {
  return {
    id: String(doc._id),
    label: doc.label,
    savedAt: doc.savedAt instanceof Date ? doc.savedAt.toISOString() : doc.savedAt,
    input: doc.input || {},
    result: doc.result || {}
  };
}

// GET /api/registros?limit=200 - lista os registros, mais recentes primeiro
router.get('/', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 200, 500);
    const registros = await Registro.find().sort({ savedAt: -1 }).limit(limit).lean();
    res.json(registros.map(toApi));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Não foi possível carregar os registros.' });
  }
});

// POST /api/registros - cria um novo registro
router.post('/', async (req, res) => {
  try {
    const { label, savedAt, input, result } = req.body || {};
    if (!label || typeof label !== 'string' || !label.trim()) {
      return res.status(400).json({ error: 'Campo "label" é obrigatório.' });
    }
    const doc = await Registro.create({
      label: label.trim(),
      savedAt: savedAt ? new Date(savedAt) : new Date(),
      input: input || {},
      result: result || {}
    });
    res.status(201).json(toApi(doc.toObject()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Não foi possível salvar o registro.' });
  }
});

// DELETE /api/registros/:id
router.delete('/:id', async (req, res) => {
  try {
    await Registro.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Não foi possível excluir o registro.' });
  }
});

module.exports = router;
