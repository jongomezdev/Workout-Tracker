const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
