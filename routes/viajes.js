const express = require("express");
const router = express.Router();

const Viaje = require("../models/viaje");
const Unidad = require("../models/unidad");
const Operador = require("../models/operador");

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/");
  }
  next();
};

router.get("/", requireLogin, (req, res) => {
  res.render("viajes/index");
});

router.get("/buscar", requireLogin, async (req, res) => {
  const q = req.query;
  if (Object.keys(q).length === 0 && q.constructor === Object) {
    const viajes = await Viaje.find({});
    const unidades = await Unidad.find({});
    res.render("viajes/buscar", { viajes, unidades, q });
  } else {
    const viajes = await Viaje.find({
      unidad: q.unidad,
      fecha: {
        $gte: q.fechaInicial,
        $lt: q.fechaFinal,
      },
    });
    const unidades = await Unidad.find({});
    res.render("viajes/buscar", { viajes, unidades, q });
  }
});

router.get("/nuevo", requireLogin, async (req, res) => {
  const operadores = await Operador.find({});
  const unidades = await Unidad.find({});
  res.render("viajes/nuevo", { operadores, unidades });
});

router.post("/", requireLogin, async (req, res) => {
  const viaje = new Viaje(req.body.viaje);
  await viaje.save();
  res.redirect(`/viajes/${viaje._id}`);
});

router.get("/:id", requireLogin, async (req, res) => {
  const viaje = await Viaje.findById(req.params.id);
  res.render("viajes/mostrar", { viaje });
});

router.get("/:id/editar", requireLogin, async (req, res) => {
  const viaje = await Viaje.findById(req.params.id);
  res.render("viajes/editar", { viaje });
});

router.put("/:id", requireLogin, async (req, res) => {
  const { id } = req.params;
  const viaje = await Viaje.findByIdAndUpdate(id, { ...req.body.viaje });
  res.redirect(`/viajes/${viaje._id}`);
});

router.delete("/:id", requireLogin, async (req, res) => {
  const { id } = req.params;
  await Viaje.findByIdAndDelete(id);
  res.redirect("/viajes/buscar");
});

module.exports = router;
