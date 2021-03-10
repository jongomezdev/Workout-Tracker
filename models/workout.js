const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Exercise = require("./exercise");

const workoutSchema = new Schema({
  exercises: [Exercise],
  day: { type: Date, default: Date.now },
});

module.exports = mongoose.model("workout", workoutSchema);
