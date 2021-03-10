const { Schema } = require("mongoose");

const exerciseSchema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  duration: { type: Number, trim: true },
  weight: { type: Number, trim: true },
  reps: { type: Number, trim: true },
  sets: { type: Number, trim: true },
  distance: { type: Number, trim: true },
});

module.exports = exerciseSchema;
