import React, { useEffect } from "react";
import styles from '../../public/modules/collection.module.css';
import Header from "../../public/components/Header";
import Navbar from "../../public/components/Navbar";
import Species from "./components/Species";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function Collection(){

    const navigate = useNavigate();

    const [discoveries, setDiscoveries] = React.useState([]);
    const [spinner, setSpinner] = React.useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);

    useEffect(()=>{
        if(localStorage.getItem('token') !== "" && localStorage.getItem('token') != null){
            getDiscoveries();
        }else{
            navigate('/login');
        }
    },[]);

    const handleLogout = () => {
        axios.get('http://localhost:8080/api/v1/auth/logout', {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        localStorage.setItem('token',"");
        localStorage.setItem('flowersCount',"");
        navigate("/login");
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenErrorSnackbar(false);
      };
    
    const getDiscoveries = () => {
        setSpinner(true);
        axios.get('http://localhost:8080/api/v1/discovery', {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response=>{
            setSpinner(false);
            setDiscoveries(response.data);
        }).catch(error=>{
            setSpinner(false);
            setOpenErrorSnackbar(true);
        });
    }
    
    return(
        <div className={styles.container}>
            <header style={{verticalAlign:"top"}}><Header title={"Your plants"} logoutAction={handleLogout}/></header>
            <div className={styles.main}>
                <Navbar/>
                <div className={styles.section}>
                    <Snackbar anchorOrigin={{vertical: 'bottom', horizontal:'left'}} open={openErrorSnackbar} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            Error while collecting data
                        </Alert>
                    </Snackbar>
                    <Box sx={{width:"100%"}}>
                        <p className={styles.text}>{discoveries.length} species found</p>
                        <Divider/>
                    </Box>
                    <div className={styles.speciesContainer}> 
                        {spinner && (<Box sx={{mt:"2ch", display:"flex", justifyContent:"center"}}><CircularProgress/></Box>)}
                        {discoveries.map((discovery) => (
                            <Species key={discovery.id} id={discovery.id} name={discovery.name} description={discovery.description} image={discovery.image} date={discovery.date} location={discovery.discoveryLocation}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collection;