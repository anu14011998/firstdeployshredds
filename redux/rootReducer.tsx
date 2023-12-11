import { combineReducers } from 'redux';
import dashReducer from './reducers/dashReducer';
import loginReducer from './reducers/loginReducer';
import sellReducer from './reducers/sellReducer';
import datetimeReducer from './reducers/sdatetimeReducer';
import myScrapReducer from './reducers/myScrapReducer';
import sAddressReducer from './reducers/sAddressReducer';
import sellADDbtnReducer from './reducers/sellADDbtnReducer';

const rootReducer = combineReducers({
  dashboard: dashReducer,
  // Add other reducers if needed
  login: loginReducer,
  sell: sellReducer,
  datetime: datetimeReducer,
  scrap: myScrapReducer,
  address: sAddressReducer,
  sellFormData: sellADDbtnReducer,


});

export default rootReducer;
