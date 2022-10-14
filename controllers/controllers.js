const Review = require('../models/Game_review');
const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

exports.post_login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
});

exports.get_reviews = async function (req, res, next) {
  res.send({ reviews: await Review.find() });
};

exports.post_signup = async function (req, res, next) {
  try {
    if (req.body.adminAccessKey !== process.env.CREATEACCOUNT) {
      res.send({ status: 'No Admin Access' });
      return;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array().map((obj) => obj.msg);
      return res.status(422).json({ errors: errorsArray });
    } else {
      await bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
        if (error) {
          return next(error);
        }
        new User({
          username: req.body.username,
          password: hashedPassword,
        }).save((error) => {
          if (error) {
            return next(error);
          }
        }, res.send({ status: 'Account Created Successfully' }));
      });
    }
  } catch (error) {
    console.log(error);
  }
};
