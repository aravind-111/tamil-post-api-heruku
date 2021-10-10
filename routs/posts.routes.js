// const { ObjectId } = require('bson');
const express = require('express');
const route = express.Router();

const posts_service = require('../services/posts.services');

// Posts API Routes for url
route.get('/', posts_service.get);

route.post('/', posts_service.post);

route.put('/:id', posts_service.put);

route.delete('/:id', posts_service.delete);

module.exports = route;
