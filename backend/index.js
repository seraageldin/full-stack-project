const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());

// PostgreSQL database configuration

const dbConfig = {
  host: 'db',  // The service name for your PostgreSQL container (as defined in Docker Compose)
  user: 'postgres',  // Or another username you have set up
  password: 'password',  // The password for the user
  database: 'client_data',  // The correct database name
  port: 5432  // Default PostgreSQL port
};


app.post('/submit', async (req, res) => {
  const { hobby, email } = req.body;
  console.log('Received data:', { hobby, email }); // Log received data
});



  const client = new Client(dbConfig);
  await client.connect();

  try {
    await client.query('INSERT INTO clients (hobby, email) VALUES ($1, $2)', [hobby, email]);
    res.status(201).json({ status: 'success' });
  } catch (error) {
    console.error('Error inserting data into database', error);
    res.status(500).json({ status: 'error', message: error.message });
  } finally {
    await client.end();
  }
});
