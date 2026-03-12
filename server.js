const { log } = console;
const express = require('express');
const path = require('path');
const bp = require('body-parser');
const app = express();

const PORT = process.env.PORT || 7000;

const friendsArray = require('./app/data/friends.json');

const questions = [
  'Do you like dogs?',
  'Do you like mexican food?',
  'Do you like reading books?',
  'Do you like camping?',
  'Do you like art?',
  'Do you like dancing?',
  'Do you like cats?',
  'Do you like music?',
  'Do you like the beach?',
  'Do you like hiking?',
];

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bp.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Home page — render index.ejs with current user count
app.get('/', (req, res) => {
  res.render('index', { count: friendsArray.length });
});

// Survey page — render survey.ejs with questions array
app.get('/survey', (req, res) => {
  res.render('survey', { questions });
});

// Match result page — render match.ejs with name & photo from query string
app.get('/match', (req, res) => {
  const { name, photo } = req.query;
  res.render('match', { name, photo });
});

// API — GET all friends (kept for reference / debugging)
app.get('/api/friendsArray', (req, res) => {
  res.json(friendsArray);
});

// API — POST survey, find match, redirect to /match page
app.post('/api/friendsArray', (req, res) => {
  const newUser = req.body;
  const scores = newUser.scores.map(Number);

  const newTotal = scores.reduce((a, b) => a + b, 0);

  let bestMatch = null;
  let lowestDiff = Infinity;

  friendsArray.forEach(friend => {
    const friendTotal = friend.scores.reduce((a, b) => a + b, 0);
    const diff = Math.abs(friendTotal - newTotal);
    if (diff < lowestDiff) {
      lowestDiff = diff;
      bestMatch = friend;
    }
  });

  friendsArray.push({ name: newUser.name, photo: newUser.photo, scores });

  res.redirect(`/match?name=${encodeURIComponent(bestMatch.name)}&photo=${encodeURIComponent(bestMatch.photo)}`);
});

app.listen(PORT, () => {
  log(`Server running on PORT: http://localhost:${PORT}`);
});