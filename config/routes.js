require('dotenv').load();

const axios = require('axios');
const db = require('../database/dbConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const generateToken = user => {
  const { username } = user;
  const payload = {
    username
  };
  const options = {
    expiresIn: '1h',
    jwtid: bcrypt.hashSync(username, 4)
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

function register(req, res) {
  const user = req.body;
  if (!user.password || !user.username) {
    res.status(400).json({ error: 'Username and Password are required!' });
  }
  user.password = bcrypt.hashSync(user.password, 12);
  db('users')
    .insert(user)
    .then(ids => res.status(201).json(generateToken(user)))
    .catch(err => res.status(500).json(err));
}

function login(req, res) {
  const creds = req.body;
  db('users')
    .where('username', creds.username)
    .first()
    .then(user =>
      user && bcrypt.compareSync(creds.password, user.password)
        ? res.json(generateToken(user))
        : res.status(401).json({ message: 'Invalid username or password!' })
    )
    .catch(err => res.status(500).json(err));
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' }
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
