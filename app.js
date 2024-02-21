const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route for user registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  database.registerUser(username, password, (error, userId) => {
    if (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ userId });
  });
});

// Route for user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  database.authenticateUser(username, password, (error, user) => {
    if (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.json({ message: 'Login successful', user });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
