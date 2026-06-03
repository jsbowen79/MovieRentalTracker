const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const { getDB } = require('../models/mongoDb');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
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
          };

          const result = await db.collection('users').insertOne(newUser);

          user = {
            _id: result.insertedId,
            ...newUser,
          };
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
