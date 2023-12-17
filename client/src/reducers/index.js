import { combineReducers } from "redux";

import drives from "./drives";
import authReducer from "./auth";


export const reducers = combineReducers({ drives, authReducer })