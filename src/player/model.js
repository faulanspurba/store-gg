const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model('Player', playerSchema);
