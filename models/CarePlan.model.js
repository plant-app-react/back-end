const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const carePlanSchema = new Schema({
  water: { type: String },
  fertilize: { type: String },
  mist: { type: String },
  clean: { type: String },
  repot: { type: String },
  plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const CarePlan = model("CarePlan", carePlanSchema);

module.exports = CarePlan;
