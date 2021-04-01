const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OperadorSchema = new Schema({
  nombre: String,
});

module.exports = mongoose.model("Operador", OperadorSchema);
