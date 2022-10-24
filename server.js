require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const connectToDatabase = async () => {
  const connection = await mongoose.connect(
    process.env.MONGODB_CLOUD_URI
  );

  console.log(`MongoDB connected to ${connection.connection.host}.`);
};

connectToDatabase();

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
