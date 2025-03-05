import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Task } from '../interfaces/TaskInterface';

interface TaskListInterface {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskListInterface = {
  tasks: [],
  loading: false,
  error: null,
};

// Async Thunks for fetching and modifying tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('http://localhost:8080/api/tasks');
  return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (task: Task) => {
  const response = await axios.post('http://localhost:8080/api/tasks', task);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, task }: { id: number; task: Task }) => {
  const response = await axios.put(`http://localhost:8080/api/tasks/${id}`, task);
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number) => {
  await axios.delete(`http://localhost:8080/api/tasks/${id}`);
  return id;
});

export const toggleTaskStatus = createAsyncThunk('tasks/toggleTaskStatus', async (id: number) => {
  const response = await axios.put(`http://localhost:8080/api/tasks/toggle/${id}`);
  return response.data;
});

// Helper function to handle extra reducers
const handleAsyncTaskActions = (builder: any, thunk: any, key: keyof TaskListInterface, isArray: boolean = false) => {
  builder
    .addCase(thunk.pending, (state: TaskListInterface) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state: TaskListInterface, action: PayloadAction<any>) => {
      state.loading = false;
      if (isArray) {
        (state[key] as unknown as Task[]) = action.payload;
      } else {
        if (thunk === deleteTask) {
          state.tasks = state.tasks.filter((task: Task) => task.id !== action.payload);
        } else {
          const index = state.tasks.findIndex((task: Task) => task.id === action.payload.id);
          if (index !== -1) {
            state.tasks[index] = action.payload;
          } else {
            state.tasks.push(action.payload);
          }
        }
      }
    })
    .addCase(thunk.rejected, (state: TaskListInterface, action: any) => {
      state.loading = false;
      state.error = action.error.message || `Failed to ${key}`;
    });
};

// Slice, encapsulating all the actions
const TaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncTaskActions(builder, fetchTasks, 'tasks', true);
    handleAsyncTaskActions(builder, createTask, 'tasks');
    handleAsyncTaskActions(builder, updateTask, 'tasks');
    handleAsyncTaskActions(builder, deleteTask, 'tasks');
    handleAsyncTaskActions(builder, toggleTaskStatus, 'tasks');
  },
});

export default TaskSlice.reducer;