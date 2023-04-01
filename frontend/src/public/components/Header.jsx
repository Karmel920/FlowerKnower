import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import React from 'react';
import styles from '../modules/header.module.css';
import HomeIcon from '@mui/icons-material/Home';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { Logout, Settings } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link} from 'react-router-dom';
function Header({title}){

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) =>{
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () =>{
        setAnchorEl(null);
    }

    return(
        <div className={styles.topBar}>
            <div className={styles.leftControl}>
                <Link to="/">
                    <Tooltip title="Get back to main panel">
                        <IconButton size='large' sx={{ml:1, width:"5ch", borderRadius:"30px"}}>
                            <HomeIcon/>
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>
            <div className = {styles.centerControl}>
                <p className={styles.text}>{title}</p>
            </div>
            <div className= {styles.rightControl}>
                <div className={styles.flowerNumContainer}>
                    <p className={styles.text}>2</p>
                    <Tooltip title="Number of unique plants you've already discovered">
                        <LocalFloristIcon sx={{ml:"1ch"}}/>
                    </Tooltip>
                </div>
                <Tooltip title="Your Account">
                    <IconButton onClick={handleClick} size="medium" sx={{ml:2}} 
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{width:32, height:32}}>M</Avatar>
                    </IconButton>   
                </Tooltip>
                <Menu
                    anchorEl = {anchorEl}
                    id="user-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation:0,
                        sx:{
                            background: '#FFFFFF',
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '&:before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{horizontal: 'right', vertical:'top'}}
                    anchorOrigin={{horizontal:'right', vertical:'bottom'}}
                >
                    <Link to="/account">
                        <MenuItem onClick={handleClose}>
                            {/* <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
                                <img id={styles.prof_pic} alt="Profile picture"/>
                                <p>Account</p>
                            </Box> */}
                            <ListItemIcon>
                                <AccountCircleIcon/>
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                    </Link>  
                    <Divider/>
                    <Link to="/settings">
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Settings/>
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                    </Link>
                    <Link to="/login">
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Logout/>
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Link>
                </Menu>
            </div>
        </div>
    );
}

export default Header;