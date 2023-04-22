import React from "react";
import styles from './drop-file-input.module.css';
import {Link, useNavigate} from 'react-router-dom';
import { IconButton, Tooltip } from "@mui/material";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import {Box} from "@mui/system";
function DropFileInput(){
    const navigate = useNavigate();
    const [dragActive, setDragActive] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [imageObject, setImageObject] = React.useState(null);
    const [modelPrediction, setModelPrediction] = React.useState('');
    const [spinner, setSpinner] = React.useState(false);
    const inputRef = React.useRef(null);
    const onButtonClick = () =>{
        if(!image)
            inputRef.current.click();
    }
    React.useEffect(()=>{
        if(modelPrediction !== '' && modelPrediction != null){
            navigate('/identify',{state: {img: image, prediction: modelPrediction}});
        }
    },[modelPrediction]);

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
            setImageObject(e.dataTransfer.files[0]);
            setImage(URL.createObjectURL(e.dataTransfer.files[0]));
        }
    };
    
    const handleChange = function(e){
        e.preventDefault();
        if(e.target.files && e.target.files[0]){
            setImageObject(e.target.files[0])
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e) => {
        setSpinner(true);
        e.preventDefault();
        const formData = new FormData();
        formData.append("image",imageObject);
        axios.post('http://127.0.0.1:5000/predict/img', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response=>{
            setModelPrediction(response.data.predicted_class);
            setSpinner(false);
        }).catch(error=>{
            console.log(error);
            setSpinner(false);
        })
    }

    return(
        <form id={styles.formFileUpload} onDragEnter={handleDrag} onSubmit={handleSubmit}>
            <input ref={inputRef} name="plant_image" type="file" id="input-file-upload" encType='multipart/form-data' style={{display:"none"}} onChange={handleChange} accept="image/jpeg, image/jpg, image/png" multiple={false} disabled={!!image}/>
            <label id={dragActive ? styles.labelFileUpload_active : styles.labelFileUpload} htmlFor="input-file-upload">
                <div>
                    <p className={styles.text}>Drag and drop image here or</p>
                    <button id={styles.browseButton} onClick={onButtonClick} type="button">Browse files</button>
                </div>
            </label>
            { dragActive && <div id={styles.dragFileElement} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
            { image &&
                <div id={styles.imagePreview} style={{backgroundImage:`url(${image})`}}>
                    <Tooltip title="Delete image">
                        <IconButton
                            size="large"
                            sx={{color:"red", alignSelf:"flex-end"}}
                            onClick={()=> {setImage(null); setImageObject(null);}}
                        >
                            <DeleteForeverTwoToneIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            }
            {spinner && (<Box sx={{mt:"2ch", display:"flex", justifyContent:"center"}}><CircularProgress/></Box>)}
            <button id={styles.uploadButton} type="submit">Identify</button>
        </form>
    );
}

export default DropFileInput;