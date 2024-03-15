const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Plant = require("../models/Plant.model");
const fileUploader = require("../config/cloudinary.config");

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

//POST img with Cloudinary

router.post("/upload", fileUploader.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});

//POST
router.post("/plants", (req, res, next) => {
  const { name, image, location, directSunlight, toxicity, difficulty } =
    req.body;

  Plant.create({ name, image, location, directSunlight, toxicity, difficulty })
    .then((plantFromDB) => {
      console.log(plantFromDB);
      res.status(201).json(plantFromDB);
    })
    .catch((e) => {
      console.log("Error creating a new plant");
      console.log(e);
      res.status(500).json({ message: "Error creating a new plant" });
    });
});

//DELETE
router.delete("/plants/:plantId", isAuthenticated, (req, res, next) => {
  const { plantId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Plant.findByIdAndDelete(plantId)
    .then(() => {
      res.json({ message: `Plant removed successfully.` });
    })
    .catch((e) => {
      console.log("Error deleting care plan");
      console.log(e);
      res.status(500).json({ message: "Error deleting care plan" });
    });
});

module.exports = router;
