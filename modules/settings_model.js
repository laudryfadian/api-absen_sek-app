const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  jamDatang: {
    type: String,
  },
  jamPulang: {
    type: String,
  },
});

module.exports = mongoose.model("Settings", schema, "settings");