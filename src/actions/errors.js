const logInError = (userObj) => {
    return {
        type: "LOG_IN_ERROR",
        payload: userObj
    }
}

const restartError = () => {
    return {
        type: "RESTART_ERROR",
    }
}

export { logInError, restartError };

