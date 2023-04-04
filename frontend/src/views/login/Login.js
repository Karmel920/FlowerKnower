import React from 'react';
import MainLogo from '../../public/img/main_logo.png';
import SideLogo from '../../public/img/side_logo.svg';
import { Link }  from 'react-router-dom';
import styles from '../../public/modules/login.module.css';

function Login(){

    return(
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.loginPanel}>
                    <img id={styles.mainLogo} src={MainLogo} alt="Main logo"/>
                    <p className={styles.mainText}>Login to Your Account</p>
                    <form className={styles.loginForm}>
                        <input id={styles.emailInput} placeholder="Email" type="email" name="email"/>
                        <input id={styles.passwordInput} placeholder="Password" type="password" name="password"/>
                        <button id={styles.loginButton}  type="submit">Sign in</button>
                    </form>
                </div>
                <div className={styles.registerPanel}>
                    <p className={styles.firstText}>New here?</p>
                    <p className={styles.secondText}>Sign up and discover a great amount of opportunities</p>
                    <Link className={styles.link} to="/register"><button id={styles.registerButton} type="button">Sign up</button></Link>
                    <img id={styles.sideLogo} src={SideLogo} alt="Side logo"/>
                </div>
            </div>
        </div>
    );
}

export default Login;