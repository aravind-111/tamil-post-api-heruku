const { ObjectId } = require('mongodb');

const mongo = require('../shared/mongo');

const { postSchema } = require('../shared/schema');
const { putSchema } = require('../shared/schema');

const { validate } = require('joi');

const service = {
  // Get post updated by certain user
  async get(req, res) {
    try {
      const data = await mongo.posts
        .find({ userId: req.user.userId })
        .toArray();
      res.send(data);
    } catch (err) {
      console.log('error in GET - ', err);
      res.sendStatus(500);
    }
  },
  async post(req, res) {
    try {
      // Request Body Validation
      let { value, error } = await postSchema.validate(req.body);
      if (error)
        return res.status(400).send({
          error: 'Validation Failed',
          message: error.details[0].message,
        });

      // Insert POst
      const data = await mongo.posts.insertOne({
        ...req.body,
        userId: req.user.userId,
      });
      console.log(data);
      res.send({ ...req.body, userId: req.user.userId });
    } catch (err) {
      console.log('error in POST - ', err);
      res.sendStatus(500);
    }
  },
  async put(req, res) {
    try {
      // Request Body Validation
      let { value, error } = await putSchema.validate(req.body);
      if (error)
        return res.status(400).send({
          error: 'Validation Failed',
          message: error.details[0].message,
        });

      const data = await mongo.posts.findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        { $set: { ...value } },
        { returnNewDocument: true }
      );
      res.send({ ...value });
    } catch (err) {
      console.log('error in PUT - ', err);
      res.sendStatus(500);
    }
  },
  async delete(req, res) {
    try {
      const post = await mongo.posts.findOne({
        _id: ObjectId(req.params.id),
        userId: req.user.userId,
      });

      if (!post)
        return res
          .status(401)
          .send({ error: 'not allowed to access this post' });

      await mongo.posts.deleteOne({ _id: ObjectId(req.params.id) });
      res.end();
    } catch (err) {
      console.log('error in POST - ', err);
      res.sendStatus(500);
    }
  },
};

module.exports = service;
