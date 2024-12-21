// server/strategies/gitlab.js
const passport = require('passport');
const GitLabStrategy = require('passport-gitlab').Strategy;

passport.use(new GitLabStrategy({
  clientID: "0ab9a5cc7f804528b228e5bfd3590f4f2c9d7015dfde52f07ad01eada198222f",
  clientSecret: "gloas-420b5ebb26a0fb6205945dc010d1ff3b3b943695bd42a5b4eecccde565ed1a11",
  callbackURL:'http://localhost:5000/login/gitlab/callback',
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));


// console.log('GITLAB_CLIENT_ID:', process.env. clientID);
// console.log('GITLAB_CLIENT_SECRET:', process.env.clientSecret);
// console.log('GITLAB_CALLBACK_URL:', process.env.callbackURL);
