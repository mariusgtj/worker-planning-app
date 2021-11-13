import {useForm} from 'react-hook-form'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// //  This next way is not reccomended in MUI Docs bcs it implies more bundle size !!!
// import {
//     Dialog, 
//     DialogTitle, 
//     DialogContent, 
//     DialogContentText, 
//     DialogActions, 
//     TextField,
//     Button
// } from '@mui/material';


// !!! We used: LIFT THE STATE UP !!! onClose and at ADD button

const AddEvent = (params) => {

    const {
        register,
        handleSubmit,
        // formState: { errors }, // not used yet, see react-form-hook docs
    } = useForm();


    const handleFormData = (data) => {
        // const revenue = {...data, date_paid: props.date} // We add "date_paid" at "data" object. "date" is delivered from the parent (Calendar.js) via "props".
         // console.log(revenue);

        console.log(data);
        params.handleAdd(data); // !!! LIFT-THE-STATE-UP

    }



    /*
    The parent component controls if this AddEvent shows or not. So, here, we set open to true
    */

    return <Dialog open={true} onClose={() => params.setShow(false)}>
        <DialogTitle>Add Event</DialogTitle>
        <form onSubmit={handleSubmit(handleFormData)}>
            <DialogContent>
                <TextField  {...register('title')} name="title" placeholder="Title"  />
                <TextField  {...register('workType')} name="workType" placeholder="Work Type"  />
            </DialogContent>
            <DialogActions>
                <Button type="submit" variant="contained" color="primary">Add</Button>
                <Button onClick={() => params.setShow(false)}>Cancel</Button> 
            </DialogActions>
        </form>
    </Dialog>
}

export default AddEvent;