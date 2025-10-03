const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/email/activity', async (req, res) => {
  try {
    const apiKey = process.env.SMTP2GO_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'SMTP2GO_API_KEY is not set' });
    }

    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - 1);

    const payload = {
      start_date: start.toISOString().slice(0, 10),
      end_date: end.toISOString().slice(0, 10),
      limit: 100
    };

    let resp = await axios.post('https://api.smtp2go.com/v3/activity/search', payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Smtp2go-Api-Key': apiKey,
        'accept': 'application/json'
      }
    });

    let events = resp?.data?.data?.events || [];
    if (!Array.isArray(events) || events.length === 0) {
      // Fallback: fetch latest without date filter
      const fallbackPayload = { limit: 100 };
      resp = await axios.post('https://api.smtp2go.com/v3/activity/search', fallbackPayload, {
        headers: {
          'Content-Type': 'application/json',
          'X-Smtp2go-Api-Key': apiKey,
          'accept': 'application/json'
        }
      });
      events = resp?.data?.data?.events || [];
    }
    const sorted = events
      .sort((a,b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
      .map(e => ({
        date: e.date,
        event: e.event,
        subject: e.subject,
        from: e.from || e.sender || e.sender_full,
        to: e.to || e.recipient,
        smtp_response: e.smtp_response || ''
      }));

    res.json({ items: sorted });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(502).json({ error: 'Failed to fetch email activity', detail: err?.response?.data || err.message });
  }
});

module.exports = router;


