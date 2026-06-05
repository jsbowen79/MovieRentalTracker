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

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'super-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Movie Rental Tracker Server is working!');
});

//Routes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/', routes);

app.use(errorHandler);
//Start Server

app.use(errorHandler);

async function startServer() {
  console.log('starting server: ');
  try {
    await getDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
