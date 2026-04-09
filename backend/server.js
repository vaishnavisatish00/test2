const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Database Connectivity [cite: 16]
mongoose.connect('mongodb://localhost:27017/studentDB')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Connection failed", err));

// 2. Define Student Schema [cite: 94]
const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    rollNo: String,
    contact: String
});
const Student = mongoose.model('Student', studentSchema);

// 3. API Routes for CRUD Operations [cite: 17, 93]

// GET: Display Student records [cite: 98]
app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// POST: Insert student details [cite: 96]
app.post('/students/add', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).send("Error saving data");
    }
});

// DELETE: Remove record based on Roll No [cite: 96]
app.delete('/students/delete/:id', async (req, res) => {
    await Student.findOneAndDelete({ rollNo: req.params.id });
    res.json({ message: "Student Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));