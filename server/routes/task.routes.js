// src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller.js');
const isAuth = require('../middleware/isAuth.js');

// All routes in this file are protected by the 'isAuth' middleware


router.get('/get-task', isAuth, taskController.getTasks);


router.post('/add-task', isAuth, taskController.createTask);


router.patch('/:id', isAuth, taskController.updateTask);

router.delete('/:id', isAuth, taskController.deleteTask);

module.exports = router;