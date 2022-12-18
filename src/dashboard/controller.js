exports.dashboard = async (req, res) => {
  console.log('session : ', req.session.user);
  return res.status(200).json({
    Message: 'Welcome to dashboard',
    session: req.session.user,
  });
};
