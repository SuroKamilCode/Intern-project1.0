import { Button } from '@mui/material';
import { signOut } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import allActions from '../actions/index';
import { auth } from '../firebase';
import { useAppSelector } from '../hooks';


const LoggedIn: React.FC = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useAppSelector(state => state.currentUser);


    const handleSignOut: () => void = () => {
        signOut(auth).then(() => {
            dispatch(allActions.logOut());
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