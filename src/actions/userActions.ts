
export const setUser = (user: string) => {
    return {
        type: "SET_USER",
        payload: user
    }
}

export const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}



