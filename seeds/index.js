const mongoose = require("mongoose");
const viajes = require("./datosViajes");
const Viaje = require("../models/viaje");

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
  for (let i = 0; i < 9; i++) {
    const viaje = new Viaje({
      eco: viajes[i].eco,
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
};

seedDB().then(() => {
  mongoose.connection.close();
});
