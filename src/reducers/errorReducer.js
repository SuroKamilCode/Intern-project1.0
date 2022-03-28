const errorReducer = (state = {}, action) => {
    switch (action.type) {
        case "LOG_IN_ERROR":
            return action.payload;
        case "RESTART_ERROR":
            return {};
        default:
            return state;
    }
};

export default errorReducer;