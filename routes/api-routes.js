const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Workout = mongoose.model("workout");
const app = express();

function catchAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

router.get(
  "/api/workouts",
  catchAsync(async (req, res, next) => {
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
  })
);

router.get(
  "/api/workouts/range",
  catchAsync(async (req, res, next) => {
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
  })
);

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

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

module.exports = router;
