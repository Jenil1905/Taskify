const Task = require('../model/task.model.js');


exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from authenticated request
    const { category } = req.query; // Optional filter by category
    
    let tasks;
    if (category) {
      tasks = await Task.find({ userId, category }).sort({ createdAt: -1 });
    } else {
      tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    }
    
    // Format the response to match the API design
    const formattedTasks = tasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      category: task.category,
      isDone: task.isDone,
      createdAt: task.createdAt
    }));

    res.status(200).json(formattedTasks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.createTask = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    
    if (!title || !category) {
      return res.status(400).json({ message: 'Title and category are required' });
    }

    const newTask = new Task({
      userId: req.user.id, 
      title,
      description,
      category,
    });

    const savedTask = await newTask.save();
    
    const formattedTask = {
      id: savedTask._id,
      title: savedTask.title,
      description: savedTask.description,
      category: savedTask.category,
      isDone: savedTask.isDone,
      createdAt: savedTask.createdAt
    };

    res.status(201).json(formattedTask);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { isDone } = req.body;
    
    const task = await Task.findOne({ _id: id, userId: req.user.id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or you are not the owner' });
    }

    if (isDone !== undefined) {
      task.isDone = isDone;
    }

    const updatedTask = await task.save();
    
    const formattedTask = {
      id: updatedTask._id,
      title: updatedTask.title,
      description: updatedTask.description,
      category: updatedTask.category,
      isDone: updatedTask.isDone,
      createdAt: updatedTask.createdAt
    };

    res.status(200).json(formattedTask);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await Task.deleteOne({ _id: id, userId: req.user.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found or you are not the owner' });
    }
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};