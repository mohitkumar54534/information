const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookModel = require('./model/books');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 6001;

mongoose
  .connect(
    "mongodb+srv://mohitkumar54534:Mohit54321@cluster0.dodtgio.mongodb.net/employee?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get('/getbooks', (req, res) => {
  bookModel.find()
    .then(books => res.json(books))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
