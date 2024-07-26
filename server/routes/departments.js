const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const authMiddleware = require('../middleware/authMiddleware');
const cors = require('cors');
router.use(cors());

// Create Department
router.post('/add', authMiddleware.isManager, async (req, res) => {
    const { name } = req.body;
    try {
        const department = new Department({ name });
        await department.save();
        res.status(201).json(department);
    } catch (err) {s
        res.status(400).send(err.message);
    }
});

// Read Departments
router.get('/get', async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Find Department
router.get('/get/:id', async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        res.json(department);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update Department
router.put('/updateDept', authMiddleware.isManager, async (req, res) => {
    try {
        const { name, uid } = req.body;
       const department = await Department.findByIdAndUpdate({_id:uid}, { name }, { new: true });
       res.json(department);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete Department
router.post('/delete', authMiddleware.isManager, async (req, res) => {
    try {
        await Department.findByIdAndDelete({_id: req.body.uid});
        res.send('Department deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
