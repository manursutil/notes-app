require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const notesRouter = require("./routes/noteRouter");
const usersRouter = require("./routes/userRouter");
const loginRouter = require("./routes/loginRouter");

const logger = require("./middleware/logger");
const middleware = require("./middleware/middleware");

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

if (!MONGODB_URI || !PORT) {
  throw new Error("MONGODB_URI or PORT are not set as environment variables");
}

logger.info("connecting to:", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");

    app.listen(PORT, () => {
      logger.info(`Server running on: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("error connecting to MongoDB", err.message);
  });

app.use(cors());
app.use(express.json());

app.use(middleware.getTokenFrom);

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
