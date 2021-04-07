const express = require("express");
const router = express.Router();

const Operador = require("../models/operador");

router.get("/", (req, res) => {
  res.render("operadores/index");
});

module.exports = router;
