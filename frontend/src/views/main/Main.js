import React from 'react';
import styles from '../../public/modules/main.module.css';
import Header from '../../public/components/Header';
import Navbar from '../../public/components/Navbar';
import DropFileInput from './components/DropFileInput';
import { useNavigate } from 'react-router';
// Investigate plant

function Main(){

    const navigate = useNavigate;
    React.useEffect(()=>{
        if(localStorage.getItem('token') === "" || localStorage.getItem('token') == null){
            navigate('/login');
        }else{
        
        }
    },[]);

    const handleLogout = () => {
        localStorage.setItem('token',"");
        navigate("/login");
    }
    return(
        <div className={styles.container}>
            <header style={{verticalAlign:"top"}}><Header logoutAction={handleLogout} title={"Identify plants"}/></header>
            <div className={styles.main}>
                <Navbar/>
                <main>
                    <DropFileInput/>
                </main> 
            </div>
        </div>
    );
}
export default Main;