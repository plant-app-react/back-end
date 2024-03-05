const { Schema, model } = require("mongoose");

const plantSchema = new Schema({
  name: { type: String, required: true },
  image: {
    type: String,
    default: "https://avalos.sv/wp-content/uploads/default-featured-image.png",
  },
  location: { type: String, enum: ["interior", "exterior"] },
  directSunlight: { type: Boolean, default: false },
  toxicity: { type: Boolean, default: false },
});

const Plant = model("Plant", plantSchema);

module.exports = Plant;
