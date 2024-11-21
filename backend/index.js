const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

// Database connection configuration
const db = mysql.createConnection({
  host: 'db', // Docker Compose service name
  user: 'user',
  password: 'userpassword',
  database: 'client_data'
});

// Test database connection
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Handle form submissions
app.post('/submit', (req, res) => {
  const { hobby, email } = req.body;

  if (!hobby || !email) {
    return res.status(400).json({ status: 'error', message: 'Missing hobby or email' });
  }

  const query = 'INSERT INTO clients (hobby, email) VALUES (?, ?)';
  db.query(query, [hobby, email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: 'error', message: err.message });
    }

    res.status(201).json({ status: 'success', message: 'Data saved successfully' });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
