import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface TimesState {
  averageAll: number | null;
  averageLow: number | null;
  averageMedium: number | null;
  averageHigh: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: TimesState = {
  averageAll: null,
  averageLow: null,
  averageMedium: null,
  averageHigh: null,
  loading: false,
  error: null,
};

// Async thunks to fetch average times
export const fetchAverageAll = createAsyncThunk('times/fetchAverageAll', async () => {
  const response = await axios.get('http://localhost:8080/api/tasks/stats/average');
  return response.data;
});

export const fetchAverageLow = createAsyncThunk('times/fetchAverageLow', async () => {
  const response = await axios.get('http://localhost:8080/api/tasks/stats/average/low');
  return response.data;
});

export const fetchAverageMedium = createAsyncThunk('times/fetchAverageMedium', async () => {
  const response = await axios.get('http://localhost:8080/api/tasks/stats/average/medium');
  return response.data;
});

export const fetchAverageHigh = createAsyncThunk('times/fetchAverageHigh', async () => {
  const response = await axios.get('http://localhost:8080/api/tasks/stats/average/high');
  return response.data;
});

const timesSlice = createSlice({
  name: 'times',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAverageAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAverageAll.fulfilled, (state, action) => {
        state.loading = false;
        state.averageAll = action.payload;
      })
      .addCase(fetchAverageAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch average time for all tasks';
      })
      .addCase(fetchAverageLow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAverageLow.fulfilled, (state, action) => {
        state.loading = false;
        state.averageLow = action.payload;
      })
      .addCase(fetchAverageLow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch average time for low priority tasks';
      })
      .addCase(fetchAverageMedium.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAverageMedium.fulfilled, (state, action) => {
        state.loading = false;
        state.averageMedium = action.payload;
      })
      .addCase(fetchAverageMedium.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch average time for medium priority tasks';
      })
      .addCase(fetchAverageHigh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAverageHigh.fulfilled, (state, action) => {
        state.loading = false;
        state.averageHigh = action.payload;
      })
      .addCase(fetchAverageHigh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch average time for high priority tasks';
      });
  },
});

export default timesSlice.reducer;