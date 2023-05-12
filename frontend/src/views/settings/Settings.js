import React from "react";
import styles from '../../public/modules/settings.module.css';
import Header from "../../public/components/Header";
import Confirmation from "../../public/components/Confirmation";
import axios from 'axios';
import { useNavigate } from "react-router";
import MuiAlert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Tooltip, IconButton, Box } from "@mui/material";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>
});

function check_password(password){
    var upperCase = /[A-Z]/g;
    var lowerCase = /[a-z]/g;
    var number = /[0-9]/g;
    return !!(password.match(upperCase) && password.match(lowerCase) && password.match(number));

}

function Settings(){

    const navigate = useNavigate();
    const [openConfirmation, setOpenConfirmation] = React.useState(false);
    const [successDeleteSnackbar, setSuccessDeleteSnackbar] = React.useState(false);
    const [errorDeleteSnackbar, setErrorDeleteSnackbar] = React.useState(false);
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [repeatPassword,setRepeatPassword] = React.useState('');
    const [oldEmail, setOldEmail] = React.useState('');
    const [newEmail, setNewEmail] = React.useState('');
    const [errorsPassword, setErrorsPassword] = React.useState([]);
    const [successPassword, setSuccessPassword] = React.useState([]);
    const [errorsEmail, setErrorsEmail] = React.useState([]);
    const [successEmail, setSuccessEmail] = React.useState([]);
    const [visiblePassword,setVisiblePassword] = React.useState(false);
    const [visibleEmail,setVisibleEmail] = React.useState(false);
    const handleOpenConfirmation = () => setOpenConfirmation(true);
    const iconButtonPasswordClass = `${styles.iconButton} ${visiblePassword ? styles.iconButton_rotated:''}`;
    const iconButtonEmailClass = `${styles.iconButton} ${visibleEmail ? styles.iconButton_rotated:''}`;
    React.useEffect(()=>{
        if(localStorage.getItem('token') === "" || localStorage.getItem('token') == null){
            navigate('/login');
        }
    },[localStorage.getItem('token')]);

    const handleOldPasswordChange = (e) =>{
        setOldPassword(e.target.value);
    }
    const handleNewPasswordChange = (e) =>{
        setNewPassword(e.target.value);
    }
    const handleRepeatPasswordChange = (e) =>{
        setRepeatPassword(e.target.value);
    }
    const handleOldEmailChange = (e) => {
        setOldEmail(e.target.value);
    }
    const handleNewEmailChange = (e) => {
        setNewEmail(e.target.value);
    }

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
    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setSuccessDeleteSnackbar(false);
        setErrorDeleteSnackbar(false);
    }

    const deleteAccount = () =>{
        axios.delete('http://localhost:8080/api/v1/user', {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response=>{
            setSuccessDeleteSnackbar(true);
        }).catch(error=>{
            setErrorDeleteSnackbar(true);
        });
    }

    const changePassword = (e) => {
        e.preventDefault();
        setErrorsPassword([]);
        setSuccessPassword([]);
        setErrorsEmail([]);
        setSuccessEmail([]);
        if(newPassword!==oldPassword){
            if(newPassword===repeatPassword) {
                if(newPassword.length < 8 || !check_password(newPassword)){
                    e.preventDefault();
                    setErrorsPassword([{message:'Password must contain of 8 or more characters, it must contain one capital and small letter and one digit'}]);
                }else {
                    const data = {
                        newPassword: newPassword,
                        oldPassword: oldPassword
                    };

                    axios.post('http://localhost:8080/api/v1/user/password', data, {
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {
                        setSuccessPassword("Success");
                    }).catch(error => {
                        if (error.response.data !== undefined) {
                            setErrorsPassword(error.response.data);
                            setErrorsPassword([{message: "Wrong current password"}])
                        }
                    });
                }
            }else{
                e.preventDefault();
                setErrorsPassword([{message:'Passwords are not the same'}]);
            }
        }else{
            e.preventDefault();
            setErrorsPassword([{message:'New password is the same as old'}]);
        }
    }

    const changeEmail = (e) => {
        e.preventDefault();
        setErrorsEmail([]);
        setSuccessEmail([]);
        setErrorsPassword([]);
        setSuccessPassword([]);
        if(newEmail !== oldEmail){

            const data = {
                oldEmail: oldEmail,
                newEmail: newEmail
            };

            axios.post('http://localhost:8080/api/v1/user/email', data, {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                setSuccessEmail("Success");
            }).catch(error => {
                if (error.response.data !== undefined) {
                    setErrorsEmail(error.response.data);
                    setErrorsEmail([{message: "Wrong current email"}])
                }
            });
        

        }else{
            e.preventDefault();
            setErrorsEmail([{message:'New email is the same as old'}]);
        }

    }
    return(
            <div className={styles.container}>
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={successDeleteSnackbar} autoHideDuration={2000} onClose={()=>{handleClose(); localStorage.setItem('token',"")}}>
                    <Alert onClose={handleClose} severity="success" sx={{width:"100%"}}>
                        Account has been successfully deleted, you will be logged out in moment
                    </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={errorDeleteSnackbar} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{width:"100%"}}>
                        Account could not be deleted
                    </Alert>
                </Snackbar>
                <header><Header title={"Settings"} logoutAction={handleLogout} showMenu={false}/></header>
                <main className={styles.main}>
                    <Confirmation open={openConfirmation} onClose ={() => setOpenConfirmation(false)} handleDelete={() => {deleteAccount(); setOpenConfirmation(false)}}/>
                    <div className={styles.forms}>
                        <form className={styles.changePasswordForm} onSubmit={changePassword}>
                            <div className={styles.formHeader}>
                                <p className={styles.formText}>Change password</p>
                                <Tooltip title={visiblePassword ? "Hide": "Show"}>
                                    <IconButton 
                                        size="medium"
                                        onClick={()=> setVisiblePassword(!visiblePassword)}
                                    >
                                        <KeyboardArrowDownOutlinedIcon className={iconButtonPasswordClass}/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <Box className={styles.formBody} sx={{display: visiblePassword ? "flex":"none", flexDirection:"column", alignItems:"center"}}>
                                {Object.keys(errorsPassword).length !==0 &&
                                <p className={styles.errorText}>{errorsPassword[0].message}</p>
                                }
                                {Object.keys(successPassword).length !==0 &&
                                    <p className={styles.successText}>Password has been changed successfully</p>
                                }
                                <p className={styles.formText}>Current password</p>
                                <input id={styles.changePasswordInput} name="curr_password" type="password" placeholder="********" onChange={handleOldPasswordChange} required/>
                                <p className={styles.formText}>New password</p>
                                <input id={styles.changePasswordInput} name="new_password" type="password" placeholder="********" onChange={handleNewPasswordChange} required/>
                                <p className={styles.formText}>Repeat new password</p>
                                <input id={styles.changePasswordInput} name="repeat_password"type="password" placeholder="********" onChange={handleRepeatPasswordChange} required/>
                                <button id={styles.saveButton} type="submit">Save</button>
                            </Box>
                        </form>
                        <form className={styles.changeEmailForm} onSubmit={changeEmail}>
                            <div className={styles.formHeader}>
                                    <p className={styles.formText}>Change email</p>
                                    <Tooltip title={visibleEmail ? "Hide": "Show"}>
                                        <IconButton 
                                            size="medium"
                                            onClick={()=> setVisibleEmail(!visibleEmail)}
                                        >
                                            <KeyboardArrowDownOutlinedIcon className={iconButtonEmailClass}/>
                                        </IconButton>
                                    </Tooltip>
                            </div>
                            <Box className={styles.formBody} sx={{display: visibleEmail ? "flex":"none", flexDirection:"column", alignItems:"center"}}>
                                {Object.keys(errorsEmail).length !==0 &&
                                <p className={styles.errorText}>{errorsEmail[0].message}</p>
                                }
                                {Object.keys(successEmail).length !==0 &&
                                    <p className={styles.successText}>Email has been changed successfully</p>
                                }
                                <p className={styles.formText}>Current email address</p>
                                <input id={styles.changeEmailInput} name="curr_email" type="email" onChange={handleOldEmailChange} required/>
                                <p className={styles.formText}>New email address</p>
                                <input id={styles.changeEmailInput} name="new_email" type="email" onChange={handleNewEmailChange} required/>
                                <button id={styles.saveButton} type="submit">Save</button>
                            </Box>
                        </form>
                    </div>
                    <button id={styles.deleteAccountBtn} type="button" onClick={handleOpenConfirmation}>Delete account</button>
                </main>
            </div>
    );
}

export default Settings;