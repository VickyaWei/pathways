const express = require("express");
const connectDB = require("./db.js");
const userModel = require("./models/user.js");
const bookmarkModel = require("./models/bookmark.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

// Route for fetching all users
app.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

// Route for creating or fetching a user
app.post("/users", async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    let user = await userModel.findOne({ email });

    if (!user) {
      // Create a new user if not found
      user = await userModel.create({
        email,
        lastLogin: new Date(),
        loginTimes: 1,
      });
      res.status(201).json({ message: "User created successfully", user });
    } else {
      // Update last login if user exists
      user.lastLogin = new Date();
      user.loginTimes += 1;
      await user.save();
      res.status(200).json({ message: "User already exists", user });
    }
  } catch (error) {
    console.error("Error in /users route:", error.message);
    res.status(500).json({ message: "Error creating/finding user", error: error.message });
  }
});


// Example of saving a bookmark
app.post('/bookmarks', async (req, res) => {
  const { email, item, category } = req.body;

  try {
    let bookmark = await bookmarkModel.findOne({ email });

    // If no bookmark exists for the user, create a new one
    if (!bookmark) {
      bookmark = new bookmarkModel({ email, bookmarkedMentors: [], bookmarkedResources: [], bookmarkedMentorPanels: [] });
    }

    // Add or remove bookmark from the correct category
    if (category === 'mentor') {
      if (!bookmark.bookmarkedMentors.some(b => b.id === item.id)) {
        bookmark.bookmarkedMentors.push({ title: item.title, id: item.id });
      } else {
        bookmark.bookmarkedMentors = bookmark.bookmarkedMentors.filter(b => b.id !== item.id);
      }
    } else if (category === 'resource') {
      if (!bookmark.bookmarkedResources.some(b => b.id === item.id)) {
        bookmark.bookmarkedResources.push({ title: item.title, id: item.id });
      } else {
        bookmark.bookmarkedResources = bookmark.bookmarkedResources.filter(b => b.id !== item.id);
      }
    } else if (category === 'mentor-panel') {
      if (!bookmark.bookmarkedMentorPanels.some(b => b.id === item.id)) {
        bookmark.bookmarkedMentorPanels.push({ title: item.title, id: item.id });
      } else {
        bookmark.bookmarkedMentorPanels = bookmark.bookmarkedMentorPanels.filter(b => b.id !== item.id);
      }
    }

    await bookmark.save();
    res.status(200).json({ message: "Bookmark updated successfully", bookmark });
  } catch (error) {
    console.error("Error in /bookmarks route:", error.message);
    res.status(500).json({ message: "Error saving bookmark", error: error.message });
  }
});

app.get('/bookmarks', async (req, res) => {
  const { email } = req.query;  // Assuming email is passed as a query parameter

  try {
    const bookmark = await bookmarkModel.findOne({ email });

    if (!bookmark) {
      return res.status(404).json({ message: "No bookmarks found for this user" });
    }

    res.status(200).json(bookmark);
  } catch (error) {
    console.error("Error fetching bookmarks:", error.message);
    res.status(500).json({ message: "Error fetching bookmarks", error: error.message });
  }
});



app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
