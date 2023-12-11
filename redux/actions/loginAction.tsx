// loginActions.js
import { SET_USER_DATA } from "../cosntants";

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});
