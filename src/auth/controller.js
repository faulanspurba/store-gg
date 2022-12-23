const bcrypt = require('bcryptjs');
const Player = require('../player/model');
const roundHash = 10;
const jwt = require('jsonwebtoken');
const config = require('../../config');

exports.getDataSignUp = async (req, res) => {
  const player = await Player.find();
  res.json({
    player,
  });
};

exports.signUp = async (req, res, next) => {
  const payload = req.body;
  const image = req.file;
  payload.password = bcrypt.hashSync(payload.password, roundHash);

  const checkEmail = await Player.findOne({ email: payload.email });

  if (checkEmail) {
    return res.status(200).json({
      Message: 'Your email has been registered',
      data: payload.email,
      error : true,
    });
  }
  try {
    if (req.file) {
      payload.image = req.file.path;
      let player = new Player(payload);
      await player.save();
      delete player._doc.password;

      return res.status(200).json({
        Message: 'Good one with image!',
        data: player,
      });
    }
    let player = new Player(payload);
    await player.save();
    delete player._doc.password;

    return res.status(200).json({
      Message: 'Good one!',
      data: player,
    });
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.status(422).json({
        Message: err.message,
        field: err.errors,
      });
    }
    next(err);
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  Player.findOne({ email })
    .then((player) => {
      if (player) {
        const checkPassword = bcrypt.compareSync(password, player.password);
        if (checkPassword) {
          const token = jwt.sign(
            {
              player: {
                id: player._id,
                name: player.name,
                email: player.email,
                image: player.image,
              },
            },
            config.jwtKey
          );

          return res.status(200).json({
            Message: 'Login Success',
            token,
          });
        }
        return res.status(403).json({ Message: 'Your Password is incorrect' });
      }
      return res.status(403).json({ Message: `Email ${email} not found` });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ Message: `Catch ${err.message}` || 'Internal Server Error' });
    });
};
