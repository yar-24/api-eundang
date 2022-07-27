const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookieSession = require("cookie-session");
const bodyParser = require('body-parser')
const path = require("path")
const userRouter = require("./src/routes/userRoutes")
const goalRouter = require("./src/routes/goalRoutes")
const orderRouter = require("./src/routes/orderRoutes")
const { errorHandler } = require("./src/middleware/errorMiddleware");
require("dotenv").config();


mongoose
  .connect(process.env.MONGOO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB Disconnected!");
  })

app.use(cors());
app.use(express.json());
app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);
app.use("/api/order", orderRouter)
app.use(
  cookieSession({
    name: "session",
    keys: ["akhyar"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(bodyParser.json())

app.use(errorHandler);

app.use(express.static(path.join(__dirname, "client",)));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});

//----------------deployment-----------------

// app.use(express.static(path.join(__dirname, "admin")));
// app.get("/admin", (req, res) => {
//   res.sendFile(path.join(__dirname, "admin", "index.html"));
// });


