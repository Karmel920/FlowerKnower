import React from "react";
import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import Header from "../../public/components/Header";
import styles from '../../public/modules/map.module.css';
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import { Box } from "@mui/material";
function Map(){
    const location = [50.06540687121868, 19.939021772031865];

    const position = [[50.08947142414942, 19.920571577678686],
                      [50.06477475105627, 19.943089374774274]];

    const markerIconConst = L.icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon,
        iconAnchor: null,
        shadowUrl: null,
        shadowSize: null,  
        shadowAnchor: null,
        iconSize: [35, 35],
    });

    return(    
        <div className={styles.container}>
            <header className={styles.mapHeader}><Header title={"Map of discoveries"} style={{position:"fixed",top:0}}/> </header>
            <main className={styles.mainMapPanel}>
                <div className={styles.mapContainer}>
                    <MapContainer
                        center={location}
                        zoom={12}
                        style={{width:'100%', height:"100%"}}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {position.map((pos, index) => (
                            <Marker key ={index} icon={markerIconConst} position={pos}>
                            <Popup>
                                <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                    <p className={styles.text}>Plant_name</p>
                                    <p className={styles.text}>Discovered: _date</p>
                                    <p className={styles.text}>Plant_image</p>
                                </Box>
                            </Popup>
                        </Marker>
                        ))}
                    </MapContainer>
                </div>
            </main>
        </div>
    );
}

export default Map;