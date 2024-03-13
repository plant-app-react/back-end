const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const CarePlan = require("../models/CarePlan.model");

//GET
router.get("/plants/:plantId/careplan", isAuthenticated, (req, res, next) => {
  const { plantId } = req.params;
  const userId = req.payload._id;

  // validate plantId
  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  CarePlan.findOne({ plant: plantId, user: userId })
    .then((carePlanFromDB) => {
      res.json(carePlanFromDB);
    })
    .catch((e) => {
      console.log("Error getting details of care plan");
      console.log(e);
      res.status(500).json({ message: "Error details of care plan" });
    });
});

//GET ALL CAREPLANS
router.get("/careplans", isAuthenticated, (req, res, next) => {

  const userId = req.payload._id;

  CarePlan.find({ user: userId })
    .populate('plant')
    .then((carePlansFromDB) => {
      res.json(carePlansFromDB);
    })
    .catch((e) => {
      res.status(500).json({ message: "Error details of care plan" });
    });
});

//POST
router.post("/plants/:plantId/careplan", isAuthenticated, (req, res, next) => {
  const { water, fertilize, mist, clean, repot } = req.body;
  const { plantId } = req.params;
  const userId = req.payload._id;
  console.log(userId)

  const newCarePlan = {
    water,
    fertilize,
    mist,
    clean,
    repot,
    plant: plantId,
    user: userId
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
})



//PUT
router.put("/plants/:plantId/careplan", isAuthenticated, (req, res, next) => {
  const { plantId } = req.params;
  const { water, fertilize, mist, clean, repot } = req.body;
  const userId = req.payload._id;

  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  CarePlan.findOneAndUpdate(
    { plant: plantId, user: userId },
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
router.delete(
  "/plants/:plantId/careplan",
  isAuthenticated,
  (req, res, next) => {
    const { plantId } = req.params;
    const userId = req.payload._id;

    if (!mongoose.Types.ObjectId.isValid(plantId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    CarePlan.findOneAndDelete({ plant: plantId, user: userId })
      .then(() => {
        res.json({ message: `Care plan removed successfully.` });
      })
      .catch((e) => {
        console.log("Error deleting care plan");
        console.log(e);
        res.status(500).json({ message: "Error deleting care plan" });
      });
  }
);

module.exports = router;
