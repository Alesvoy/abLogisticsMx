const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const User = require("./models/user");
const session = require("express-session");
const passport = require("passport");
const LocalStategy = require("passport-local");

// Routes
const viajesRoutes = require("./routes/viajes");
const operadoresRoutes = require("./routes/operadores");
const unidadesRoutes = require("./routes/unidades");
const usuariosRoutes = require("./routes/usuarios");

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
app.use(session({ secret: "notagoodsecret" }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/viajes", viajesRoutes);
app.use("/operadores", operadoresRoutes);
app.use("/unidades", unidadesRoutes);
app.use("/usuarios", usuariosRoutes);

app.listen(3000, () => {
  console.log("Serving on port 3000!");
});
