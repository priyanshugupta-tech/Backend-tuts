const { Student } = require("../models/student.model");

const handleGetStudent = async (req, res) => {
  try {
    const allStudents = await Student.find({});
    return res.status(200).json(allStudents);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to fetch students",
      error: err.message,
    });
  }
};

const handleCreateStudent = async (req, res) => {
  const newStudent = await Student.create({
    studentName: req.body.studentName,
    department: req.body.department,
    gpa: req.body.gpa,
    hobby: req.body.hobby,
  });

  console.log(newStudent);

  return res.status(201).json({ message: "success" });
};

const handleGetStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const reqStudent = await Student.findById(id);
    return res.status(200).json({ status: "success", data: reqStudent });
  } catch (error) {
    console.log("error occured: ", error);
    return res.status(500).json({ status: "failed", message: err });
  }
};

const handleUpdateStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const newStudent = await Student.findByIdAndUpdate(id, {
      studentName: req.body.studentName,
      department: req.body.department,
      gpa: req.body.gpa,
      hobby: req.body.hobby || null,
    });
    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.log("error occured: ", error);
    return res.status(500).json({ status: "failure", error: error });
  }
};

const handleDeleteStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    await Student.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ status: "success", message: "Student Deleted" });
  } catch (error) {
    console.log("error occured: ", error);
    res.status(500).json({ status: "failed", message: error });
  }
};

module.exports = {
  handleGetStudent,
  handleCreateStudent,
  handleGetStudentById,
  handleUpdateStudentById,
  handleDeleteStudentById,
};
