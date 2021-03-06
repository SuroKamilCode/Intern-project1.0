import { Button, TextField } from '@mui/material';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import allActions from '../actions';
import loader from '../assets/gifs/loading.gif';
import { auth } from '../firebase';
import { useAppSelector } from '../hooks';

const Login: React.FC = () => {

    const [email, setEmailValue] = useState<string>('');
    const [password, setPassValue] = useState<string>('');
    const [logInError, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string | null>(null);
    const [emailErrorHandler, setEmailErrorHandler] = useState<boolean>(false);
    const [passErrorHandler, setPassErrorHandler] = useState<boolean>(false);
    const [emailFormat, setEmailFormat] = useState<boolean>(false);
    const [passFormat, setPassFormat] = useState<boolean>(false);

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const mailformat: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordFormat: RegExp = /^(?=.*\d).{8,20}$/;

    const users = useAppSelector(state => state.currentUser);
    const errors = useAppSelector(state => state.errorReducer);

    const handleEmail: (e: React.ChangeEvent<any>) => void = (e: React.ChangeEvent<any>) => {
        let value: string = e.target.value;
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

    const handlePass: (e: React.ChangeEvent<any>) => void = (e: React.ChangeEvent<any>) => {
        let value: string = e.target.value;
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

    const logIn: (e: React.ChangeEvent<any>) => void = (e: React.ChangeEvent<any>) => {
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
                    setErrMessage('U??ytkownik o podanym emailu nie istnieje!');
                    setEmailErrorHandler(true);
                } else if (error.code === 'auth/wrong-password') {
                    setErrMessage('Wprowadzono niepoprawne has??o!');
                    setPassErrorHandler(true);
                } else if (error.code === 'auth/internal-error') {
                    setErrMessage('B????d logowania! Spr??buj ponownie.');
                    setEmailErrorHandler(true);
                    setPassErrorHandler(true);
                } else if (error.code === 'auth/user-not-found') {
                    setErrMessage('Nie znaleziono u??ytkownika o podanym adresie Email');
                } else {
                    setErrMessage('Niepoprawne dane logowania!');
                    setEmailErrorHandler(true);
                    setPassErrorHandler(true);
                }
            })
    }

    return (
        <div className='container App'>
            {loading ? <img src={loader} alt="??adowanie" /> : <div><h1 className='title'>Zaloguj</h1>
                <TextField onChange={handleEmail} sx={{ margin: .8 }} className='input' type='email' id="outlined-basic" label="E-mail" variant="outlined" autoFocus required error={emailErrorHandler} />
                {emailFormat ? <p className="err-msg">Nieprawid??owy format Email!</p> : null}
                <TextField onChange={handlePass} sx={{ margin: .8 }} className='input' type='password' id="outlined-basic" label="Has??o" variant="outlined" required error={passErrorHandler} />
                {passFormat ? <p className="err-msg">Has??o musi zawiera?? od 8 do 20 znak??w w tym conajmniej jedn?? cyfr??!</p> : null}
                <Button onClick={logIn} sx={{ margin: .8 }} className='login-button' variant="contained" size='large'>Zaloguj</Button>
                <Link to="/register"><Button sx={{ margin: .8 }} className='register-button' variant="contained" size='large'>Zarejestruj</Button></Link></div>}
            {logInError ? <p className="err-msg">{errMessage}</p> : null}

        </div>
    )
}

export default Login;
