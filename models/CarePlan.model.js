const { Schema, model } = require("mongoose");

const carePlanSchema = new Schema({
  water: { type: String },
  fertilize: { type: String },
  mist: { type: String },
  clean: { type: String },
  repot: { type: String },
});

const CarePlan = model("CarePlan", carePlanSchema);

module.exports = CarePlan;
