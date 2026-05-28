const express = require('express');
const app = express();
const { getDB } = require('./models/mongoDb.js');
const errorHandler = require('./errors/errorHandler.js');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger-output.json');
const routes = require('./routes/index.js');

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Movie Rental Tracker Server is working!');
});

//Routes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/', routes);
//Start Server

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
