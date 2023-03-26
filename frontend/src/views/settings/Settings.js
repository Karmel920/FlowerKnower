import React from "react";
import styles from '../../public/modules/settings.module.css';
import Header from "../../public/components/Header";
import Confirmation from "../../public/components/Confirmation";
function Settings(){

    const [openConfirmation, setOpenConfirmation] = React.useState(false);

    const handleOpenConfirmation = () => setOpenConfirmation(true);

    return(
            <div className={styles.container}>
                <header><Header title={"Settings"}/></header>
                <main className={styles.main}>
                    <Confirmation open={openConfirmation} onClose ={() => setOpenConfirmation(false)}/>
                    <div className={styles.forms}>
                        <form className={styles.changePasswordForm} action="">
                            <p className={styles.formText}>Current password</p>
                            <input id={styles.changePasswordInput} name="curr_password" type="password" placeholder="********"/>
                            <p className={styles.formText}>New password</p>
                            <input id={styles.changePasswordInput} name="new_password" type="password" placeholder="********"/>
                            <p className={styles.formText}>Repeat new password</p>
                            <input id={styles.changePasswordInput} name="repeat_password"type="password" placeholder="********"/>
                            <button id={styles.saveButton} type="submit">Save</button>
                        </form>
                        <form className={styles.changeEmailForm} action="">
                            <p className={styles.formText}>Current email address</p>
                            <input id={styles.changeEmailInput} name="curr_email" type="email" />
                            <p className={styles.formText}>New email address</p>
                            <input id={styles.changeEmailInput} name="new_email" type="email" />
                            <button id={styles.saveButton} type="submit">Save</button>
                        </form>
                    </div>
                    <button id={styles.deleteAccountBtn} type="button" onClick={handleOpenConfirmation}>Delete account</button>
                </main>
            </div>
    );
}

export default Settings;