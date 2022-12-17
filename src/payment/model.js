const mongoose = require('mongoose');

let paymentSchema = mongoose.Schema(
  {
    name: String,
    type: {
      type: String,
      require: [true, 'tipe pembayaran harus diisi'],
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y',
    },
    bankName: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
