import React from 'react';
import styles from '../../public/modules/identify.module.css';
import Header from "../../public/components/Header";
import Navbar from "../../public/components/Navbar";
import { useLocation, Link } from 'react-router-dom';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Button } from '@mui/material';

function Identify(){

    const location = useLocation();
    const {img} = location.state;
    return(
        <div className={styles.container}>
            <header style={{verticalAlign:"top"}}><Header title={"Identify plant"}/></header>
            <div className={styles.main}>
                <Navbar/>
                <div className={styles.section}>
                    <div id={styles.plantImage} style={{backgroundImage:`url(${img})`}}/>
                    <div className={styles.plantInfoContainer}>
                        <div className={styles.plantInfoHeader}>
                            <p className={styles.text}>You found: Daisy</p>
                            <Button className={styles.locationButton} variant="outlined" endIcon={<AddLocationIcon/>}>
                                Add discovery location
                            </Button>
                        </div>
                        <div className={styles.plantInfoDescription}>
                            <p className={styles.descriptionText}>Bellis perennis - the daisy, is a European species of the family Asteraceae, often considered the archetypal species of the name daisy. To distinguish this species from other plants known as daisies, it is sometimes qualified as common daisy, lawn daisy or English daisy.</p>
                        </div>
                        <Link className={styles.link} to="/">
                            <button id={styles.nextButton} type="button">OK</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Identify;