const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { ObjectId } = require('mongodb');

const { getDB } = require('../models/mongoDb');

console.log('PORT:', process.env.PORT);
console.log('Callback URL:', process.env.GITHUB_CALLBACK_URL);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
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

          console.log('New user saved to database:', newUser);

          user = {
            _id: result.insertedId,
            ...newUser,
          };
        }

        console.log('User after authentication:', user);

        return done(null, user);
      } catch (error) {
        console.error('GitHub authentication error:', error);
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

    const user = await db.collection('users').findOne({
      _id: new ObjectId(id),
    });

    done(null, user);
  } catch (err) {
    console.error('Deserialize user error:', err);
    done(err, null);
  }
});

module.exports = passport;
