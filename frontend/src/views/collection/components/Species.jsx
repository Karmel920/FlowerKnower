import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import styles from './species.module.css';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from "react-router-dom";
function Species({name, date, description, location}){

    const [visible,setVisible] = React.useState(false);
    const iconButtonClass = `${styles.iconButton} ${visible ? styles.iconButton_rotated:''}`;
    return(
            <div className={styles.species}>
                <div className={styles.speciesHeader}>
                    <Box sx={{display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
                        <p className={styles.speciesText}>{name}</p>
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
                    <p className = {styles.speciesBodyText}>{description === '' ? "No description": description}</p>
                    <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                        <p className={styles.speciesBodyText}>Discovery location:{location}</p>
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