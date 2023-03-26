import './App.css';
import { Routes, Route} from 'react-router';
import Login from './views/login/Login';
import Register from './views/register/Register';
import Main from './views/main/Main';
import Settings from './views/settings/Settings';
function App() {
  return (

    <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/' element={<Main/>} />
        <Route path="/settings" element={<Settings/>} />
    </Routes>

  );
}

export default App;
