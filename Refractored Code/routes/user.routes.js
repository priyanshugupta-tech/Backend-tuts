const express = require("express");
const router = express.Router();
const {
  handleGetStudent,
  handleCreateStudent,
  handleGetStudentById,
  handleUpdateStudentById,
  handleDeleteStudentById,
} = require("../controllers/students.controller");

router.get("/", handleGetStudent);

router.post("/", handleCreateStudent);

router.get("/:id", handleGetStudentById);

router.patch("/:id", handleUpdateStudentById);

router.delete("/:id", handleDeleteStudentById);

module.exports = router;
