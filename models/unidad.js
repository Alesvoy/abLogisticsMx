const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnidadSchema = new Schema({
  unidad: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Unidad", UnidadSchema);
