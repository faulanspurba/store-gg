const Bank = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const bank = await Bank.find();

      return res.status(200).json({
        Message: 'Getting all data Bank success',
        data: bank,
        // name: req.session.user.name,
      });
    } catch (err) {
      return res.status(500).json({
        Message: err.message || 'Internal Server Error',
        field: err.errors,
      });
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, nameBank, noRekening } = req.body;

      let bank = await Bank({ name, nameBank, noRekening });
      await bank.save();

      return res.status(201).json({
        Message: 'Create Success',
        data: bank,
      });
    } catch (err) {
      return res.status(500).json({
        Message: err.message || 'Internal Server Error',
        field: err.errors,
      });
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { _id } = req.params;

      const bank = await Bank.findOne({ _id });

      res.status(200).json({
        data: bank,
      });
    } catch (err) {
      return res.status(500).json({
        Message: err.message || 'Internal Server Error',
        field: err.errors,
      });
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { _id } = req.params;
      const { name, nameBank, noRekening } = req.body;

      await Bank.findOneAndUpdate(
        {
          _id,
        },
        { name, nameBank, noRekening }
      );

      return res.status(200).json({
        Message: 'Updating data was success',
      });
    } catch (err) {
      return res.status(500).json({
        Message: err.message || 'Internal Server Error',
        field: err.errors,
      });
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Bank.findOneAndRemove({
        _id: id,
      });

      return res.status(200).json({
        Message: 'Deleting data was success',
      });
    } catch (err) {
      return res.status(500).json({
        Message: err.message || 'Internal Server Error',
        field: err.errors,
      });
    }
  },
};
