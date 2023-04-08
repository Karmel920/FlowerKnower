import React from 'react';
import styles from '../../public/modules/register.module.css';
import MainLogo from '../../public/img/main_logo.png';
import SideLogo from '../../public/img/side_logo.svg';
import {Link} from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function check_password(password){
    var upperCase = /[A-Z]/g;
    var lowerCase = /[a-z]/g;
    var number = /[0-9]/g;
    if(password.match(upperCase) && password.match(lowerCase) && password.match(number))
        return true;
    return false;
}

function Register(){

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const [validationErrors, setValidationErrors] = React.useState([]);
    const [validationSuccess, setValidationSuccess] = React.useState([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [spinner, setSpinner] = React.useState(false);

    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
    }

    const handleSubmit = (e) =>{
        setValidationErrors([]);
        setValidationSuccess([]);
        if(password.length < 8 || !check_password(password)){
            e.preventDefault();
            setValidationErrors([{message:'Password must contain of 8 or more characters, it must containt one capital and small letter and one digit'}]);
        }else{
            if(password === repeatPassword){
                 
                setSpinner(true);
                setValidationErrors([]);
                e.preventDefault();
                setIsSubmitting(true);
                
                const data = {
                    email: email,
                    password: password
                };

                axios.post('http://localhost:8080/api/v1/auth/register', data, {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then(response=>{
                    setSpinner(false);
                    setIsSubmitting(false);
                    if(response.data !== undefined){
                        setValidationSuccess(response.data);
                    }
                }).catch(error=>{
                    setSpinner(false);
                    setIsSubmitting(false);
                    if(error.response.data !== undefined){
                        setValidationErrors(error.response.data);
                        setValidationErrors([{message:"That email address is already in use"}]);
                    }
                });
            }else{
                e.preventDefault();
                setValidationErrors([{message:"Passwords are not the same"}]);
            }
        }
    }

    return(
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.loginPanel}>
                    <img id={styles.logo} src={MainLogo} alt="Main logo"/>
                    <p className={styles.mainText}>Create an Account</p>
                    <form className={styles.loginForm} onSubmit={handleSubmit}>
                        {Object.keys(validationErrors).length !==0 &&
                            <p className={styles.errorText}>{validationErrors[0].message}</p>
                        }
                        {Object.keys(validationSuccess).length !==0 &&
                            <p className={styles.successText}>Registered successfully</p>
                        }
                        <input id={styles.emailInput} placeholder="Email" type="email" onChange={handleEmailChange}/>
                        <input id={styles.passwordInput} placeholder="Password" type="password" onChange={handlePasswordChange}/>
                        <input id={styles.repeatPasswordInput} placeholder="Repeat password" type="password" onChange={handleRepeatPasswordChange}/>
                        {spinner && (<Box sx={{mt:"2ch", display:"flex", justifyContent:"center"}}><CircularProgress/></Box>)}
                        <button id={styles.registerButton} type="submit" disabled={isSubmitting}>Sign up</button>
                    </form>
                </div>
                <div className={styles.registerPanel}>
                    <p className={styles.firstText}>Already have an account?</p>
                    <p className={styles.secondText}>Sign in and enjoy the application</p>
                    <Link className={styles.link} to="/login"><button id={styles.loginButton} type="button">Sign in</button></Link>
                    <img id={styles.logo2} src={SideLogo} alt="Side logo"/>
                </div>
            </div>
        </div>
    );

}

export default Register;
