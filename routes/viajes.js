const express = require("express");
const router = express.Router();

const Viaje = require("../models/viaje");
const Unidad = require("../models/unidad");
const Operador = require("../models/operador");

router.get("/", async (req, res) => {
  res.render("viajes/index");
});

router.get("/buscar", async (req, res) => {
  const q = req.query;
  if (Object.keys(q).length === 0 && q.constructor === Object) {
    const viajes = await Viaje.find({});
    res.render("viajes/buscar", { viajes, q });
  } else {
    const viajes = await Viaje.find({
      unidad: q.unidad,
      fecha: {
        $gte: q.fechaInicial,
        $lt: q.fechaFinal,
      },
    });
    res.render("viajes/buscar", { viajes, q });
  }
});

router.get("/nuevo", (req, res) => {
  res.render("viajes/nuevo");
});

router.post("/", async (req, res) => {
  const viaje = new Viaje(req.body.viaje);
  await viaje.save();
  res.redirect(`/viajes/${viaje._id}`);
});

router.get("/:id", async (req, res) => {
  const viaje = await Viaje.findById(req.params.id);
  res.render("viajes/mostrar", { viaje });
});

router.get("/:id/editar", async (req, res) => {
  const viaje = await Viaje.findById(req.params.id);
  res.render("viajes/editar", { viaje });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const viaje = await Viaje.findByIdAndUpdate(id, { ...req.body.viaje });
  res.redirect(`/viajes/${viaje._id}`);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Viaje.findByIdAndDelete(id);
  res.redirect("/viajes/buscar");
});

module.exports = router;
