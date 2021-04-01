const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ViajeSchema = new Schema({
  unidad: Number,
  fecha: Date,
  remision: [Number],
  origen: String,
  destino: String,
  operador: String,
  flete: Number,
  factura: Number,
  observaciones: String,
});

module.exports = mongoose.model("Viaje", ViajeSchema);
