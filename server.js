require("./models/workout");
const express = require("express");
const mongoose = require("mongoose");
// const morgan = require("morgan");
const htmlRoutes = require("./routes/html-routes");
const apiRoutes = require("./routes/api-routes");

mongoose.connect("mongodb://localhost:27017/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: false,
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
// app.use(morgan("combined"));
app.use(htmlRoutes);
app.use(apiRoutes);

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});

module.exports = app;
