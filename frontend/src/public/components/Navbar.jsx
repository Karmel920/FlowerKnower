import { Drawer, ListItemText, Toolbar, Box, List, ListItem, ListItemButton } from '@mui/material';
import React from 'react';
import styles from '../../public/modules/navbar.module.css';
import Logo from '../img/main_logo.png';
function Navbar(){
    
    const categories = ['Idenitfy plant','Your plants','Map of discoveries'];

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
                        {categories.map((text) =>(
                            <ListItem key={text} disablePadding sx={{mt:"1ch", mb:"1ch"}}>
                                <ListItemButton>
                                    <ListItemText sx={{fontFamily:"Poppins",fontSize:"30px"}} primary={text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <img src={Logo} alt="Logo" style={{bottom:"50px", left:"50px", position:"absolute"}}/>
                </Box>
            </Drawer>
        </div>
    );
}

export default Navbar;