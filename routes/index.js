const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  get_reviews,
  post_login,
  post_signup,
  post_reviews,
  get_reviews_by_id,
  put_reviews,
  delete_reviews,
  put_reviews_published,
  get_login_key,
  signupValidate,
  get_reviews_all,
  get_login_failed,
} = require('../controllers/controllers');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(
    'Game Review Api\n* marks admin specific requests\n\nGET [ /reviews ] : retrieve a list of all review ids\n*POST [ /reviews ] : create new post\n\nGET [ /reviews/:id ] : retrieve id specified review info\n*PUT [ /reviews/:id ] : update id specified review\n*DELETE [ /reviews/:id ] : delete id specified review\n\n*PUT [ /reviews/published/:id ]: update review published status\n\n*GET [ /login ] : get login token\n*POST [ /login ] : send login info\n*POST [ /signup ] : create new admin account\n*GET [ /logout ] : self explanatory',
  );
});

router.get('/reviews', get_reviews);

router.post('/reviews', verifyToken, post_reviews);

router.get('/reviews/all', verifyToken, get_reviews_all);

router.get('/reviews/:id', get_reviews_by_id);

router.put('/reviews/:id', verifyToken, put_reviews);

router.delete('/reviews/:id', verifyToken, delete_reviews);

router.put('/reviews/published/:id', verifyToken, put_reviews_published);

router.post('/login', post_login, get_login_key);

router.get('/login/failed', get_login_failed);

router.post('/signup', signupValidate, post_signup);

function verifyToken(req, res, next) {
  const token = req.headers.Authorization || req.headers.authorization || '';
  if (!token) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  jwt.verify(token, process.env.JWTSECRET, (err, authData) => {
    if (err) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    req.authData = authData;
    next();
  });
}

module.exports = router;
