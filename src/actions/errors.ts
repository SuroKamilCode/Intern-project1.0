
const logInError = (errObj: {}) => {
    return {
        type: "LOG_IN_ERROR",
        payload: errObj
    }
}


export { logInError };

