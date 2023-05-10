import React from "react";
import styles from '../../public/modules/settings.module.css';
import Header from "../../public/components/Header";
import Confirmation from "../../public/components/Confirmation";
import axios from 'axios';
import { useNavigate } from "react-router";
function Settings(){

    const navigate = useNavigate();
    const [openConfirmation, setOpenConfirmation] = React.useState(false);

    const handleOpenConfirmation = () => setOpenConfirmation(true);

    React.useEffect(()=>{
        if(localStorage.getItem('token') === "" || localStorage.getItem('token') == null){
            navigate('/login');
        }
    },[]);
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
    return(
            <div className={styles.container}>
                <header><Header title={"Settings"} logoutAction={handleLogout} showMenu={false}/></header>
                <main className={styles.main}>
                    <Confirmation open={openConfirmation} onClose ={() => setOpenConfirmation(false)}/>
                    <div className={styles.forms}>
                        <form className={styles.changePasswordForm} action="">
                            {/* <p className={styles.formText}>Change your password</p>
                            <Divider sx={{width:"100%"}}/> */}
                            <p className={styles.formText}>Current password</p>
                            <input id={styles.changePasswordInput} name="curr_password" type="password" placeholder="********"/>
                            <p className={styles.formText}>New password</p>
                            <input id={styles.changePasswordInput} name="new_password" type="password" placeholder="********"/>
                            <p className={styles.formText}>Repeat new password</p>
                            <input id={styles.changePasswordInput} name="repeat_password"type="password" placeholder="********"/>
                            <button id={styles.saveButton} type="submit">Save</button>
                        </form>
                        <form className={styles.changeEmailForm} action="">
                            {/* <Box sx={{alignSelf:"flex-start"}}>
                                <p className={styles.formText}>Change your email</p>
                                <Divider sx={{width:"100%"}}/>
                            </Box> */}
                            <p className={styles.formText}>Current email address</p>
                            <input id={styles.changeEmailInput} name="curr_email" type="email" />
                            <p className={styles.formText}>New email address</p>
                            <input id={styles.changeEmailInput} name="new_email" type="email" />
                            <button id={styles.saveButton} type="submit">Save</button>
                        </form>
                    </div>
                    <button id={styles.deleteAccountBtn} type="button" onClick={handleOpenConfirmation}>Delete account</button>
                </main>
            </div>
    );
}

export default Settings;