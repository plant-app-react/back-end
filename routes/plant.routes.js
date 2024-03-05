const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Plant = require("../models/Plant.model");

//GET
router.get("/plants", (req, res, next) => {
  Plant.find()
    .then((plantsFromDB) => {
      res.json(plantsFromDB);
    })
    .catch((e) => {
      console.log("Error getting list of plants");
      console.log(e);
      res.status(500).json({ message: "Error getting list of plants" });
    });
});

//GET Plant by id
router.get("/plants/:plantId", (req, res, next) => {
  const { plantId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Plant.findById(plantId)
    .then((plantDetails) => {
      res.json(plantDetails);
    })
    .catch((e) => {
      console.log("Error getting plant details");
      console.log(e);
      res.status(500).json({ message: "Error getting plant details" });
    });
});

//POST
router.post("/plants", (req, res, next) => {
  const { name, image, location, directSunlight, toxicity } = req.body;

  Plant.create({ name, image, location, directSunlight, toxicity })
    .then((plantFromDB) => {
      res.status(201).json(plantFromDB);
    })
    .catch((e) => {
      console.log("Error creating a new plant");
      console.log(e);
      res.status(500).json({ message: "Error creating a new plant" });
    });
});

module.exports = router;
