import React from "react";
import { MapContainer, TileLayer} from "react-leaflet";
import Header from "../../public/components/Header";
import styles from '../../public/modules/map.module.css';

function Map(){
    const location = [50.06540687121868, 19.939021772031865];
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
                    </MapContainer>
                </div>
            </main>
        </div>
    );
}

export default Map;