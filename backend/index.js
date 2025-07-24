require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const notesRouter = require("./routes/noteRouter");

const app = express();
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

if (!MONGODB_URI || !PORT) {
  throw new Error("MONGODB_URI or PORT are not set as environment variables");
}

console.log("connecting to:", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error connecting to MongoDB", err.message);
  });

app.use("/api/notes", notesRouter);
