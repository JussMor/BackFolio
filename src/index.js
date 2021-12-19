require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require('cors')
const decodeIDToken = require('./middlewares/auth/firebase.middleware')
const apiRouter = require("./routes/index.routes");
const { mongodb } = require("../db/mongo/mongo")

//coneccion a MongoDB
mongodb()

const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(cors())
app.use(decodeIDToken)

//routes
app.use("/api/v1", apiRouter);

// 404 handler
app.use((req, res, next) => {
  next(createError(404, "Resource not found."));
});

// error handler
app.use((err, req, res, next) => {
  const error = req.app.get("env") === "development" ? err : createError(500);
  const statusCode = error.status || 500;

  res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message,
  });
});

// start
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));