const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  type: { String, required: true },
  name: { String, required: true },
  duration: { Number, trim: true },
  weight: { Number, trim: true },
  reps: { Number, trim: true },
  sets: { Number, trim: true },
  distance: { Number, trim: true },
});

module.exports = mongoose.model("exercise", exerciseSchema);
