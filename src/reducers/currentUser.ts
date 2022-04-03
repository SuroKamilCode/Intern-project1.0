import { PayloadAction } from '@reduxjs/toolkit';

interface ActionProps {
    payload: any,
    type: string
}

const currentUser = (state = {}, action: PayloadAction<ActionProps>) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            }
        case "LOG_OUT":
            return {
                ...state,
                user: {},
                loggedIn: false
            }
        default:
            return state;
    }
};

export default currentUser;