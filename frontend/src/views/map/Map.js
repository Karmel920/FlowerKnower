import React from "react";
import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import Header from "../../public/components/Header";
import styles from '../../public/modules/map.module.css';
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import axios from 'axios';
import MuiAlert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>
});

function Map(){
    const navigate = useNavigate();
    const location = [50.06540687121868, 19.939021772031865];
    const [discoveries, setDiscoveries] = React.useState([]);
    const [imageUrls, setImageUrls] = React.useState([]);
    const [errorSnackbar,setOpenErrorSnackbar] = React.useState(false);
    React.useEffect(()=>{
        if(localStorage.getItem('token') !== "" && localStorage.getItem('token') != null){
            getDiscoveries();
        }else{
            navigate('/login');
        }
    },[]);
    const markerIconConst = L.icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon,
        iconAnchor: null,
        shadowUrl: null,
        shadowSize: null,  
        shadowAnchor: null,
        iconSize: [24, 41],
    });
    
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

    const getDiscoveries = () => {
        axios.get('http://localhost:8080/api/v1/discovery', {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response=>{
            setDiscoveries(response.data);
            loadImageUrls(response.data);
        }).catch(error=>{
            setOpenErrorSnackbar(true);
        })
    }

    const getImage = (image) =>{
        return new Promise((resolve, reject)=>{
            const byteCharacters = atob(image);
            const byteNumbers = new Array(byteCharacters.length);
            for(let i=0; i<byteCharacters.length; i++){
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray],{type:'image/jpg'});
    
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result);
            }
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    const loadImageUrls = async (discoveries) => {
        const urls = await Promise.all(discoveries.map((discovery)=> getImage(discovery.image)));
        setImageUrls(urls);
    }
    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
       setOpenErrorSnackbar(false);
    }
    return(    
        <div className={styles.container}>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={errorSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width:"100%"}}>
                    Discoveries' location could not be displayed
                </Alert>
            </Snackbar>
            <header className={styles.mapHeader}><Header title={"Map of discoveries"} logoutAction={handleLogout} showMenu={false} style={{position:"fixed",top:0}}/></header>
            <main className={styles.mainMapPanel}>
                <div className={styles.mapContainer}>
                    <MapContainer
                        center={location}
                        zoom={12}
                        style={{width:'100%', height:"100%"}}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {discoveries.map((discovery, index) => {
                            if(imageUrls[index]){
                                return(
                            
                            <Marker key ={index} icon={markerIconConst} position={[discovery.discoveryLocation.latitude,discovery.discoveryLocation.longitude]}>
                            <Popup>
                                <Box className={styles.popupBox} sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                    <p className={styles.text}>{discovery.name.charAt(0).toUpperCase()+discovery.name.slice(1)}</p>
                                    <p className={styles.text}>{discovery.date}</p>
                                    <div id={styles.plantImageMap} style={{backgroundImage:`url(${imageUrls[index]})`}}/>
                                </Box>
                            </Popup>
                        </Marker>
                        );}else{
                            return null;
                        }
                        })}
                        
                    </MapContainer>
                </div>
            </main>
        </div>
    );
}

export default Map;