import { Button, TextField } from '@mui/material';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import allActions from '../actions';
import loader from '../assets/gifs/loading.gif';
import { auth } from '../firebase';
import { useAppSelector } from '../hooks';

const Register: React.FC = () => {

    const [email, setEmailValue] = useState<string>('');
    const [password, setPassValue] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');
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

    const handleConfirmPass: (e: React.ChangeEvent<any>) => void = (e: React.ChangeEvent<any>) => {
        let value: string = e.target.value;
        setConfirmPass(value);
    }


    const handleRegister: (e: React.ChangeEvent<any>) => void = (e: React.ChangeEvent<any>) => {
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
                    setErrMessage('B????d rejestracji, spr??buj jeszcze raz!');
                    if (error.code === 'auth/email-already-in-use') {
                        setError(true);
                        dispatch(allActions.logInError(error.code));
                        setLoading(false);
                        setErrMessage('U??ytkownik o podanym adresie E-mail jest ju?? zarejestrowany!');
                    }
                })
        } else if (password !== confirmPass) {
            setError(true);
            setLoading(false);
            setErrMessage('Has??a nie s?? identyczne!');
        }
    }


    return (
        <div className='container App'>
            {loading ? <img src={loader} alt="??adowanie" /> :
                <div>
                    <h1 className='title'>Zarejestruj si??!</h1>
                    <TextField onChange={handleEmail} sx={{ margin: .8 }} className='input' type='email' id="outlined-basic" label="E-mail" variant="outlined" autoFocus required error={emailErrorHandler} />
                    {emailFormat ? <p className="err-msg">Nieprawid??owy format Email!</p> : null}
                    <TextField onChange={handlePass} sx={{ margin: .8 }} className='input' type='password' id="outlined-basic" label="Has??o" variant="outlined" required error={passErrorHandler} />
                    <TextField onChange={handleConfirmPass} sx={{ margin: .8 }} className='input' type='password' id="outlined-basic" label="Powt??rz has??o" variant="outlined" required error={passErrorHandler} />
                    {passFormat ? <p className="err-msg">Has??o musi zawiera?? od 8 do 20 znak??w w tym conajmniej jedn?? cyfr??!</p> : null}
                    <Link to="/register"><Button onClick={handleRegister} sx={{ margin: .8 }} className='register-button' variant="contained" size='large'>Zarejestruj</Button></Link>
                </div>}
            {logInError ? <p className="err-msg">{errMessage}</p> : null}
        </div>
    )
}

export default Register;
