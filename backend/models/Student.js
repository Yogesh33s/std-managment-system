const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  registrationNo: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  email: String,
  contact: String,
  course: String,
  batch: String
});

module.exports = mongoose.model("Student", studentSchema);