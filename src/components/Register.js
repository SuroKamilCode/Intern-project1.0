import { Button, TextField } from '@mui/material';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import allActions from '../actions';
import loader from '../assets/gifs/loading.gif';
import { auth } from '../firebase';

const Register = () => {

    const [email, setEmailValue] = useState('');
    const [password, setPassValue] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
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

    const handleConfirmPass = (e) => {
        let value = e.target.value;
        setConfirmPass(value);
    }


    const handleRegister = e => {
        if (password === confirmPass) {
            e.preventDefault();
            setLoading(true);
            setError(false);
            setErrMessage(null);
            setEmailErrorHandler(false);
            setPassErrorHandler(false);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential;
                    console.log(user)
                    navigate('/success');
                }).catch(error => {
                    setError(true);
                    dispatch(allActions.logInError(error.code));
                    setLoading(false);
                    setErrMessage('Błąd rejestracji, spróbuj jeszcze raz!');
                    if (error.code === 'auth/email-already-in-use') {
                        setError(true);
                        dispatch(allActions.logInError(error.code));
                        setLoading(false);
                        setErrMessage('Użytkownik o podanym adresie E-mail jest już zarejestrowany!');
                    }
                })
        } else if (password !== confirmPass) {
            setError(true);
            setLoading(false);
            setErrMessage('Hasła nie są identyczne!');
        }
    }


    return (
        <div className='container App'>
            {loading ? <img src={loader} alt="ładowanie" /> :
                <div>
                    <h1 className='title'>Zarejestruj się!</h1>
                    <TextField onChange={handleEmail} sx={{ margin: .8 }} className='input' type='email' id="outlined-basic" label="E-mail" spacing="" variant="outlined" autoFocus required error={emailErrorHandler} />
                    {emailFormat ? <p className="err-msg">Nieprawidłowy format Email!</p> : null}
                    <TextField onChange={handlePass} sx={{ margin: .8 }} className='input' type='password' id="outlined-basic" label="Hasło" variant="outlined" required error={passErrorHandler} />
                    <TextField onChange={handleConfirmPass} sx={{ margin: .8 }} className='input' type='password' id="outlined-basic" label="Powtórz hasło" variant="outlined" required error={passErrorHandler} />
                    {passFormat ? <p className="err-msg">Hasło musi zawierać od 8 do 20 znaków w tym conajmniej jedną cyfrę!</p> : null}
                    <Link to="/register"><Button onClick={handleRegister} sx={{ margin: .8 }} className='register-button' variant="contained" size='large'>Zarejestruj</Button></Link>
                </div>}
            {logInError ? <p className="err-msg">{errMessage}</p> : null}
        </div>
    )
}

export default Register;

// (?=.*[a-z])