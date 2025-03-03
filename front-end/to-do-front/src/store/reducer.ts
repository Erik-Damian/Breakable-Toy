import { combineReducers } from '@reduxjs/toolkit';
import TaskReducer from './TaskSlice';
import TimeReducer from './TimesSlice';


//Reducer, 
const rootReducer = combineReducers({
  tasks: TaskReducer, 
  times: TimeReducer,
});

export default rootReducer;
