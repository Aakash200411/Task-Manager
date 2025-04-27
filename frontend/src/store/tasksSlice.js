import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
    loading: false,
    error: null
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        fetchTasksStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTasksSuccess: (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        },
        fetchTasksFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action) => {
            const index = state.tasks.findIndex(task => task._id === action.payload._id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task._id !== action.payload);
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const {
    fetchTasksStart,
    fetchTasksSuccess,
    fetchTasksFailure,
    addTask,
    updateTask,
    deleteTask,
    clearError
} = tasksSlice.actions;

export default tasksSlice.reducer; 