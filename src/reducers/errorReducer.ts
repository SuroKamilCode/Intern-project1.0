import { PayloadAction } from '@reduxjs/toolkit';

interface ActionProps {
    payload: any,
    type: string
}

const errorReducer = (state = {}, action: PayloadAction<ActionProps>) => {
    switch (action.type) {
        case "LOG_IN_ERROR":
            return action.payload;
        default:
            return state;
    }
};

export default errorReducer;