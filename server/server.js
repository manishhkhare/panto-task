// server/server.js
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
var cors = require('cors')

// Load environment variables
dotenv.config();

// GitHub, GitLab, Bitbucket Strategies
require('./strategies/github');
require('./strategies/gitlab');
require('./strategies/bitbucket');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',  // Frontend React app URL
  methods: ['GET', 'POST'],
  credentials: true,  // Allow cookies to be sent (if needed for sessions)
}));

console.log('GITLAB_CLIENT_ID:', process.env.clientID);
console.log('GITLAB_CLIENT_SECRET:', process.env.clientSecret);
console.log('GITLAB_CALLBACK_URL:', process.env.callbackURL);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Middleware for sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/login/github', passport.authenticate('github'));
app.get('/login/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => { res.redirect('/profile'); }
);

app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json({ user: req.user }); // Send user info as JSON
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on http://localhost:5000');
});
