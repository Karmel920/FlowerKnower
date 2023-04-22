import './App.css';
import { Routes, Route} from 'react-router';
import Login from './views/login/Login';
import Register from './views/register/Register';
import Main from './views/main/Main';
import Settings from './views/settings/Settings';
import Account from './views/account/Account';
import Collection from './views/collection/Collection';
import Map from './views/map/Map';
import Identify from './views/identify/Identify';

function App() {
  return (

    <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/main' element={<Main/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/account" element={<Account photo={''}/>} />
        <Route path="/collection" element={<Collection/>}/>
        <Route path="/map" element={<Map/>}/>
        <Route path="/identify" element={<Identify/>}/>
    </Routes>

  );
}

export default App;
