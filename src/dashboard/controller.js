exports.dashboard = async (req, res) => {
  return res.status(200).json({
    Message: 'Welcome to dashboard',
    session: req.session.user,
  });
};
