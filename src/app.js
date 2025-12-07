const express = require("express");

const authRoutes = require("./routes/auth.routes");
const cookiesParser  = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookiesParser())
app.use("/auth", authRoutes);

module.exports = app;
