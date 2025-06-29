const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

const port = process.env.Port || 5000;

// default router
app.get("/", (req, res) => {
  res.send("server is up and running!");
});

// import routes
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");

// api end points
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);

//error handling middleware function for all routes
app.use((err, req, res, next) => {
  console.log(err);
  const message = err.message ? err.message : "Server Error Occurred";
  const status = err.status ? err.status : 500;
  res.status(status).json({
    message,
  });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
