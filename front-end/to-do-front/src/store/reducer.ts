import { combineReducers } from '@reduxjs/toolkit';
import TaskReducer from './actions';


//Reducer, 
const rootReducer = combineReducers({
  tasks: TaskReducer, 
});

export default rootReducer;
