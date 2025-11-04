const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://saritayadav45522_db_user:ZUwoumcWzobkAP0C@cluster0.5ldsq1d.mongodb.net/recordstore?appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Model (Schema)
const recordSchema = new mongoose.Schema({
  artist: String,
  title: String,
  genre: String,
  price: Number,
  image: String,
});

const Record = mongoose.model("Record", recordSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Record Store API 🎵");
});

// Get all records
app.get("/records", async (req, res) => {
  const { search } = req.query;

  let query = {};

  if (search) {
    query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { artist: { $regex: search, $options: "i" } },
        { genre: { $regex: search, $options: "i" } }
      ]
    };
  }

  const records = await Record.find(query);
  res.json(records);
});


// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
