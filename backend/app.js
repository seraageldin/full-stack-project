const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

// Create a connection pool
const pool = mysql.createPool({
    host: 'db', // Docker Compose service name
    user: 'user',
    password: 'userpassword',
    database: 'client_data',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// POST endpoint to handle client data submission
app.post('/submit', (req, res) => {
    const { hobby, email } = req.body;

    if (!hobby || !email) {
        return res.status(400).json({ status: 'error', message: 'Hobby and email are required' });
    }

    const query = 'INSERT INTO clients (hobby, email) VALUES (?, ?)';
    
    pool.execute(query, [hobby, email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ status: 'error', message: 'Database operation failed' });
        }

        res.status(201).json({ status: 'success', message: 'Data saved successfully!' });
    });
});

// Start the server
app.listen(5000, () => {
    console.log('Backend running on http://0.0.0.0:5000');
});
