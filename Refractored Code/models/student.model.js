const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  gpa: {
    type: Number,
    required: true,
  },
  hobby: {
    type: Array,
    default: null,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
