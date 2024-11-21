const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');  // PostgreSQL client

const app = express();
app.use(bodyParser.json());

const dbConfig = {
  host: 'db',  // Docker Compose service name
  user: 'user',
  password: 'userpassword',
  database: 'client_data',
  port: 5432
};

const client = new Client(dbConfig);

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));

app.post('/submit', (req, res) => {
  const { hobby, email } = req.body;

  client.query('INSERT INTO clients (hobby, email) VALUES ($1, $2)', [hobby, email], (err, result) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    res.status(201).json({ status: 'success' });
  });
});

app.listen(5000, () => {
  console.log('Backend is running on port 5000');
});
