const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/embed-url', async (req, res) => {
  try {
    const siteUrl = process.env.METABASE_SITE_URL;
    const secretKey = process.env.METABASE_SECRET_KEY;
    const dashboardId = Number(process.env.METABASE_DASHBOARD_ID || '0');

    if (!siteUrl || !secretKey || !dashboardId) {
      return res.status(400).json({ error: 'Metabase env is not configured' });
    }

    const payload = {
      resource: { dashboard: dashboardId },
      params: {},
      exp: Math.round(Date.now() / 1000) + 10 * 60,
    };
    const token = jwt.sign(payload, secretKey);
    const iframeUrl = `${siteUrl}/embed/dashboard/${token}#theme=transparent&bordered=false&titled=false`;
    res.json({ url: iframeUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate embed URL' });
  }
});

module.exports = router;


