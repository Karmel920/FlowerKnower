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
function Identify(){

    const location = useLocation();
    const {img} = location.state;

    const [mapLocation, setMapLocation] = React.useState(null);
    const [showMapPopup, setShowMapPopup] = React.useState(false);

    const handleMapClick = (event) => {
        // const {latlng} = event;
        // setMapLocation(latlng);
        console.log("Klikłem");
    }

    const handleAddLocalizationClick = () => {
        setShowMapPopup(true);
    }

    const handleCloseMapPopup = () => {
        setShowMapPopup(false);
    }
    
    return(
        <div className={styles.container}>
            <header style={{verticalAlign:"top"}}><Header title={"Identify plant"}/></header>
            <div className={styles.main}>
                <Navbar/>
                <div className={styles.section}>
                    <div id={styles.plantImage} style={{backgroundImage:`url(${img})`}}/>
                    <div className={styles.plantInfoContainer}>
                        <div className={styles.plantInfoHeader}>
                            <p className={styles.text}>You found: Daisy</p>
                            <Button className={styles.locationButton} variant="outlined" endIcon={<AddLocationIcon/>} onClick={handleAddLocalizationClick}>
                                Add discovery location
                            </Button>

                            {showMapPopup && (
                                <div className = {styles.mapPopup}>
                                    <Tooltip title="Close map">
                                        <IconButton onClick={handleCloseMapPopup} sx={{position:"fixed",alignSelf:"flex-end", zIndex:2}}>
                                            <CloseIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <MapContainer
                                        center={[50.06540687121868, 19.939021772031865]}
                                        zoom = {13}
                                        onClick={handleMapClick}
                                        style={{width:'100%', height:"100%", zIndex:1}}
                                    >
                                         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> 

                                            {mapLocation && (
                                                <Marker position={mapLocation}>
                                                    <Popup>
                                                        <span>You added marker at: {mapLocation.lat}, {mapLocation.lng}</span>
                                                    </Popup>
                                                </Marker>
                                            )}
                                    </MapContainer>
                                </div>
                            )}



                        </div>
                        <div className={styles.plantInfoDescription}>
                            <p className={styles.descriptionText}>Bellis perennis - the daisy, is a European species of the family Asteraceae, often considered the archetypal species of the name daisy. To distinguish this species from other plants known as daisies, it is sometimes qualified as common daisy, lawn daisy or English daisy.</p>
                        </div>
                        <Link className={styles.link} to="/">
                            <button id={styles.nextButton} type="button">OK</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Identify;