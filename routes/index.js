const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  get_reviews,
  post_login,
  post_signup,
  get_logout,
  post_reviews,
  get_reviews_by_id,
  put_reviews,
  delete_reviews,
  put_reviews_published,
  get_login_key,
} = require('../controllers/controllers');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({ test: 'working' });
});

router.get('/reviews', get_reviews);

router.post('/reviews', verifyToken, post_reviews);

router.get('/reviews/:id', get_reviews_by_id);

router.put('/reviews/:id', verifyToken, put_reviews);

router.put('/reviews/published/:id', verifyToken, put_reviews_published);

router.delete('/reviews/:id', verifyToken, delete_reviews);

router.get('/login', get_login_key);

router.post('/login', post_login);

router.post('/signup', post_signup);

router.get('/logout', get_logout);

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
