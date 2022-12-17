const User = require('./model');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  try {
    if (users.length !== 0) {
      return res.status(200).json({
        Message: 'Calling API User was success',
        data: users,
      });
    }
    return res.status(200).json({
      Message: 'Data Users still empty',
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.actionSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        req.session.user = {
          id: user._id,
          email: user.email,
          status: user.status,
          name: user.name,
        };
        return res.status(200).json({
          Message: `Hello ${user.name}!`,
          data: user,
          session: req.session.user,
        });
      }
      return res.status(404).json({
        Message: 'Your password is incorrect',
        data: password,
      });
    }

    return res.status(404).json({
      Message: `Sorry! user ${email} not found`,
    });
  } catch (err) {}
};
