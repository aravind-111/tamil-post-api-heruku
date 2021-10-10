const jwt = require('jsonwebtoken');

const middleware = {
  authCheck(req, res, next) {
    const token = req.headers['auth-token'];
    if (token) {
      try {
        req.user = jwt.verify(token, 'gu@$vi');
        console.log(req.user);
        next();
      } catch (err) {
        console.log('token doesnt match');
        res.sendStatus(401);
      }
    } else {
      console.log('token doesnt exist');
      res.sendStatus(401);
    }
  },
  logging(req, res, next) {
    console.log(
      `[${new Date()}] - ${req.user.userId} - ${req.url} - ${req.method}`
    );
    next();
  },
};

module.exports = middleware;
