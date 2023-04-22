import React from "react";
import styles from '../../public/modules/account.module.css';
import Header from "../../public/components/Header";
import { Button } from "@mui/material";
import BasicPhoto from '../../public/img/basic_photo.svg'
import { useNavigate } from "react-router";
function Account({photo}){
    const navigate = useNavigate();
    const [photo_url, setPhotoUrl] = React.useState(photo);
    const previewPhoto = (event) => {
            const choseFile = event.target.files[0];
            if(choseFile){
                const reader = new FileReader();
                reader.addEventListener('load',function(){
                    setPhotoUrl(reader.result);
                })
                reader.readAsDataURL(choseFile);
            }
    }
    if(photo_url === ''){
        setPhotoUrl(BasicPhoto);
    }
    const handleLogout = () => {
        localStorage.setItem('token',"");
        navigate("/login");
    }
    return(
        <div className={styles.container}> 
            <header><Header title={"Profile"} logoutAction={handleLogout}/></header>
            <main className={styles.main}>
                <form className={styles.accountForm} action="" encType='multipart/form-data'>
                    <div className={styles.profilePicture}>
                        <div id={styles.picture} style={{backgroundImage:`url(${photo_url})`}}></div>
                        <Button variant="contained" component="label">
                            Choose photo
                            <input hidden accept="image/*" type="file" onChange={previewPhoto} name="picture"/>
                        </Button>
                    </div>
                    <p className={styles.emailText}>example@gmail.com</p>
                    <p className={styles.text}>2 species discovered</p>
                    <button id={styles.saveBtn} type="submit">Save changes</button>
                </form>
            </main>
        </div>
    );
}
export default Account;