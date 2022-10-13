const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({ test: 'working' });
});

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
