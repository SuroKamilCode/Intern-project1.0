import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {

    const [emailValue, setEmailValue] = useState('');
    const [passValue, setPassValue] = useState('');
    let navigate = useNavigate();

    const handleOnChangeEmail = e => {
        e.preventDefault();
        let writtenEmail = e.target.value;
        setEmailValue(writtenEmail);
    };

    const handleOnChangePass = e => {
        e.preventDefault();
        let writtenPass = e.target.value;
        setPassValue(writtenPass);
    };

    const signIn = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailValue, passValue
        ).then(auth => {
            console.log(auth.user.multiFactor.user.uid)
            navigate('/profile');
        }).catch(error => {
            alert('Błędne logowanie!');
        })
    }

    return (
        <div className='container App'>
            <h1 className='title'>Logowanie</h1>
            <TextField onChange={handleOnChangeEmail} sx={{ margin: .8 }} className='input' type='email' id="outlined-basic" label="E-mail" spacing="" variant="outlined" />
            <TextField onChange={handleOnChangePass} sx={{ margin: .8 }} className='input' type='password' id="outlined-basic" label="Hasło" variant="outlined" />
            <Button onClick={signIn} sx={{ margin: .8 }} className='login-button' variant="contained" size='large'>Zaloguj</Button>
        </div>

    )
}

export default Login;