require("dotenv").config();
const path = require("path");
const chalk = require("chalk");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const passport = require("passport");
const initJwtMiddleware = require("./middleware/JWTAuth.passport");

// DB
const db = require("./utils/dbConnect");
db();

const port = process.env.PORT || 8000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
initJwtMiddleware();

// ROUTES
const productsRotues = require("./routes/products.routes");
const authRotues = require("./routes/auth.routes");
const userRotues = require("./routes/user.routes");
const stripeRotues = require("./routes/stripe.routes");
const orderRoutes = require("./routes/order.routes");

app.use("/api/products", productsRotues);
app.use("/api/auth", authRotues);
app.use("/api/user", userRotues);
app.use("/api/stripe", stripeRotues);
app.use("/api/order", orderRoutes);

if (process.env.MODE === "production") {
  app.use(express.static(path.join(__dirname, "/../client/build/")));

  app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/../client/build/index.html"));
  });
} else {
  app.use("/", (req, res) => {
    res.send("no such endpoint / develpment mode");
  });
}

app.listen(port, () =>
  console.log(chalk.bgBlue.blue(`Server is running on port ${port}`))
);
