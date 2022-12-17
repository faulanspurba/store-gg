const config = require('../../config');
const jwt = require('jsonwebtoken');
const Player = require('../player/model');

exports.isLogin = async (req, res) => {
  if (req.session.user === null || req.session.user === undefined) {
    return res.status(404).json({
      Message: 'You need to login first',
    });
  }
  next();
};

exports.isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.replace('Bearer ', '')
      : null;

    const data = jwt.verify(token, config.jwtKey);

    const player = await Player.findOne({ _id: data.player.id });

    if (!player) {
      throw new Error('Id not found');
    }
    req.player = player;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ Message: 'Not authorized to access this resource' });
  }
};
