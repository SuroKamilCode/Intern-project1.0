import { combineReducers } from "redux";
import currentUser from './currentUser';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    currentUser,
    errorReducer
})


export default rootReducer;