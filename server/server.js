const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Mongoose connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Define the email schema and model
const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Please fill a valid email address",
    ],
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
    .then(() => res.json({ status: "Signup successful" }))
    .catch((err) => {
      console.error("Error saving email", err);
      res.status(400).json({ error: "Failed to save email." });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
