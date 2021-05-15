//this reducer combines all the code of other reducer

import { combineReducers } from "redux";

import userReducer from "./user/user-reducer";

export default combineReducers({
  user: userReducer,
});
