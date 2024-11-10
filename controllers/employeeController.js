// controllers/employeeController.js
const Employee = require('../models/Employee'); // Employee model (adjust path if necessary)
const path = require('path');

// Create employee
exports.createEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  const profileImage = req.file ? req.file.path : null;

  // Basic validation
  if (!name || !email || !mobile || !designation || !gender || !course) {
    return res.status(400).json({ message: 'Please fill in all the required fields.' });
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  // Validate mobile number (should be a 10-digit number)
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(mobile)) {
    return res.status(400).json({ message: 'Please enter a valid mobile number.' });
  }

  try {
    // Create a new employee
    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      profileImage,
    });

    // Save the employee to the database
    await newEmployee.save();

    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating employee', error });
  }
};

// Edit employee
exports.editEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, gender, course } = req.body;
  const profileImage = req.file ? req.file.path : null;

  // Basic validation
  if (!name || !email || !mobile || !designation || !gender || !course) {
    return res.status(400).json({ message: 'Please fill in all the required fields.' });
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  // Validate mobile number (should be a 10-digit number)
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(mobile)) {
    return res.status(400).json({ message: 'Please enter a valid mobile number.' });
  }

  try {
    // Find the employee by ID and update
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Update employee details
    employee.name = name;
    employee.email = email;
    employee.mobile = mobile;
    employee.designation = designation;
    employee.gender = gender;
    employee.course = course;
    if (profileImage) {
      employee.profileImage = profileImage;
    }

    // Save the updated employee
    await employee.save();

    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating employee', error });
  }
};
// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    // Fetch all employees from the database
    const employees = await Employee.find();

    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: 'No employees found' });
    }

    // Count total number of employees in the database
    const totalEmployees = await Employee.countDocuments();

    // Return both employee data and total employee count
    res.status(200).json({ employees, totalEmployees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving employees', error });
  }
};
// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    // Use findByIdAndDelete directly on the model to delete the employee
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting employee', error });
  }
};