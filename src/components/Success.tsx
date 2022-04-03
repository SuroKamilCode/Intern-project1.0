import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Success: React.FC = () => {
    return (
        <div className='container App'>
            <div>Użytkownik zarejestrowany pomyślnie!</div>
            <br />
            <Link to="/"><Button sx={{ margin: .8 }} className='register-button' variant="contained" size='large'>Przejdź do logowania!</Button></Link>
        </div >
    )
}

export default Success;