const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Mongoose connection
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Define the email schema and model
const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // This ensures that the email is unique in the database
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Please fill a valid email address",
    ], // This uses a regex to validate email format
  },
});

const Email = mongoose.model("Email", emailSchema);

// Route to handle form submission
app.post("/submit", (req, res) => {
  const newEmail = new Email({
    email: req.body.email,
  });
  newEmail
    .save()
    .then(() => res.json({ status: "Email saved!" }))
    .catch((err) => res.status(400).json(err));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
