const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
  idUser: {
    type: ObjectId,
    ref: "User",
  },
  alasan: {
    type: String
  },
  jam: {
    type: String,
  },
  tanggal: {
    type: String,
  },
  latlong: {
    type: String
  },
});


module.exports = mongoose.model("Izin", schema, "izin");