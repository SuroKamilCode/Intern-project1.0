import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const LoggedIn = () => {

    let navigate = useNavigate();

    const handleSignOut = () => {
        console.log(auth.user.multiFactor.user.uid)
        auth.signOut();
        navigate('/');
    }

    return (
        <>
            <div className="logged-in">Zalogowano!</div>
            <div className='logout-button'><Button onClick={handleSignOut} sx={{ margin: .8, }} variant="contained" size='large'>Wyloguj</Button></div>
        </>
    )
}

export default LoggedIn;