import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import styles from './species.module.css';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from "react-router-dom";
function Species({id, name, date, description, image, location}){

    const [visible,setVisible] = React.useState(false);
    const iconButtonClass = `${styles.iconButton} ${visible ? styles.iconButton_rotated:''}`;
    const [imageUrl, setImageUrl] = React.useState('');

    React.useEffect(()=>{
        getImage();
    },[]);

    const getImage = () =>{
        const byteCharacters = atob(image);
        const byteNumbers = new Array(byteCharacters.length);
        for(let i=0; i<byteCharacters.length; i++){
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray],{type:'image/jpg'});

        const reader = new FileReader();
        reader.onload = (e) => {
            setImageUrl(e.target.result);
        }
        reader.readAsDataURL(blob);
    };

    return(
            <div className={styles.species}>
                <div className={styles.speciesHeader}>
                    <Box sx={{display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
                        <p className={styles.speciesText}>{name.charAt(0).toUpperCase()+name.slice(1)}</p>
                    </Box>
                    <Box sx={{display:"flex"}}>
                        <p className={styles.speciesText}>{date}</p>
                        <Tooltip title={visible ? "Hide" : "Show"}>    
                            <IconButton
                                size="medium"
                                onClick={() => setVisible(!visible)}
                            >
                                <KeyboardArrowDownOutlinedIcon className={iconButtonClass}/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </div>
                <Box className={styles.speciesBody} sx={{display: visible ? "inline-block": "none"}}>
                    <div className={styles.photoDiv}>
                        <div id={styles.plantImageDiv} style={{backgroundImage:`url(${imageUrl})`}}/>
                    </div>
                    <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                        <p className={styles.speciesBodyText}>Discovery location:</p>
                        <Tooltip title="Open map">
                            <Link to="/map">
                                <IconButton 
                                    size="large"
                                >
                                    <LocationOnIcon/>
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </Box>
                </Box>
            </div>
    );
}

export default Species;