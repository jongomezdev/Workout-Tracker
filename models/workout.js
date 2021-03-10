const { Schema, model } = require("mongoose");
const Exercise = require("./exercise");

const workoutSchema = new Schema({
  exercises: [Exercise],
  day: { type: Date, default: Date.now },
});

model("workout", workoutSchema);
