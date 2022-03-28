import { Button, TextField } from '@mui/material';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import allActions from '../actions';
import loader from '../assets/gifs/loading.gif';
import { auth } from '../firebase';

const Login = () => {

    const [email, setEmailValue] = useState('');
    const [password, setPassValue] = useState('');
    const [logInError, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState(null);
    const [emailErrorHandler, setEmailErrorHandler] = useState(false);
    const [passErrorHandler, setPassErrorHandler] = useState(false);
    const [emailFormat, setEmailFormat] = useState(false);
    const [passFormat, setPassFormat] = useState(false);

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordFormat = /^(?=.*\d).{8,20}$/;

    const users = useSelector(state => state.currentUser);
    const errors = useSelector(state => state.errorReducer);

    const handleEmail = (e) => {
        let value = e.target.value;
        if (e.target.value === '') {
            setEmailErrorHandler(false);
            setEmailFormat(false)
        } else if (value.match(mailformat)) {
            setEmailErrorHandler(false);
            setEmailValue(value)
            setEmailFormat(false)
        } else if (!value.match(mailformat)) {
            setEmailErrorHandler(true);
            setEmailFormat(true)
        }
    }

    const handlePass = (e) => {
        let value = e.target.value;
        if (e.target.value === '') {
            setPassErrorHandler(false);
            setPassFormat(false);
        } else if (value.match(passwordFormat)) {
            setPassErrorHandler(false)
            setPassValue(value);
            setPassFormat(false);
        } else if (!value.match(passwordFormat)) {
            setPassErrorHandler(true);
            setPassFormat(true);
        }
    }

    const logIn = e => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        setErrMessage(null);
        setEmailErrorHandler(false);
        setPassErrorHandler(false);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential;
                dispatch(allActions.setUser(user.user.uid));
                if (user.user.uid) {
                    navigate('/profile');
                }
            }).catch(error => {
                setError(true);
                dispatch(allActions.logInError(error.code));
                setLoading(false);
                if (error.code === 'auth/invalid-email') {
                    setErrMessage('Użytkownik o podanym emailu nie istnieje!');
                    setEmailErrorHandler(true);
                } else if (error.code === 'auth/wrong-password') {
                    setErrMessage('Wprowadzono niepoprawne hasło!');
                    setPassErrorHandler(true);
                } else if (error.code === 'auth/internal-error') {
                    setErrMessage('Błąd logowania! Spróbuj ponownie.');
                    setEmailErrorHandler(true);
                    setPassErrorHandler(true);
                } else if (error.code === 'auth/user-not-found') {
                    setErrMessage('Nie znaleziono użytkownika o podanym adresie Email');
                } else {
                    setErrMessage('Niepoprawne dane logowania!');
                    setEmailErrorHandler(true);
                    setPassErrorHandler(true);
                }
            })
    }
    // if (logInError) {
    //     setTimeout(() => setError(false), 5000);
    //     setTimeout(() => dispatch(allActions.restartError()), 5000);
    //     setTimeout(() => setErrMessage(null), 5000);
    // }

    // if (emailErrorHandler === true) {
    //     setTimeout(() => setEmailErrorHandler(false), 5000);
    // }

    // if (passErrorHandler === true) {
    //     setTimeout(() => setPassErrorHandler(false), 5000);
    // }

    return (
        <div className='container App'>
            {loading ? <img src={loader} alt="ładowanie" /> : <div><h1 className='title'>Zaloguj</h1>
                <TextField onChange={handleEmail} sx={{ margin: .8 }} className='input' type='email' id="outlined-basic" label="E-mail" spacing="" variant="outlined" autoFocus required error={emailErrorHandler} />
                {emailFormat ? <p className="err-msg">Nieprawidłowy format Email!</p> : null}
                <TextField onChange={handlePass} sx={{ margin: .8 }} className='input' type='password' id="outlined-basic" label="Hasło" variant="outlined" required error={passErrorHandler} />
                {passFormat ? <p className="err-msg">Hasło musi zawierać od 8 do 20 znaków w tym conajmniej jedną cyfrę!</p> : null}
                <Button onClick={logIn} sx={{ margin: .8 }} className='login-button' variant="contained" size='large'>Zaloguj</Button>
                <Link to="/register"><Button sx={{ margin: .8 }} className='register-button' underline="none" variant="contained" size='large'>Zarejestruj</Button></Link></div>}
            {logInError ? <p className="err-msg">{errMessage}</p> : null}

        </div>
    )
}

export default Login;
