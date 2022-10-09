const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
  idUser: {
    type: ObjectId,
    ref: "User",
  },
  ket: {
    type: String
  },
  jam: {
    type: String,
  },
  tanggal: {
    type: String,
  },
  foto: {
    type: String,
  },
  latlong: {
    type: String
  },
  approve: {
    type: String,
    default: "pending",
  },
});


module.exports = mongoose.model("Absen", schema, "absen");