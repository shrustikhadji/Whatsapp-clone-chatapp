const express = require('express');
const db = require('../db'); // Import the database connection

const router = express.Router();

router.get('/api/messages', (req, res) => {
  const { user } = req.query;

  // Fetch messages for the user
  db.all(`SELECT * FROM messages WHERE user = ? ORDER BY timestamp ASC`, [user], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching messages' });
    }
    res.status(200).json(rows);
  });
});

module.exports = router;