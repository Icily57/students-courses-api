const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Import routes
const studentRoutes = require("./routes/students");
const courseRoutes = require("./routes/courses");

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Students & Courses API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
