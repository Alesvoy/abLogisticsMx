const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ViajeSchema = new Schema({
  eco: Number,
  fecha: Date,
  remision: Number,
  origen: String,
  destino: String,
  operador: String,
  flete: Number,
  factura: String,
  observaciones: String,
});

module.exports = mongoose.model("Viaje", ViajeSchema);
