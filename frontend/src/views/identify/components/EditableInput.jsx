import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import styles from './editable-input.module.css';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';

function EditableInput({initialValue, onAccept}) {

    const [value, setValue] = React.useState(initialValue);
    const [isEditing, setIsEditing] = React.useState(false);

    const handleInputChange = (e) => {
        setValue(e.target.value);
    }

    const handleEditClick = () => {
        setIsEditing(true);
    }
    const handleAcceptClick = () => {
        setIsEditing(false);
        onAccept(value);
    }

    return(
        <div className={styles.inputForm}>
            {isEditing ? (
                <input id={styles.predictionInput} type="text" value={value} onChange={handleInputChange}/>
            ):(
                <p className={styles.inputText}>You found: {value}</p>
            )}
            {isEditing ? (
                <Tooltip title="Save">
                    <IconButton
                        size="medium"
                        onClick={handleAcceptClick}
                    >
                        <CheckIcon/>
                    </IconButton>
                </Tooltip>
            ):(
                <Tooltip title="Edit">
                    <IconButton
                        size="medium"
                        onClick={handleEditClick}
                    >
                        <EditIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </div>
    );
}

export default EditableInput;