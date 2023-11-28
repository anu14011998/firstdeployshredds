import { combineReducers } from 'redux';
import dashReducer from './reducers/dashReducer';

const rootReducer = combineReducers({
  dashboard: dashReducer,
  // Add other reducers if needed
});

export default rootReducer;
