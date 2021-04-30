const mongoose = require("mongoose");
const viajes = require("./datosViajes");
const unidades = require("./datosUnidades");
const operadores = require("./datosOperadores");
const Viaje = require("../models/viaje");
const Operador = require("../models/operador");
const Unidad = require("../models/unidad");
const User = require("../models/user");

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

const seedDB = async () => {
  await Viaje.deleteMany({});
  await Operador.deleteMany({});
  await Unidad.deleteMany({});
  await User.deleteMany({});
  for (let i = 0; i < 9; i++) {
    const viaje = new Viaje({
      unidad: viajes[i].unidad,
      fecha: viajes[i].fecha,
      remision: viajes[i].remision,
      origen: viajes[i].origen,
      destino: viajes[i].destino,
      operador: viajes[i].operador,
      flete: viajes[i].flete,
      factura: viajes[i].factura,
      observaciones: viajes[i].observaciones,
    });
    await viaje.save();
  }
  for (let i = 0; i < 24; i++) {
    const unidad = new Unidad({
      unidad: unidades[i].unidad,
    });
    await unidad.save();
  }
  for (let i = 0; i < 20; i++) {
    const operador = new Operador({
      nombre: operadores[i].nombre,
      division: operadores[i].division,
      unidad: operadores[i].unidad,
    });
    await operador.save();
  }
  const user = new User({
    username: "admin",
    password: "admin",
  });
  await user.save();
};

seedDB().then(() => {
  mongoose.connection.close();
});
