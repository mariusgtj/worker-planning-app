import React from 'react'

import {useForm} from 'react-hook-form'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const SaveDialog = (props) => {

    // This is the hook-form from https://www.npmjs.com/package/react-hook-form
    const {
        register,
        handleSubmit,
        // formState: { errors }, // not used yet, see react-form-hook docs
    } = useForm();


    // This is the data passed to handleSubmit() method of hook-form
    const handleFormData = (data) => {
        const revenue = {...data, date_paid: props.date} // We add "date_paid" at "data" object. "date" is delivered from the parent (Calendar.js) via "props".
        console.log(data);
        console.log(revenue);

        // handleAdd(data);

    }



    /*
    When Dialog form opens, onClose must be "false" !!!
    "handleClose" is activated on click outside the Dialog form
    */

    const handleClose = () => {
        props.onClose(false)
    }

    // "Dialog" is comming from Material UI library: https://mui.com/components/dialogs/
    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Save Calendar Event</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(handleFormData)}>
                    <DialogContentText>
                        To subscribe to this website, please enter your data...
                    </DialogContentText>
                    <TextField  {...register('title')} name="title" label="Title" fullWidth={true}  />
                    <TextField  {...register('workType')} name="workType" label="Work Type" fullWidth={true}  />

                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        
        </Dialog>
    )
}

export default SaveDialog;

