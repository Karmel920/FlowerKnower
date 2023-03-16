import logo from './logo.svg';
import './App.css';
import { Routes } from 'react-router';

function App() {
  return (

    <Routes>
        <Route path='/login' element={<Login/>} />

    </Routes>

  );
}

export default App;
