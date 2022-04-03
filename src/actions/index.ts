import { logInError } from './errors';
import { logOut, setUser } from './userActions';

const allActions = {
    setUser,
    logOut,
    logInError,
}

export default allActions
