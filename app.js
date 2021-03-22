const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Viaje = require("./models/viaje");

mongoose.connect("mongodb://localhost:27017/ab-logistics-mx", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database conected");
});

const app = express();
const ejsMate = require("ejs-mate");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/viajes", async (req, res) => {
  res.render("viajes/index");
});

app.get("/viajes/buscar", async (req, res) => {
  const viajes = await Viaje.find({});
  res.render("viajes/buscar", { viajes });
});

app.get("/viajes/nuevo", (req, res) => {
  res.render("viajes/nuevo");
});

app.post("/viajes", async (req, res) => {
  const viaje = new Viaje(req.body.viaje);
  await viaje.save();
  res.redirect(`/viajes/${viaje._id}`);
});

app.get("/viajes/:id", async (req, res) => {
  const viaje = await Viaje.findById(req.params.id);
  res.render("viajes/mostrar", { viaje });
});

app.get("/viajes/:id/editar", async (req, res) => {
  const viaje = await Viaje.findById(req.params.id);
  res.render("viajes/editar", { viaje });
});

app.put("/viajes/:id", async (req, res) => {
  const { id } = req.params;
  const viaje = await Viaje.findByIdAndUpdate(id, { ...req.body.viaje });
  res.redirect(`/viajes/${viaje._id}`);
});

app.delete("/viajes/:id", async (req, res) => {
  const { id } = req.params;
  await Viaje.findByIdAndDelete(id);
  res.redirect("/viajes/buscar");
});

app.listen(3000, () => {
  console.log("Serving on port 3000!");
});
