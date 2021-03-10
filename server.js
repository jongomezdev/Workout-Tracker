const express = require("express");
const htmlRoutes = require("./routes/html-routes");
const apiRoutes = require("./routes/api-routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(htmlRoutes);
app.use(apiRoutes);

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
