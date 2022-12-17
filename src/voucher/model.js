const mongoose = require('mongoose');

const voucherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y',
  },
  image: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  nominals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Nominals',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Voucher', voucherSchema);
