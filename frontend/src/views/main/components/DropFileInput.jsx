import React from "react";
import styles from './drop-file-input.module.css';
import {Link} from 'react-router-dom';
import { IconButton, Tooltip } from "@mui/material";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
function DropFileInput(){

    const [dragActive, setDragActive] = React.useState(false);
    const [image, setImage] = React.useState(null);

    const inputRef = React.useRef(null);
    const onButtonClick = () =>{
        if(!image)
            inputRef.current.click();
    }

    
    const handleDrag = function(e){
        e.preventDefault();
        e.stopPropagation();
        if(e.type === "dragenter" || e.type === "dragover"){
            setDragActive(true);
        }
        else if(e.type === "dragleave"){
            setDragActive(false);
        }
    };
    
    const handleDrop = function(e){
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if(e.dataTransfer.files && e.dataTransfer.files[0]){
            setImage(URL.createObjectURL(e.dataTransfer.files[0]));
        }
    };
    
    const handleChange = function(e){
        e.preventDefault();
        if(e.target.files && e.target.files[0]){
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };


    return(
        <form id={styles.formFileUpload} onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <input ref={inputRef} name="plant_image" type="file" id="input-file-upload" encType='multipart/form-data' style={{display:"none"}} onChange={handleChange} accept="image/jpeg, image/jpg, image/png" multiple={false} disabled={!!image}/>
            <label id={dragActive ? styles.labelFileUpload_active : styles.labelFileUpload} htmlFor="input-file-upload">
                <div>
                    <p className={styles.text}>Drag and drop image here or</p>
                    <button id={styles.browseButton} onClick={onButtonClick}>Browse files</button>
                </div>
            </label>
            { dragActive && <div id={styles.dragFileElement} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
            { image &&
                <div id={styles.imagePreview} style={{backgroundImage:`url(${image})`}}>
                    <Tooltip title="Delete image">
                        <IconButton
                            size="large"
                            sx={{color:"red", alignSelf:"flex-end"}}
                            onClick={()=> setImage(null)}
                        >
                            <DeleteForeverTwoToneIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            }
            <Link to='/identify' state={{img: image}}>
                <button id={styles.uploadButton} type="submit">Identify</button>
            </Link>
        </form>
    );
}

export default DropFileInput;