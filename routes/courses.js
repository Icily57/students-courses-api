const express = require("express");
const router = express.Router();
const pool = require("../db");

// Create course
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await pool.query(
      "INSERT INTO courses (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM courses");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get course by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM courses WHERE id=$1", [id]);
    if (!result.rows.length) return res.status(404).json({ message: "Course not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update course
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await pool.query(
      "UPDATE courses SET title=$1, description=$2 WHERE id=$3 RETURNING *",
      [title, description, id]
    );
    if (!result.rows.length) return res.status(404).json({ message: "Course not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete course
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM courses WHERE id=$1 RETURNING *", [id]);
    if (!result.rows.length) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
