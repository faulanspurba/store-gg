const Transaction = require('./model');

exports.index = async (req, res) => {
  try {
    const transaction = await Transaction.find().populate('player');

    return res.status(200).json({
      data: { transaction },
      name: req.session.name,
    });
  } catch (err) {
    res.status(500).json({
      Message: err.message || 'Internal Server Error',
    });
  }
};

exports.actionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    await Transaction.findByIdAndUpdate({ _id: id }, { status });
  } catch (err) {
    return res.status(500).json({
      Message: err.message || 'Internal Server Error',
      field: err.errors,
    });
  }
};
