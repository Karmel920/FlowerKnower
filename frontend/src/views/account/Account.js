import React from "react";
import styles from '../../public/modules/account.module.css';
import Header from "../../public/components/Header";
import { Button } from "@mui/material";
import BasicPhoto from '../../public/img/basic_photo.svg'
import { useNavigate } from "react-router";
import axios from 'axios';
import MuiAlert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>
});

function Account({photo}){
    const navigate = useNavigate();
    const [photo_url, setPhotoUrl] = React.useState(photo);
    const [image, setImage] = React.useState(null);
    const [successSnackbar, setOpenSuccessSnackbar] = React.useState(false);
    const [errorSnackbar, setOpenErrorSnackbar] = React.useState(false);
    const [errorLoadImageSnackbar, setOpenErrorLoadImageSnackbar] = React.useState(false);
    const previewPhoto = (event) => {
            const choseFile = event.target.files[0];
            setImage(choseFile);
            if(choseFile){
                const reader = new FileReader();
                reader.addEventListener('load',function(){
                    setPhotoUrl(reader.result);
                })
                reader.readAsDataURL(choseFile);
            }
    }
    React.useEffect(()=>{
        if(localStorage.getItem('token') === "" || localStorage.getItem('token') == null){
            navigate('/login');
        }else{
            getUserImage();
        }
    },[])
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
    
    const submitPicture = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if(image !== null)
            formData.append("image", image);
        if(!formData.entries().next().done){
            axios.post('http://localhost:8080/api/v1/user/picture', formData, {
                headers:{
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response=>{
                setOpenSuccessSnackbar(true);
            }).catch(error=>{
                setOpenErrorSnackbar(true);
            });
        }
    }
    const getUserImage = () => {

        axios.get('http://localhost:8080/api/v1/user/picture',{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        }).then(response=>{
            const byteCharacters = atob(response.data.image);
            const byteNumbers = new Array(byteCharacters.length);
            for(let i=0; i<byteCharacters.length; i++){
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray],{type:'image/jpg'});

            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoUrl(e.target.result);
            }
            reader.readAsDataURL(blob);
        }).catch(error=>{
            setPhotoUrl('');
            setOpenErrorLoadImageSnackbar(true);
        })

    }

    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
       setOpenErrorSnackbar(false);
       setOpenSuccessSnackbar(false);
       setOpenErrorLoadImageSnackbar(false);
    }
    if(photo_url === '' || photo_url==='data:image/jpg;base64,null'){
        setPhotoUrl(BasicPhoto);
    }
    return(
        <div className={styles.container}> 
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={successSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width:"100%"}}>
                    Profile picture has been changed successfully
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={errorSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width:"100%"}}>
                    Profile picture could not be changed
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={errorLoadImageSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width:"100%"}}>
                    Profile picture could not be displayed
                </Alert>
            </Snackbar>
            <header style={{position:"fixed", top:"0", width:"100%", zIndex:"2"}}><Header title={"Profile"} logoutAction={handleLogout} showMenu={false}/></header>
            <main className={styles.main}>
                <form className={styles.accountForm} onSubmit={submitPicture}>
                    <div className={styles.profilePicture}>
                        <div id={styles.picture} style={{backgroundImage:`url(${photo_url})`}}></div>
                        <Button variant="contained" component="label">
                            Choose photo
                            <input hidden accept="image/*" type="file" onChange={previewPhoto} name="picture"/>
                        </Button>
                    </div>
                    <p className={styles.text}>{localStorage.getItem('flowersCount')} species discovered</p>
                    <button id={styles.saveBtn} type="submit">Save changes</button>
                </form>
            </main>
        </div>
    );
}
export default Account;