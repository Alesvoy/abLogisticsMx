const express = require("express");
const router = express.Router();

const Unidad = require("../models/unidad");

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

router.get("/", requireLogin, (req, res) => {
  res.render("unidades/index");
});

router.get("/buscar", requireLogin, async (req, res) => {
  const unidades = await Unidad.find({});
  res.render("unidades/buscar", { unidades });
});

router.get("/nuevo", requireLogin, (req, res) => {
  res.render("unidades/nuevo");
});

router.post("/", requireLogin, async (req, res) => {
  const unidad = new Unidad(req.body.unidad);
  await unidad.save();
  res.redirect(`unidades/${unidad._id}`);
});

router.get("/:id", requireLogin, async (req, res) => {
  const unidad = await Unidad.findById(req.params.id);
  res.render("unidades/mostrar", { unidad });
});

router.get("/:id/editar", requireLogin, async (req, res) => {
  const unidad = await Unidad.findById(req.params.id);
  res.render("unidades/editar", { unidad });
});

router.put("/:id", requireLogin, async (req, res) => {
  const { id } = req.params;
  const unidad = await Unidad.findByIdAndUpdate(id, { ...req.body.unidad });
  res.redirect(`/unidades/${unidad._id}`);
});

router.delete("/:id", requireLogin, async (req, res) => {
  const { id } = req.params;
  await Unidad.findByIdAndDelete(id);
  res.redirect("/unidades/buscar");
});

module.exports = router;
