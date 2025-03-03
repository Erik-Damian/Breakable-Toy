import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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

// General function to create async thunks
const createFetchAverageThunk = (type: string, url: string) => {
  return createAsyncThunk(type, async () => {
    const response = await axios.get(url);
    return response.data;
  });
};

// Async thunks to fetch average times
export const fetchAverageAll = createFetchAverageThunk('times/fetchAverageAll', 'http://localhost:8080/api/tasks/stats/average');
export const fetchAverageLow = createFetchAverageThunk('times/fetchAverageLow', 'http://localhost:8080/api/tasks/stats/average/low');
export const fetchAverageMedium = createFetchAverageThunk('times/fetchAverageMedium', 'http://localhost:8080/api/tasks/stats/average/medium');
export const fetchAverageHigh = createFetchAverageThunk('times/fetchAverageHigh', 'http://localhost:8080/api/tasks/stats/average/high');

// Helper function to handle extra reducers
const handleAsyncActions = (builder: any, thunk: any, key: 'averageAll' | 'averageLow' | 'averageMedium' | 'averageHigh') => {
  builder
    .addCase(thunk.pending, (state: TimesState) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state: TimesState, action: PayloadAction<number>) => {
      state.loading = false;
      state[key] = action.payload;
    })
    .addCase(thunk.rejected, (state: TimesState, action: any) => {
      state.loading = false;
      state.error = action.error.message || `Failed to fetch ${key}`;
    });
};

const timesSlice = createSlice({
  name: 'times',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncActions(builder, fetchAverageAll, 'averageAll');
    handleAsyncActions(builder, fetchAverageLow, 'averageLow');
    handleAsyncActions(builder, fetchAverageMedium, 'averageMedium');
    handleAsyncActions(builder, fetchAverageHigh, 'averageHigh');
  },
});

export default timesSlice.reducer;