const express = require("express");
const router = express.Router();

const Unidad = require("../models/unidad");

router.get("/", (req, res) => {
  res.render("unidades/index");
});

router.get("/buscar", async (req, res) => {
  const unidades = await Unidad.find({});
  res.render("unidades/buscar", { unidades });
});

router.get("/nuevo", (req, res) => {
  res.render("unidades/nuevo");
});

router.post("/", async (req, res) => {
  const unidad = new Unidad(req.body.unidad);
  await unidad.save();
  res.redirect(`unidades/${unidad._id}`);
});

router.get("/:id", async (req, res) => {
  const unidad = await Unidad.findById(req.params.id);
  res.render("unidades/mostrar", { unidad });
});

router.get("/:id/editar", async (req, res) => {
  const unidad = await Unidad.findById(req.params.id);
  res.render("unidades/editar", { unidad });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const unidad = await Unidad.findByIdAndUpdate(id, { ...req.body.unidad });
  res.redirect(`/unidades/${unidad._id}`);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Unidad.findByIdAndDelete(id);
  res.redirect("/unidades/buscar");
});

module.exports = router;
