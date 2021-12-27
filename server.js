const express = require('express');
const app = express();
const PORT = 3001;
const routerApi = require('./routes');
const {
  logError,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/errorHandler');

// Middleware
app.use(express.json());

// Initial route
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Router
routerApi(app);
app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

// Listen
app.listen(PORT, () => {
  console.log('Server running on: http://localhost:3001');
});
