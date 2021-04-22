const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OperadorSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    enum: ["CCG", "MCG"],
    required: true,
  },
  unidad: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Operador", OperadorSchema);
