import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import LoggedIn from './components/LoggedIn';
import Login from './components/Login';
import './styles/styles.scss';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/profile' element={<LoggedIn />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
