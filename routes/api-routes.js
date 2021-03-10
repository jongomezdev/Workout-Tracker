const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Workout = mongoose.model("workout");

router.get("/api/workouts", async (req, res, next) => {
  try {
    const workouts = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
      {
        $sort: {
          day: 1,
        },
      },
    ]).exec();
    res.json(workouts);
  } catch (e) {
    next(e);
  }
});

router.get("/api/workouts/range", async (req, res, next) => {
  try {
    const workouts = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
      { $sort: { day: -1 } },
      { $limit: 7 },
      { $sort: { day: 1 } },
    ]).exec();
    res.json(workouts);
  } catch (e) {
    next(e);
  }
});

router.post("/api/workouts", async (req, res, next) => {
  try {
    const workout = await Workout.create(req.body);
    res.json(workout);
  } catch (e) {
    next(e);
  }
});

router.put("/api/workouts/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const workout = await Workout.findByIdAndUpdate(id, {
      $push: { exercises: req.body },
    });
    res.json(workout);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
