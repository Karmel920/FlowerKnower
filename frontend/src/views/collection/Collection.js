import React from "react";
import styles from '../../public/modules/collection.module.css';
import Header from "../../public/components/Header";
import Navbar from "../../public/components/Navbar";
import Species from "./components/Species";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
function Collection(){
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.setItem('token',"");
        navigate("/login");
    }
    return(
        <div className={styles.container}>
            <header style={{verticalAlign:"top"}}><Header title={"Your plants"} logoutAction={handleLogout}/></header>
            <div className={styles.main}>
                <Navbar/>
                <div className={styles.section}>
                    <Box sx={{width:"100%"}}>
                        <p className={styles.text}>2 species found</p>
                        <Divider/>
                    </Box>
                    <div className={styles.speciesContainer}> 
                        <Species name={"Daisy"} date={"13.03.2023"} description={"Bellis perennis"}/>
                        <Species name={"Rose"} date={"27.03.2023"} description={''}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collection;