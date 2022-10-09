const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  nama: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  nohp: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  posisi: {
    type: String
  },
  superUser: {
    type: Boolean,
    default: false
  },
  gaji: {
    type: Number
  },
  isAbsen: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model("User", schema, "user");