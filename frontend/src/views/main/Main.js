import React from 'react';
import styles from '../../public/modules/main.module.css';
import Header from '../../public/components/Header';
import Navbar from '../../public/components/Navbar';
import DropFileInput from './components/DropFileInput';
import { useNavigate } from 'react-router';
import axios from 'axios';


function Main({props}){


    const navigate = useNavigate();
    const [isOpenNavbar, setIsOpenNavbar] = React.useState(false);
    React.useEffect(()=>{
        if(localStorage.getItem('token') === "" || localStorage.getItem('token') == null){
            navigate('/login');
        }else{
            getUniqueFlowersCount();
        }
    },[navigate]);

    const handleLogout = () => {
        axios.get('http://localhost:8080/api/v1/auth/logout', {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        localStorage.setItem('token',"");
        localStorage.setItem('flowersCount',"");
        navigate("/login");
    }
    const getUniqueFlowersCount = () => {
        axios.get('http://localhost:8080/api/v1/discovery/unique', {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response=>{
            localStorage.setItem('flowersCount',response.data.uniqueFlowersCount);
        });

    }
    return(
        <div className={styles.container}>
            <header style={{position:"fixed", top:"0", width:"100%", zIndex:"2"}}><Header logoutAction={handleLogout} title={"Identify plants"} openNavbar={()=> setIsOpenNavbar(!isOpenNavbar)} showMenu={true}/></header>
            <div className={styles.main}>
                <Navbar isOpenNavbar={isOpenNavbar}/>
                <main>
                    <DropFileInput/>
                </main> 
            </div>
        </div>
    );
}
export default Main;