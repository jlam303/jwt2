const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { collection: 'Users' }
);

module.exports = mongoose.model('User', personSchema);
