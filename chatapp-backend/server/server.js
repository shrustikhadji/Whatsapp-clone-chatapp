const express = require('express');
const bodyParser = require('body-parser');
const sendMessage = require('./api/sendMessage');
const getMessages = require('./api/getMessages');

const app = express();
const port = 3000; // Change as needed

app.use(bodyParser.json());
app.use(sendMessage);
app.use(getMessages);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});