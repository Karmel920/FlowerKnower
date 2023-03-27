import { Drawer, ListItemText, Toolbar, Box, List, ListItem, ListItemButton } from '@mui/material';
import React from 'react';
import styles from '../../public/modules/navbar.module.css';
import Logo from '../img/main_logo.png';
import {Link} from 'react-router-dom';
function Navbar(){
    
    // const categories = ['Idenitfy plant','Your plants','Map of discoveries'];
    const listStyle={
        fontSize: "22px",
        fontFamily:"Poppins",
        fontStyle:"normal",
        width: '100%'
    }
    return(
        <div className={styles.navbar}>
             <Drawer
                sx={{
                    width: "305px",
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: "305px",
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
                            <Link to="/">
                                <ListItemButton>
                                    <ListItemText primaryTypographyProps={{style: listStyle }} primary="Identify plants"/>
                                </ListItemButton>
                            </Link>
                        </ListItem>
        
                        <ListItem disabledPadding sx={{mb:"1ch"}}>
                            <Link to="/collection">
                                <ListItemButton>
                                    <ListItemText primaryTypographyProps={{style: listStyle }} primary="Your plants"/>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disabledPadding sx={{mb:"1ch"}}>
                            <Link to="/map">
                                <ListItemButton>
                                    <ListItemText primaryTypographyProps={{style: listStyle }} primary="Map of discoveries"/>
                                </ListItemButton>
                            </Link>
                        </ListItem>

                    </List>
                    <img src={Logo} alt="Logo" style={{bottom:"50px", left:"50px", position:"absolute"}}/>
                </Box>
            </Drawer>
        </div>
    );
}

export default Navbar;