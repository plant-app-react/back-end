const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const plantSchema = new Schema({
  name: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://www.nycstreetdesign.info/sites/default/files/2018-12/Leaf%20icon_14.jpg",
  },
  location: { type: String, enum: ["interior", "exterior"] },
  directSunlight: { type: Boolean, default: false },
  toxicity: { type: Boolean, default: false },
  difficulty: {
    type: String,
    default: "Easy Care",
    enum: ["Easy Care", "High Maintenance"],
  },
});

const Plant = model("Plant", plantSchema);

module.exports = Plant;
