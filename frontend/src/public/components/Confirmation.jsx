import { Backdrop, Divider, Fade, Modal, Typography, Button, Box } from "@mui/material";
import React from "react";
import styles from '../modules/confirmation.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
function Confirmation(props){

    const {open, onClose} = props;


    if(!open)
        return null;

    return(
        <div>
            <Modal
                open={open}
                onClose={onClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop:{
                        timeout:500,
                    },
                }}>
                
                    <Fade in={open}>
                        <Box className={styles.confirmationModal}>
                            <Typography>
                                <p className={styles.text}>Delete Confirmation</p>
                            </Typography>
                            <Divider sx={{borderBottomWidth:2}}/>
                            <Typography sx={{mt:2, mb:2}}>
                                <p className={styles.secondaryText}>Are you sure you want to proceed with this operation?</p>
                            </Typography>
                            <Divider sx={{borderBottomWidth:2}}/>
                            <Box sx={{display:"flex", justifyContent:"flex-end", width:"100%", mt:"1em"}}>
                                <Button variant="outlined" color="error" startIcon={<DeleteIcon/>}>
                                    Delete
                                </Button>
                                <Button variant="outlined" sx={{color:"black", ml:2}} onClick={onClose}>
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    </Fade>

            </Modal>
        </div>

    );
}

export default Confirmation;