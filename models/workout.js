const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  exercises: foo,
  day: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("workout", workoutSchema);
