const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDb = require('./config/db');
const movie = require('./routes/movie');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const corsHandler = require('./middleware/cors');

dotenv.config({ path: './config/config.env' });
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(corsHandler);
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/movies', movie);
app.use(errorHandler);

//run server
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.blue.bold
  );
});

//stop server when error occured
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error:${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
