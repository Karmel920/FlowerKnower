import React from 'react';
import styles from '../../public/modules/identify.module.css';
import Header from "../../public/components/Header";
import Navbar from "../../public/components/Navbar";
import { useLocation, Link } from 'react-router-dom';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Button, Tooltip } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from '@mui/material';
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router';
import axios from 'axios';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function Identify(){
    const navigate = useNavigate();
    const location = useLocation();
    const {img, imgObject, prediction, description} = location.state;
    const [showMapPopup, setShowMapPopup] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);

    const handleAddLocalizationClick = () => {
        setShowMapPopup(true);
    }
    const handleCloseMapPopup = () => {
        setShowMapPopup(false);
        handleClick();
    }
    
    const markerIconConst = L.icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon,
        iconAnchor: null,
        shadowUrl: null,
        shadowSize: null,  
        shadowAnchor: null,
        iconSize: [24, 41],
    });

    const [draggable, setDraggable] = React.useState(false);
    const [position, setPosition] = React.useState([50.06540687121868, 19.939021772031865]);
    const markerRef = React.useRef(null);
    const eventHandlers = React.useMemo(
        () => ({
            dragend(){
                const marker = markerRef.current;
                if(marker != null){
                    setPosition(marker.getLatLng());
                }
            },
        }),
        [],
    );
    const toggleDraggable = React.useCallback(()=>{
        setDraggable((d) => !d);
    },[]);
    React.useEffect(()=>{
        if(localStorage.getItem('token') !== "" && localStorage.getItem('token') != null){
            setPosition(position);
        }else{
            navigate('/login');
        }
    },[position],[showMapPopup]);

    const [open,setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    }
    const handleClose = (event,reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false);
        setOpenSuccessSnackbar(false);
    }
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

    const submitDiscovery = () => {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("image", imgObject);
        formData.append("name", prediction);
        formData.append("description", description);
        formData.append("discoveryLocation.latitude", position.lat);
        formData.append("discoveryLocation.longitude", position.lng);
        axios.post('http://localhost:8080/api/v1/discovery', formData, {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            }
        }).then(response=>{
            console.log(response.data);
            setIsSubmitting(false);
            setOpenSuccessSnackbar(true);
        }).catch(error=>{
            console.log(error);
            setIsSubmitting(false);
        });
    }

    return(
        <div className={styles.container}>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width:"100%"}}>
                    Discovery location has been saved!
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccessSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width:"100%"}}>
                    Discovery has been saved!
                </Alert>
            </Snackbar>
            <header style={{verticalAlign:"top"}}><Header title={"Identify plant"} logoutAction={handleLogout}/></header>
            <div className={styles.main}>
                <Navbar/>
                <div className={styles.section}>
                    <div id={styles.plantImage} style={{backgroundImage:`url(${img})`}}/>
                    <div className={styles.plantInfoContainer}>
                        <div className={styles.plantInfoHeader}>
                            <p className={styles.text}>You found: {prediction.charAt(0).toUpperCase()+prediction.slice(1)}</p>
                            <Button className={styles.locationButton} variant="outlined" endIcon={<AddLocationIcon/>} onClick={handleAddLocalizationClick}>
                                Add discovery location
                            </Button>

                            {showMapPopup && (
                                <div className = {styles.mapPopup}>
                                    <Alert severity="info">Click on the marker to make it draggable and to save location simply close map</Alert>
                                    <Tooltip title="Close map">
                                        <IconButton onClick={handleCloseMapPopup} sx={{position:"fixed",alignSelf:"flex-end", zIndex:2}}>
                                            <CloseIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <MapContainer
                                        center={[50.06540687121868, 19.939021772031865]}
                                        zoom = {13}
                                        style={{width:'100%', height:"100%", zIndex:1}}
                                        zoomControl={false}
                                    >
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>   
                                        <Marker
                                            draggable={draggable}
                                            eventHandlers={eventHandlers}
                                            position={position}
                                            ref={markerRef}
                                            icon={markerIconConst}>
                                            <Popup minWidth={90}>
                                                <span onClick={toggleDraggable}>
                                                    {draggable
                                                    ? 'Marker is draggable'
                                                    : 'Click here to make marker draggable'}
                                                </span>
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            )}

                        </div>
                        <div className={styles.plantInfoDescription}>
                            <p className={styles.descriptionText}>{description}</p>
                            <a href="https://www.wikipedia.org/"><p className={styles.descriptionText}>Source: Wikipedia</p></a>
                        </div>
                        <div className={styles.buttonsDiv}>
                            {/* zamiast link to navigate w hook'u */}                            
                            <Link className={styles.link} to="/main">
                                <button id={styles.nextButton} type="button">OK</button>
                            </Link>
                            <button id={styles.saveButton} type="button" onClick={submitDiscovery}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Identify;