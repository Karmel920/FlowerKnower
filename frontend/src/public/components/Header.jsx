import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import React from 'react';
import styles from '../modules/header.module.css';
import HomeIcon from '@mui/icons-material/Home';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { Logout, Settings } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import {Link} from 'react-router-dom';
function Header({logoutAction, title}){

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [flowersNum, setFlowersNum] = React.useState(0);
    const open = Boolean(anchorEl);

    React.useEffect(()=>{
        if(localStorage.getItem('flowersCount')===null || localStorage.getItem('flowersCount') === ""){
            setFlowersNum(0);
        }else{
            setFlowersNum(localStorage.getItem('flowersCount'));
        }
    },[localStorage.getItem('flowersCount')])

    const handleClick = (event) =>{
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () =>{
        setAnchorEl(null);
    }

    const handleLogout = () => {
        logoutAction();
    }
    return(
        <div className={styles.topBar}>
            <div className={styles.leftControl}>
                <Link to="/main">
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
                    <p className={styles.text}>{flowersNum}</p>
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
                    <Link to="/info">
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <InfoIcon/>
                            </ListItemIcon>
                            Information
                        </MenuItem>
                    </Link>
                    <Link to="/login">
                        <MenuItem onClick={handleLogout}>
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