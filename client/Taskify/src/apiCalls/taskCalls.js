import axios from 'axios';
import { API_BASE_URL } from './config.js';

// Create a single Axios instance for all API calls
// It's configured to automatically handle cookies with 'withCredentials: true'
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// Fetch all tasks for the logged-in user.
// The JWT is automatically sent in a cookie with this request.
export const fetchTasks = async (category = '') => {
    try {
        const url = category ? `/tasks?category=${category}` : '/tasks';
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error.response?.data || error.message);
        throw error;
    }
};

// Create a new task.
// The JWT is automatically sent in a cookie with this request.
export const createTask = async (taskData) => {
    try {
        const response = await api.post('/tasks', taskData);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error.response?.data || error.message);
        throw error;
    }
};

// Update an existing task.
// The JWT is automatically sent in a cookie with this request.
export const updateTask = async (taskId, updatedData) => {
    try {
        const response = await api.patch(`/tasks/${taskId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error.response?.data || error.message);
        throw error;
    }
};

// Delete a task.
// The JWT is automatically sent in a cookie with this request.
export const deleteTask = async (taskId) => {
    try {
        const response = await api.delete(`/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error.response?.data || error.message);
        throw error;
    }
};