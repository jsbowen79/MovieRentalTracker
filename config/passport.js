const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const { getDB } = require('../models/mongoDb');
console.log(process.env.PORT);
console.log('Callback URL:', 'http://localhost:5000/auth/github/callback');
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = await getDB();

        let user = await db.collection('users').findOne({
          githubId: profile.id,
        });

        if (!user) {
          const newUser = {
            githubId: profile.id,
            username: profile.username,
            profileUrl: profile.profileUrl,
            role: 'user',
          };

          const result = await db.collection('users').insertOne(newUser);
          console.log('user saved in database:', user);
          user = {
            _id: result.insertedId,
            ...newUser,
          };
        }
        console.log('User after authentication: ', user);

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = await getDB();
    const { ObjectId } = require('mongodb');

    const user = await db.collection('users').findOne({
      _id: new ObjectId(id),
    });

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
