const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
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

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/insertarviaje", async (req, res) => {
  const viaje = new Viaje({ eco: 29, fecha: Date.now() });
  await viaje.save();
  res.send(viaje);
});

app.listen(3000, () => {
  console.log("Serving on port 3000!");
  console.log("WE LIVE BOY");
});
