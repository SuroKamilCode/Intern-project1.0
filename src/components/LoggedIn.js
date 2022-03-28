import { Button } from '@mui/material';
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import allActions from '../actions/index';
import { auth } from '../firebase';


const LoggedIn = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(state => state.currentUser);


    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(allActions.logOut());
            // localStorage.removeItem('authUser')
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });

    }

    return (
        <>
            <div className="logged-in">Zalogowano!</div>
            <div className='logout-button'><Button onClick={handleSignOut} sx={{ margin: .8, }} variant="contained" size='large'>Wyloguj</Button></div>
        </>
    )
}

export default LoggedIn;