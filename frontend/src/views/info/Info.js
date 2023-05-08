import React from 'react';
import styles from '../../public/modules/info.module.css';
import Logo from '../../public/img/main_logo.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Divider, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import goodExample from './assets/good_example.jpg';
import badExample from './assets/bad_example.jpg';
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
                        <span><b> crocus, bellis, dandelion, pansy, rose, snowdrop, sunflower, tulip</b></span>
                        <span>The photo you want to send to the model should contain only the flower, without unnecessary details.</span>
                        <br/>
                        <div className={styles.examples}>
                            <div className={styles.example}>
                                <span>Example of good photo: </span>
                                <img id={styles.imgs} src={goodExample} alt="Example of good photo"/>
                            </div>
                            <div className={styles.example}>
                                <span>Example of bad photo: </span>
                                <img id={styles.imgs} src={badExample} alt="Example of bad photo"/>
                            </div>
                        </div>
                        <br/>
                        <span>Acceptable image extensions: JPG, jpg, jpeg, png</span>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Info;