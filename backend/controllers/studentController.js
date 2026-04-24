const Student = require("../models/Student");

// Get all students
exports.getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// Add student
exports.addStudent = async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
};

// Update student
exports.updateStudent = async (req, res) => {
  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// Delete student
exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};