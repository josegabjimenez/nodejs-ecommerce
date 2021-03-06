const { config } = require('./config');
const express = require('express');
const app = express();
const PORT = config.port; //? PORT
const routerApi = require('./routes'); //? Router

const {
  logInternalError,
  errorHandler,
  boomErrorHandler,
  sequelizeErrorHandler,
} = require('./middlewares/error.handler'); //? Error handle middleware

const { authApiKey } = require('./middlewares/auth.handler');

const cors = require('cors');
// const whitelist = ['http://127.0.0.1:5500/'];
// const options = {
//   origin: (origin, cb) => {
//     if (whitelist.includes(origin)) {
//       cb(null, true);
//     } else {
//       cb(new Error('You cannot access'));
//     }
//   },
// };

// Middleware5500
app.use(express.json()); // Parse data into JSON
app.use(cors()); // Allow Cross-Origin
require('./utils/auth');

// Initial route
app.get('/', authApiKey, (req, res) => {
  res.send('Hello world!');
});

// Router
routerApi(app);
app.use(logInternalError); // Log errors
app.use(boomErrorHandler); // Boom error handler
app.use(sequelizeErrorHandler); // Sequelize error handler
app.use(errorHandler); // Error handler

// Listen
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
