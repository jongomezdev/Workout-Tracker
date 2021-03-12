require("./models/workout");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const htmlRoutes = require("./routes/html-routes");
const apiRoutes = require("./routes/api-routes");

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("dev"));
app.use(htmlRoutes);
app.use(apiRoutes);

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});

module.exports = app;
