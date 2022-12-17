const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y',
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model('User', userSchema);
