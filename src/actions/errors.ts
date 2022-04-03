const logInError = (userObj: {}) => {
    return {
        type: "LOG_IN_ERROR",
        payload: userObj
    }
}


export { logInError };

