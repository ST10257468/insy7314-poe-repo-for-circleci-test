/*
ATTRIBUTES:
    Website:SecureBlog Activity
    Author: talia0404
    URL: https://github.com/talia0404/INSY7314/tree/main/SecureBlog%20Activity
    Accessed on: 2025-09-29

*/

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, unique: true, required: true },
  role: { type: String, enum: ["admin", "auditor", "staff"], default: "staff" },
  password: { type: String, required: true }
});

//automatic hash password before saving
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//compare plain text password to the hashed password
employeeSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Employee", employeeSchema);
