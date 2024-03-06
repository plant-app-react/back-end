const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const CarePlan = require("../models/CarePlan.model");

//GET
router.get("/plants/:plantId/careplan", (req, res, next) => {
  const { plantId } = req.params;
  // validate plantId
  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  CarePlan.findOne({ plant: plantId })
    .then((carePlanFromDB) => {
      res.json(carePlanFromDB);
    })
    .catch((e) => {
      console.log("Error getting details of care plan");
      console.log(e);
      res.status(500).json({ message: "Error details of care plan" });
    });
});

//POST
router.post("/plants/:plantId/careplan", (req, res, next) => {
  const { water, fertilize, mist, clean, repot } = req.body;
  const { plantId } = req.params;
  const newCarePlan = {
    water,
    fertilize,
    mist,
    clean,
    repot,
    plant: plantId,
  };

  CarePlan.create(newCarePlan)
    .then((carePlanFromDB) => {
      res.status(201).json(carePlanFromDB);
    })
    .catch((e) => {
      console.log("Error creating care plan");
      console.log(e);
      res.status(500).json({ message: "Error creating care plan" });
    });
});

//PUT
router.put("/plants/:plantId/careplan", (req, res, next) => {
  const { plantId } = req.params;
  console.log(plantId);
  const { water, fertilize, mist, clean, repot } = req.body;

  // validate plantId
  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  CarePlan.findOneAndUpdate(
    { plant: plantId },
    { water, fertilize, mist, clean, repot },
    { new: true }
  )
    .then((updatedCarePlan) => {
      res.json(updatedCarePlan);
    })
    .catch((e) => {
      console.log("Error updating care plan");
      console.log(e);
      res.status(500).json({ message: "Error updating care plan" });
    });
});

//DELETE
router.delete("/plants/:plantId/careplan", (req, res, next) => {
  const { plantId } = req.params;

  // validate plantId
  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  CarePlan.findOneAndDelete({ plant: plantId })
    .then(() => {
      res.json({ message: `Care plan removed successfully.` });
    })
    .catch((e) => {
      console.log("Error deleting care plan");
      console.log(e);
      res.status(500).json({ message: "Error deleting care plan" });
    });
});

module.exports = router;
