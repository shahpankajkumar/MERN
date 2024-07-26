const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const cors = require('cors');
router.use(cors());


// Create user (Accessible by everyone)
router.post('/create', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // View all employees
  router.get('/employees', async (req, res) => {
    try {
      const employees = await User.find({ role: 'employee' });
      res.status(200).send(employees);
    } catch (err) {
      res.status(500).send(err);
    }
  });
    
 // Update employee
router.put('/update', authMiddleware.isManager, async (req, res) => {
  try {
      const { uid, name, email, phone, department } = req.body;
     const user = await User.findByIdAndUpdate({_id:uid}, { name, email, phone, department }, { new: true });
     res.json(user);
  } catch (err) {
      res.status(500).send(err.message);
  }
});

// Delete employee
router.post('/delete', authMiddleware.isManager, async (req, res) => {
  try {
      await User.findByIdAndDelete({_id: req.body.uid});
      res.send('Department deleted');
  } catch (err) {
      res.status(500).send(err.message);
  }
});

router.get('/get/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      res.json(user);
  } catch (err) {
      res.status(500).send(err.message);
  }
});

// search employee using all fields
router.get('/search', async (req, res) => {
  const { search } = req.query;
  try {
    let users = [];
    if(search){
      users = await User.find({ $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ], role: { $ne: 'manager' }});
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});
  module.exports = router;

