require('dotenv').config();

const express = require('express');
const app = express();

const { getDB } = require('./models/mongoDb.js');
const errorHandler = require('./errors/errorHandler.js');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger-output.json');
const routes = require('./routes/index.js');
const session = require('express-session');
const passport = require('./config/passport');
const MongoStore = require('connect-mongo').default;
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// Required when behind Render's proxy
app.set('trust proxy', 1);

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'super-secret-key',
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),

    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Root Route
app.get('/', (req, res) => {
  res.send('Movie Rental Tracker Server is working!');
});

// Temporary Debug Route
app.get('/me', (req, res) => {
  res.json({
    authenticated:
      typeof req.isAuthenticated === 'function' ? req.isAuthenticated() : false,
    user: req.user || null,
    sessionID: req.sessionID,
  });
});

// Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// Routes
app.use('/', routes);

// Error Handler
app.use(errorHandler);

// Start Server
async function startServer() {
  console.log('starting server:');

  try {
    await getDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();
