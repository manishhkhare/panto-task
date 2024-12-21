const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const axios = require('axios');
 // Load environment variables

// Validate environment variables
// if (!process.env.BITBUCKET_CLIENT_ID || !process.env.BITBUCKET_CLIENT_SECRET || !process.env.BITBUCKET_CALLBACK_URL) {
//   throw new Error('Missing required environment variables: BITBUCKET_CLIENT_ID, BITBUCKET_CLIENT_SECRET, or BITBUCKET_CALLBACK_URL');
// }

// Configure the Bitbucket OAuth2 strategy
passport.use('bitbucket', new OAuth2Strategy({
  authorizationURL:'https://bitbucket.org/site/oauth2/authorize',
  tokenURL: 'https://bitbucket.org/site/oauth2/access_token',
  clientID: "xHBRZgv3pkZJc69ry6",
  clientSecret:"XHFSL3gQCLHwHuBW9HvR2DG9SFRSBrRs",
  callbackURL: 'http://localhost:5000/login/bitbucket/callback',
  scope: 'account email', // Add required scopes
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Access Token:', accessToken);

    // Fetch user profile from Bitbucket API
    const { data: userProfile } = await axios.get('https://api.bitbucket.org/2.0/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('Bitbucket user profile:', userProfile);

    const user = {
      id: userProfile.uuid,
      username: userProfile.username,
      displayName: userProfile.display_name,
    };

    return done(null, user);
  } catch (err) {
    console.error('Error fetching Bitbucket profile:', err);
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  // Fetch user by ID logic here
  done(null, { id });
});
