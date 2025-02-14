const mongoose = require("mongoose");
const { type } = require("os");

const schema = mongoose.Schema({
  name: {
    type: "String",
    required: "true",
    unique: true
  },
  content: {
    type: 'String',
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model('Note', schema)

