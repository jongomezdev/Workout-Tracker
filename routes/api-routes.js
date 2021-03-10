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
    ]);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
