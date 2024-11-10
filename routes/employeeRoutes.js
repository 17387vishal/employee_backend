// routes/employeeRoutes.js
const express = require('express');
const multer = require('multer'); // For handling file uploads
const { createEmployee, editEmployee, deleteEmployee } = require('../controllers/employeeController');
const router = express.Router();
const path = require('path');
const { getAllEmployees } = require('../controllers/employeeController');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with unique filename
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb('Error: Images only (jpg, jpeg, png)');
  },
}).single('profileImage'); // Field name is 'profileImage'

// Routes for employee management
router.post('/create', upload, createEmployee);  // Create employee
router.put('/edit/:id', upload, editEmployee);   // Edit employee
router.delete('/delete/:id', deleteEmployee);   // Delete employee
router.get('/all', getAllEmployees);
module.exports = router;
