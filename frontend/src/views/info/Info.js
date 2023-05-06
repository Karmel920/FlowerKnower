import React from 'react';
import styles from '../../public/modules/info.module.css';
import Logo from '../../public/img/main_logo.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Divider, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function Info(){
    
    const navigate = useNavigate();

    return(
        <div className={styles.infoMain}>
            <div className={styles.infoContainer}> 
                <div className={styles.infoHeader}>
                    <Tooltip title="Back">
                        <IconButton
                            size="large"
                            sx={{alignSelf: "flex-start", position:"fixed"}}
                            onClick = {()=> navigate(-1)}
                        >
                            <ArrowBackIcon/>     
                        </IconButton>
                    </Tooltip>
                    <img id={styles.infoLogo} src={Logo} alt="Logo"/>
                    <p className={styles.textHeader}>About App</p>
                </div>
                <div className={styles.infoCenter}>
                    <div className={styles.textCenter}>
                        <span>Web application to classify flowers from photos</span>
                        <Divider sx={{borderBottomWidth: 2}}/>
                        <br/>
                        <span>With our model you can classify the following flower species:</span>
                        <span><b> viola, crocus, dandelion, forget-me-not, fern, snowdrop, rose, sunflower, bellis, orchid, tulip</b></span>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Info;