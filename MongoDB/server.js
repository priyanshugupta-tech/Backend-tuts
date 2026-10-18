const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = 5000;

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/school-db")
  .then(() => console.log("mongodb connected📎"))
  .catch((err) => console.log("error in connecting mongodb: ", err));

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

app.get("/students", async (req, res) => {
  const allStudent = await Student.find({});
  return res.status(200).send(`<ul>
        ${allStudent
          .map((student) => {
            return `<li>${student.studentName}</li>\n`;
          })
          .join("")}
    </ul>`);
});

app.get("/api/students", async (req, res) => {
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
});

app.post("/api/students", async (req, res) => {
  const newStudent = await Student.create({
    studentName: req.body.studentName,
    department: req.body.department,
    gpa: req.body.gpa,
    hobby: req.body.hobby,
  });

  console.log(newStudent);

  return res.status(201).json({ message: "success" });
});

app.get("/api/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const reqStudent = await Student.findById(id);
    return res.status(200).json({ status: "success", data: reqStudent });
  } catch (error) {
    console.log("error occured: ", error);
    return res.status(500).json({ status: "failed", message: err });
  }
});

app.patch("/api/students/:id", async (req, res) => {
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
});

app.delete("/api/students/:id", async (req, res) => {
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
});
app.listen(PORT, () => console.log(`app is listening at PORT: ${PORT}`));
