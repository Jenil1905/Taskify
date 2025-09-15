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
        // Corrected URL to match the backend route: GET /tasks/get-task
        const url = category ? `/tasks/get-task?category=${category}` : '/tasks/get-task';
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
        // Corrected URL to match the backend route: POST /tasks/add-task
        const response = await api.post('/tasks/add-task', taskData);
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
        // This URL is already correct: PATCH /tasks/:id
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
        // This URL is already correct: DELETE /tasks/:id
        const response = await api.delete(`/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error.response?.data || error.message);
        throw error;
    }
};