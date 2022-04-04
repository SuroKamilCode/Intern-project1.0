import { Action } from './actionTypes';

const initialState = {};

const errorReducer = (state: {} = initialState, action: Action) => {
    switch (action.type) {
        case "LOG_IN_ERROR":
            return action.payload;
        default:
            return state;
    }
};

export default errorReducer;