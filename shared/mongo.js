const mongo = require('mongodb'); // we can also object destructre {MongoClient}

const MongoClient = mongo.MongoClient;

const client = new MongoClient(process.env.MONGODB_URL);

const mongodb = {
  // complete collections
  db: null,

  //   Connection specific to collection
  posts: null,
  users: null,

  async connect() {
    // Connecting to Database
    await client.connect();
    console.log('Connected to Database - ', process.env.MONGODB_URL);

    // Selecting the Database
    this.db = client.db(process.env.MONGODB_NAME);
    console.log('Selected the Database - ', process.env.MONGODB_NAME);

    // Initialize Collections
    this.posts = this.db.collection('posts');
    this.users = this.db.collection('users');
  },
};

module.exports = mongodb;
