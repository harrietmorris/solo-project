const mongoose = require('../db.js')


const meetsSchema = mongoose.Schema({
  organiser: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },
  attendants: {
    type: [String],
    required: false,
  },

});

module.exports = mongoose.model('Meets', meetsSchema);