const express = require("express");
const router = express.Router();

const User = require("../models/user");

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/");
  }
  next();
};

router.get("/", requireLogin, async (req, res) => {
  const users = await User.find({});
  res.render("usuarios/index", { users });
});

router.get("/nuevo", requireLogin, (req, res) => {
  res.render("usuarios/nuevo");
});

router.post("/", requireLogin, async (req, res) => {
  const user = new User(req.body.user);
  await user.save();
  res.redirect("/usuarios");
});

router.get("/:id/editar", requireLogin, async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render("usuarios/editar", { user });
});

router.put("/:id", requireLogin, async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, {
    ...req.body.user,
  });
  res.redirect("/usuarios");
});

router.delete("/:id", requireLogin, async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.redirect("/usuarios");
});

module.exports = router;
