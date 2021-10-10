const express = require('express');
const route = express.Router();

const service = require('../services/users.services');

route.post('/register', service.register);
route.post('/login', service.login);

module.exports = route;
