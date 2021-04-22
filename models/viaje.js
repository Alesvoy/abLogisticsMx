const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ViajeSchema = new Schema({
  unidad: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  remision: [Number],
  origen: String,
  destino: String,
  operador: {
    type: String,
    required: true,
  },
  flete: Number,
  observaciones: String,
});

module.exports = mongoose.model("Viaje", ViajeSchema);
