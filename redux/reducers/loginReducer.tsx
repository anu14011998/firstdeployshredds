// loginReducer.js
import { SET_USER_DATA } from "../cosntants";

const initialState = {
  data: [],
};

const loginReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
