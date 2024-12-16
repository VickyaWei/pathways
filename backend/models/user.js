const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,  // Automatically generate a UUID when a new user is created
  },
  email: { type: String, required: true },
  bookmarkedMentors: [{
    title: String,
    id: String  // Add id field to track unique identifier
  }],
  bookmarkedResources: [{
    title: String,
    id: String  // Add id field to track unique identifier
  }],
  bookmarkedMentorPanels: [{
    title: String,
    id: String  // Add id field to track unique identifier
  }],
  loginTimes: { type: Number, default: 0 }, // Track number of logins
  lastLogin: { type: Date },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;