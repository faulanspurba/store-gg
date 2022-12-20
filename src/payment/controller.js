const Payment = require('./model');
const Bank = require('../bank/model');

module.exports = {
  index: async (req, res) => {
    try {
      const payment = await Payment.find().populate('banks');

      res.status(200).json({
        Message: 'Getting payment data was success',
        data: payment,
        // name : req.session.user.name
      });
    } catch (err) {
      res.status(500).json({
        Message: err.message || 'Internal Server Error',
        field: err.errors,
      });
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { banks, type } = req.body;

      let payment = await Payment({ banks, type });
      const data = await payment.save();

      res.status(200).json({
        Message: 'Creating data payment was success',
        data,
      });
    } catch (err) {
      res.status(500).json({
        Message: err.message || 'Internal Server Error',
        field: err.errors,
      });
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { _id } = req.params;

      const payment = await Payment.findOne({ _id }).populate('banks');
      const banks = await Bank.find();

      res.status(200).json({
        Message: 'Getting data  was success',
        data: { banks, payment },
        // name : req.session.user.name
      });
    } catch (err) {
      res.status(500).json({
        Message: err.message || 'Internal Server Error',
        field: err.errors,
      });
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { _id } = req.params;
      const { banks, type } = req.body;

      const data = await Payment.findOneAndUpdate(
        {
          _id,
        },
        { banks, type }
      );

      res.status(201).json({
        Message: 'Updating data was success',
        data,
      });
    } catch (err) {
      res.status(500).json({
        Message: err.message || 'Internal Server Error',
        field: err.errors,
      });
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { _id } = req.params;

      await Payment.findOneAndRemove({
        _id,
      });

      res.status(200).json({
        Message: 'Deleting data was success',
      });
    } catch (err) {
      res.status(500).json({
        Message: err.message || 'Internal Server Error',
        field: err.errors,
      });
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { _id } = req.params;
      let payment = await Payment.findOne({ _id });

      let status = payment.status === 'Y' ? 'N' : 'Y';

      payment = await Payment.findOneAndUpdate(
        {
          _id,
        },
        { status }
      );

      res.status(201).json({
        Message: 'Updating data status was success',
      });
    } catch (err) {
      res.status(500).json({
        Message: err.message || 'Internal Server Error',
        field: err.errors,
      });
    }
  },
};
