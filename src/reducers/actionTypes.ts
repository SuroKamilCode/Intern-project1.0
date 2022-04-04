
interface setUserAction {
    type: "SET_USER",
    payload: any
}

interface logOutAction {
    type: "LOG_OUT",
    payload: {}
}

interface logInError {
    type: "LOG_IN_ERROR"
    payload: {}
}

export type Action = setUserAction | logOutAction | logInError

