import { Drawer, ListItemText, Toolbar, Box, List, ListItem, ListItemButton } from '@mui/material';
import React from 'react';
import styles from '../../public/modules/navbar.module.css';
import Logo from '../img/main_logo.png';
import {Link} from 'react-router-dom';
function Navbar({isOpenNavbar}){
    
    const listStyle={
        fontSize: "16px",
        fontFamily:"Poppins",
        fontStyle:"normal",
        width: '100%'
    }
    return(
        <div className={isOpenNavbar ? styles.navbarOpen : styles.navbar}>
             <Drawer
                sx={{
                    width: "305px",
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: "230px",
                        boxSizing: 'border-box',
                        background: '#FFFFFF',
                        zIndex:"auto",
                        float:"left",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar/>
                <Box sx={{display:"flex",flexDirection:"column"}}>
                    <List>
                        <ListItem disabledPadding sx={{mb:"1ch"}}>
                            <Link to="/main" className={styles.link}>
                                <ListItemButton>
                                    <ListItemText primaryTypographyProps={{style: listStyle }} primary="Identify plants"/>
                                </ListItemButton>
                            </Link>
                        </ListItem>
        
                        <ListItem disabledPadding sx={{mb:"1ch"}}>
                            <Link to="/collection" className={styles.link}>
                                <ListItemButton>
                                    <ListItemText primaryTypographyProps={{style: listStyle }} primary="Your plants"/>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disabledPadding sx={{mb:"1ch"}}>
                            <Link to="/map" className={styles.link}>
                                <ListItemButton>
                                    <ListItemText primaryTypographyProps={{style: listStyle }} primary="Map of discoveries"/>
                                </ListItemButton>
                            </Link>
                        </ListItem>

                    </List>
                    <img src={Logo} alt="Logo"/>
                </Box>
            </Drawer>
        </div>
    );
}

export default Navbar;