import React from 'react';
import styles from '../../public/modules/main.module.css';
import Header from '../../public/components/Header';
import Navbar from '../../public/components/Navbar';

function Main(){
    const fileTypes = ["JPG","PNG"];
    return(
        <div className={styles.container}>
            <header style={{verticalAlign:"top"}}><Header title={"Identify plants"}/></header>
            <div className={styles.main}>
                <Navbar/>
                <main>
                
                </main> 
            </div>
        </div>
    );
}
export default Main;