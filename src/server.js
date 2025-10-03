require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

// app.use('/api/analytics', require('./routes/analytics')); // removed per request
app.use('/api', require('./routes/embed'));
app.use('/api', require('./routes/playground'));
app.use('/api', require('./routes/units'));
app.use('/api', require('./routes/email'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'dashboard.html'));
});

app.get('/playground', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'playground.html'));
});

app.get('/workflow', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'workflow.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});


