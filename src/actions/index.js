import { logInError, restartError } from './errors';
import { logOut, setUser } from './userActions';

const allActions = {
    setUser,
    logOut,
    logInError,
    restartError
}

export default allActions
