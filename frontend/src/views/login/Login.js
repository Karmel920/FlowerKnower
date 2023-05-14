import React from 'react';
import MainLogo from '../../public/img/main_logo.png';
import SideLogo from '../../public/img/side_logo.svg';
import { Link, useNavigate }  from 'react-router-dom';
import styles from '../../public/modules/login.module.css';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import {Box} from "@mui/system";

function Login(){

    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [validationErrors, setValidationErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [spinner, setSpinner] = React.useState(false);
    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    React.useEffect(()=>{
        if(localStorage.getItem('token') !== '' && localStorage.getItem('token') != null){
            navigate('/main');
        }
    },[])

    const handleSubmit = (e) => {
        setSpinner(true);
        setValidationErrors({});
        e.preventDefault();
        setIsSubmitting(true);
        const data = {
            email:email,
            password:password
        };
        axios.post('http://localhost:8080/api/v1/auth/authenticate',data, {
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(response => {
                
                setSpinner(false);
                setIsSubmitting(false);
                localStorage.setItem('token', response.data.token);
                navigate("/main");
            })
            .catch(error =>{
                setSpinner(false);
                setIsSubmitting(false);
                setValidationErrors([{message:"Wrong email or password"}]);
            });
    }


    return(
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.loginPanel}>
                    <img id={styles.mainLogo} src={MainLogo} alt="Main logo"/>
                    <p className={styles.mainText}>Login to Your Account</p>
                    <form className={styles.loginForm} onSubmit={handleSubmit}>
                        {Object.keys(validationErrors).length !==0 &&
                            <p className={styles.errorText}>Wrong email address or password</p>
                        }
                        <input id={styles.emailInput} placeholder="Email" type="email" onChange={handleEmailChange}/>
                        <input id={styles.passwordInput} placeholder="Password" type="password" onChange={handlePasswordChange} />
                        {spinner && (<Box sx={{mt:"2ch", display:"flex", justifyContent:"center"}}><CircularProgress/></Box>)}
                        <button id={styles.loginButton} type="submit" disabled={isSubmitting}>Sign in</button>
                        <Link className={styles.link} to="/register"><button id={styles.registerButtonMobile} type="button">Sign up</button></Link>
                        <Link className={styles.link} to="/info"><button id={styles.infoButtonMobile} type="button">Want to learn more about app? Click here!</button></Link>
                    </form>
                </div>
                <div className={styles.registerPanel}>
                    <p className={styles.firstText}>New here?</p>
                    <p className={styles.secondText}>Sign up and discover a great amount of opportunities</p>
                    <Link className={styles.link} to="/register"><button id={styles.registerButton} type="button">Sign up</button></Link>
                    <Link className={styles.link} to="/info"><button id={styles.infoButton} type="button">Want to learn more about app? Click here!</button></Link>
                    <img id={styles.sideLogo} src={SideLogo} alt="Side logo"/>
                </div>
            </div>
        </div>
    );
}

export default Login;