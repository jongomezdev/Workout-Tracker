let mongoose = require("mongoose");
// let db = require("../models/workout");
const Workout = require("../models/workout");
const workoutSeed = require("./workoutSeed");

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Workout.deleteMany({})
    .then(() => Workout.insertMany(workoutSeed))
    .then((data) => {
      console.log(data.result.n + " records inserted!");
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

seedDB().then(() => {
  mongoose.connection.close();
});
