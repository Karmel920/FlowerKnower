import React from 'react';
import styles from '../../public/modules/register.module.css';
import MainLogo from '../../public/img/main_logo.png';
import SideLogo from '../../public/img/side_logo.svg';
import {Link} from 'react-router-dom';

function Register(){

    return(
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.loginPanel}>
                    <img id={styles.logo} src={MainLogo} alt="Main logo"/>
                    <p className={styles.mainText}>Create an Account</p>
                    <form className={styles.loginForm}>
                        <input id={styles.emailInput} placeholder="Email" type="email" name="email"/>
                        <input id={styles.passwordInput} placeholder="Password" type="password" name="password"/>
                        <input id={styles.repeatPasswordInput} placeholder="Repeat password" type="password" name="repeat_password"/>
                        <button id={styles.registerButton} type="submit">Sign up</button>
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
