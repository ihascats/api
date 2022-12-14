const Review = require('../models/Game_review');
const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
let hltb = require('howlongtobeat');
let hltbService = new hltb.HowLongToBeatService();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

function signToken(payload) {
  return jwt.sign(payload, process.env.JWTSECRET);
}

exports.signupValidate = [
  check('username')
    .isLength({ min: 2 })
    .withMessage('Username must be at least 2 characters')
    .isLength({ max: 20 })
    .withMessage('Username must be at most 20 characters')
    .trim()
    .escape(),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    .matches('[0-9]')
    .withMessage('Password Must Contain a Number')
    .matches('[a-z]')
    .withMessage('Password Must Contain a Lowercase Letter')
    .matches('[A-Z]')
    .withMessage('Password Must Contain an Uppercase Letter')
    .matches(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
    .withMessage('Password Must Contain a Special Character')
    .trim()
    .escape(),
  check('adminAccessKey').trim().escape(),
];

exports.get_login_key = function (req, res, next) {
  if (req.user) {
    res.send(signToken({ user: req.user }));
  } else {
    res.send({ status: 'Invalid login' });
  }
};

exports.get_reviews = async function (req, res, next) {
  res.send(
    await Review.find(
      { published: true },
      { _id: 1, steam_id: 1, game_title: 1, published: 1 },
    ).sort({ createdAt: -1 }),
  );
};

exports.get_reviews_all = async function (req, res, next) {
  res.send(
    await Review.find(
      {},
      { _id: 1, steam_id: 1, game_title: 1, published: 1 },
    ).sort({ createdAt: -1 }),
  );
};

exports.get_reviews_by_id = async function (req, res, next) {
  res.send(await Review.findById(req.params.id));
};

exports.put_reviews_published = async function (req, res, next) {
  const publishedStatus = await Review.findById(req.params.id);
  Review.findByIdAndUpdate(req.params.id, {
    published: !publishedStatus.published,
  }).then(async () => {
    if (!publishedStatus.published) {
      res.send({
        state: 'Successfully published review',
        _id: req.params.id,
        review: await Review.findById(req.params.id),
      });
    } else {
      res.send({
        state: 'Successfully published review',
        _id: req.params.id,
        review: await Review.findById(req.params.id),
      });
    }
  });
};

exports.put_reviews = function (req, res, next) {
  Review.findByIdAndUpdate(req.params.id, {
    game_title: req.body.game_title,
    visuals: req.body.visuals,
    performance: req.body.performance,
    accessibility: req.body.accessibility,
    engagement: req.body.engagement,
    fun: req.body.fun,
    status: req.body.status,
    published: req.body.published,
    steam_id: req.body.steam_id,
  }).then(async () => {
    res.send({
      status: 'Review updated successfully',
      review: await Review.findById(req.params.id),
    });
  });
};

exports.delete_reviews = async function (req, res, next) {
  try {
    await Review.findByIdAndRemove(req.params.id);
    res.send({ status: 'Review deleted successfully' });
  } catch (error) {
    console.log(error);
  }
};

exports.post_reviews = async function (req, res, next) {
  try {
    const newReview = new Review({
      game_title: req.body.game_title,
      visuals: req.body.visuals,
      performance: req.body.performance,
      accessibility: req.body.accessibility,
      engagement: req.body.engagement,
      fun: req.body.fun,
      status: req.body.status,
      published: req.body.published,
      steam_id: req.body.steam_id,
    });
    newReview.save(async (error) => {
      if (error) {
        return next(error);
      } else {
        res.send({
          status: 'Review created successfully',
          reviews: await Review.find(
            {},
            { _id: 1, steam_id: 1, game_title: 1, published: 1 },
          ).sort({ createdAt: -1 }),
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.post_login = passport.authenticate('local', {
  failureRedirect: '/login/failed',
  failureMessage: true,
});

exports.get_login_failed = function (req, res, next) {
  res.status(401).send({ status: 'No Admin Access' });
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
        }, res.send({ status: 'Account created successfully' }));
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.get_steam_api = async function (req, res, next) {
  const response = await fetch(
    `https://store.steampowered.com/api/appdetails/?appids=${req.params.id}&cc=us&filters=price_overview`,
    {
      method: 'GET',
      mode: 'cors',
    },
  );
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    res.send(json[`${req.params.id}`].data.price_overview);
  } else {
    res.send({ response });
  }
};

exports.get_hltb_api = async function (req, res, next) {
  const response = await hltbService.search(req.params.name);
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    res.send({ game_info: json });
  } else {
    res.send({ response });
  }
};
