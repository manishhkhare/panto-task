// server/strategies/github.js
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User'); // MongoDB User model

passport.use(new GitHubStrategy({
  clientID:process.env.GITHUB_CLIENT_ID,
  clientSecret:process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/login/github/callback',
}, (accessToken, refreshToken, profile, done) => {
  
  const email = (profile.emails && profile.emails.length > 0) ? profile.emails[0].value : null;

  User.findOneAndUpdate({ githubId: profile.id }, { $set: { githubId: profile.id, name: profile.displayName, email: profile.emails[0].value } }, { upsert: true, new: true })
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
