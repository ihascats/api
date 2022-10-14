const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  get_reviews,
  post_login,
  post_signup,
} = require('../controllers/controllers');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (res.locals.currentUser) {
    res.send(res.locals.currentUser);
  } else {
    res.send({ test: 'working' });
  }
});

router.get('/reviews', get_reviews);

router.post('/login', post_login);

router.post('/signup', post_signup);

function signToken(payload) {
  return jwt.sign(payload, process.env.JWTSECRET);
}

function verifyToken(req, res, next) {
  const token = req.headers.Authorization || req.headers.authorization || '';
  if (!token) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  jwt.verify(token, process.env.JWTSECRET, (err, authData) => {
    if (err) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    req.authData = authData;
    next();
  });
}

module.exports = router;
