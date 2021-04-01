const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnidadSchema = new Schema({
  unidad: Number,
});

module.exports = mongoose.model("Unidad", UnidadSchema);
