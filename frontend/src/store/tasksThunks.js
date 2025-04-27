import { tasksAPI } from '../services/api';
import {
    fetchTasksStart,
    fetchTasksSuccess,
    fetchTasksFailure,
    addTask,
    updateTask,
    deleteTask
} from './tasksSlice';

export const fetchTasks = () => async (dispatch) => {
    try {
        dispatch(fetchTasksStart());
        const response = await tasksAPI.getTasks();
        dispatch(fetchTasksSuccess(response.data));
    } catch (error) {
        dispatch(fetchTasksFailure(error.response?.data?.message || 'Failed to fetch tasks'));
    }
};

export const createTask = (taskData) => async (dispatch) => {
    try {
        const response = await tasksAPI.createTask(taskData);
        dispatch(addTask(response.data));
    } catch (error) {
        dispatch(fetchTasksFailure(error.response?.data?.message || 'Failed to create task'));
    }
};

export const editTask = (id, taskData) => async (dispatch) => {
    try {
        const response = await tasksAPI.updateTask(id, taskData);
        dispatch(updateTask(response.data));
    } catch (error) {
        dispatch(fetchTasksFailure(error.response?.data?.message || 'Failed to update task'));
    }
};

export const removeTask = (id) => async (dispatch) => {
    try {
        await tasksAPI.deleteTask(id);
        dispatch(deleteTask(id));
    } catch (error) {
        dispatch(fetchTasksFailure(error.response?.data?.message || 'Failed to delete task'));
    }
}; 