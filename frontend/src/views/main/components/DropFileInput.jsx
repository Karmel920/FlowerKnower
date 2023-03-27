import React from 'react';
import styles from './drop-file-input.module.css';

function DropFileInput(){

    const [dragActive, setDragActive] = React.useState(false);
    const inputRef = React.useRef(null);
    const onButtonClick = () =>{
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

        }
    };
    
    const handleChange = function(e){
        e.preventDefault();
        if(e.target.files && e.target.files[0]){

        }
    };
    return(
        <form className={styles.formFileUpload} onDragEnter={handleDrag} onSubmit={(e)=> e.preventDefault()}>
            <div className={dragActive ? styles.uploadContainer_disabled : styles.uploadContainer_active} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
                <input ref={inputRef} name="plant_image" type="file" id="input-file-upload" encType='multipart/form-data' style={{display:"none"}} onChange={handleChange}/>
                <label id={dragActive ? styles.labelFileUpload_active : styles.labelFileUpload} htmlFor="input-file-upload">
                    <div className={styles.dragDiv}>
                        <p className={styles.text}>Drag and drop image here or</p>
                        <button id={styles.browseButton} type="button" onClick={onButtonClick}>Browse files</button>
                    </div>
                </label>
                {/* {dragActive && <div id={styles.dragFileElement} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>} */}
            </div>
            <button id={styles.uploadButton} type="submit">Identify</button>
        </form>
    );
}

export default DropFileInput;