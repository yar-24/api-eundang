const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieSession = require("cookie-session");
// const passport = require("passport")
const bodyParser = require('body-parser')
const path = require("path")
const userRouter = require("./src/routes/userRoutes")
const goalRouter = require("./src/routes/goalRoutes")
const orderRouter = require("./src/routes/orderRoutes")
// const passportSetup = require("./src/middleware/passport")
// const authPassport = require("./src/routes/authPassport")
const { errorHandler } = require("./src/middleware/errorMiddleware");

// const userPostRoute = require("./src/routes/undang");

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
app.use('/fileUploads', express.static(path.join(__dirname, 'fileUploads')))
app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);
// app.use("/user/post", userPostRoute);
// app.use("/auth", authPassport)
app.use("/order", orderRouter)
app.use(
  cookieSession({
    name: "session",
    keys: ["akhyar"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
// app.use(passport.initialize())
// app.use(passport.session())
app.use(bodyParser.json())

app.use(errorHandler);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
