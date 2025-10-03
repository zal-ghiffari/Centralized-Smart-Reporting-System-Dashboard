const express = require('express');
const router = express.Router();
const axios = require('axios');

const WEBHOOK_URL = 'https://workflow.zazal-ghiffari.my.id/webhook-test/e6491d24-db18-40ac-aa40-727cf94c318d';

router.post('/playground/submit', async (req, res) => {
  try {
    const { name, anonymous, reportText } = req.body || {};
    if (!reportText || !reportText.trim()) {
      return res.status(400).json({ error: 'Report text is required' });
    }

    const fromField = anonymous ? 'anonymous' : (name && name.trim() ? name.trim() : 'anonymous');
    const payload = {
      content: reportText,
      language: 'id',
      from_field: fromField,
      type: 'Form'
    };

    const resp = await axios.post(WEBHOOK_URL, payload, { headers: { 'Content-Type': 'application/json' } });
    res.json({ ok: true, status: resp.status, data: resp.data });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(502).json({ ok: false, error: 'Failed to forward', detail: err?.response?.data || err.message });
  }
});

module.exports = router;


