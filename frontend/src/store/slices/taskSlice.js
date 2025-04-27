import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with auth header
const createAuthAxios = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await createAuthAxios().get('/tasks');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch tasks');
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/create',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await createAuthAxios().post('/tasks', taskData);
      toast.success('Task created!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
      return rejectWithValue(error.response.data);
    }
  }
);

export const editTask = createAsyncThunk(
  'tasks/edit',
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const response = await createAuthAxios().put(`/tasks/${id}`, taskData);
      toast.success('Task updated!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (id, { rejectWithValue }) => {
    try {
      await createAuthAxios().delete(`/tasks/${id}`);
      toast.success('Task deleted!');
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filter: 'all',
  search: '',
  categories: []
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        // Extract unique categories
        state.categories = [...new Set(action.payload.map(task => task.category).filter(Boolean))];
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch tasks';
      })
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
        if (action.payload.category && !state.categories.includes(action.payload.category)) {
          state.categories.push(action.payload.category);
        }
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create task';
      })
      // Edit Task
      .addCase(editTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (action.payload.category && !state.categories.includes(action.payload.category)) {
          state.categories.push(action.payload.category);
        }
      })
      .addCase(editTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update task';
      })
      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete task';
      });
  }
});

export const { clearError, setFilter, setSearch, setCategories } = taskSlice.actions;
export default taskSlice.reducer; 