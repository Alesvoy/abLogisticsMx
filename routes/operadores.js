const express = require("express");
const router = express.Router();

const Operador = require("../models/operador");

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/");
  }
  next();
};

router.get("/", requireLogin, (req, res) => {
  res.render("operadores/index");
});

router.get("/buscar", requireLogin, async (req, res) => {
  const q = req.query;
  if (Object.keys(q).length === 0 && q.constructor === Object) {
    const operadores = await Operador.find({});
    res.render("operadores/buscar", { operadores, q });
  } else {
    const operadores = await Operador.find({
      division: q.division,
    });
    res.render("operadores/buscar", { operadores, q });
  }
});

router.get("/nuevo", requireLogin, (req, res) => {
  res.render("operadores/nuevo");
});

router.post("/", requireLogin, async (req, res) => {
  const operador = new Operador(req.body.operador);
  await operador.save();
  res.redirect(`/operadores/${operador._id}`);
});

router.get("/:id", requireLogin, async (req, res) => {
  const operador = await Operador.findById(req.params.id);
  res.render("operadores/mostrar", { operador });
});

router.get("/:id/editar", requireLogin, async (req, res) => {
  const operador = await Operador.findById(req.params.id);
  res.render("operadores/editar", { operador });
});

router.put("/:id", requireLogin, async (req, res) => {
  const { id } = req.params;
  const operador = await Operador.findByIdAndUpdate(id, {
    ...req.body.operador,
  });
  res.redirect(`/operadores/${operador._id}`);
});

router.delete("/:id", requireLogin, async (req, res) => {
  const { id } = req.params;
  await Operador.findByIdAndDelete(id);
  res.redirect("/operadores/buscar");
});

module.exports = router;
