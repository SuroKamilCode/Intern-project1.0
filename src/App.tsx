import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import LoggedIn from './components/LoggedIn';
import Login from './components/Login';
import Register from './components/Register';
import Success from './components/Success';
import './styles/styles.scss';

function App() {

  return (
    <Router basename={process.env.REACT_APP_BASENAME_URL} >
      < Routes >
        <Route path='/' element={<Login />} />
        <Route path='/profile' element={<LoggedIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/success' element={<Success />} />
        <Route path='*' element={<ErrorPage />} />
      </ Routes>
    </Router>
  );
}

export default App;
