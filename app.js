const cors = require('cors');

require('dotenv').config();
const express = require('express');

const mongo = require('./shared/mongo');
const jwt = require('jsonwebtoken');

const postRoutes = require('./routs/posts.routes');
const userRoutes = require('./routs/users.routes');
const { authCheck, logging } = require('./shared/middleware');

const app = express();
const PORT = '3001' || process.env.PORT;
(async () => {
  // IIFE is used, we can also use arrow or normal function
  try {
    // Connection to MongoDB
    await mongo.connect();

    // cors
    app.use(cors());

    // Middleware to Parse request body into JSON format
    app.use(express.json());

    // Routes

    app.use('/users', userRoutes);

    //  Auth Token Response
    app.use(authCheck);

    // Logging Middleware
    app.use(logging);

    app.use('/posts', postRoutes);

    // Server Start
    app.listen(PORT, () => console.log(`server running at port ${PORT}`));
  } catch (err) {
    console.log('Error in Connecting', err);
  }
})();
