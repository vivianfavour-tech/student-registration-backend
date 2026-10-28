const studentModel = require("../models/studentModel");

async function registerStudent(req, res) {
  const { name, course } = req.body || {};

  if (
    typeof name !== "string" ||
    typeof course !== "string" ||
    !name.trim() ||
    !course.trim()
  ) {
    return res.status(400).json({ message: "Name and course are required" });
  }

  try {
    const student = await studentModel.createStudent(name.trim(), course.trim());
    return res.status(201).json({
      message: "Student registered successfully",
      student,
    });
  } catch (error) {
    console.error("Could not register student:", error);
    return res.status(500).json({ message: "Could not register student" });
  }
}

async function getStudents(req, res) {
  try {
    const students = await studentModel.getStudents();
    return res.status(200).json(students);
  } catch (error) {
    console.error("Could not retrieve students:", error);
    return res.status(500).json({ message: "Could not retrieve students" });
  }
}

module.exports = { registerStudent, getStudents };
