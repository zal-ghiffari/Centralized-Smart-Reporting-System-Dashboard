const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/units', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM unit_kerja ORDER BY id ASC');
    res.json({ items: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch units' });
  }
});

module.exports = router;


