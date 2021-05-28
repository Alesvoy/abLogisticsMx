const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// Admin, MCG Admin, CCG Admin, Encargado MCG, Encargado CCG
const UserSchema = new Schema({});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
