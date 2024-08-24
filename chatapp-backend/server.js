const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // SQLite database file
});

// Define Message model
const Message = sequelize.define('Message', {
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync database and create table if it doesn't exist
sequelize.sync()
  .then(() => console.log('Database & tables created!'))
  .catch(err => console.error('Error creating database:', err));

// API endpoint to fetch messages for a specific user
app.get('/api/messages', async (req, res) => {
  const { user } = req.query;
  try {
    const messages = await Message.findAll({ where: { user } });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// API endpoint to save a new message
app.post('/api/messages', async (req, res) => {
  const { user, text } = req.body;
  try {
    const message = await Message.create({ user, text });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: 'Failed to save message' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});