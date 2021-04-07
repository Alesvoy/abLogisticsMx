const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OperadorSchema = new Schema({
  nombre: String,
  division: {
    type: String,
    enum: ["CCG", "MCG"],
  },
  unidad: Number,
});

module.exports = mongoose.model("Operador", OperadorSchema);
