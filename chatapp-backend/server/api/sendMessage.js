const express = require('express');
const db = require('../db'); // Import the database connection

const router = express.Router();

router.post('/api/messages', (req, res) => {
  const { user, text } = req.body;

  // Insert message into the database
  db.run(`INSERT INTO messages (user, text) VALUES (?, ?)`, [user, text], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error saving message' });
    }
    res.status(201).json({ id: this.lastID, user, text });
  });
});

module.exports = router;