import { Button } from '@mui/material';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const LoggedIn = () => {

    let navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth).then(() => {
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