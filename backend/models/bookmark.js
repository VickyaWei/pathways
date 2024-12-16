const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const bookmarkSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,  // Automatically generate a UUID when a new user is created
  },
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
});

const bookmarkModel = mongoose.model("Bookmark", bookmarkSchema);

module.exports = bookmarkModel;