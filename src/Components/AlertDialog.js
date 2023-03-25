import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {props.headingTitle && (
                    <DialogTitle id="alert-dialog-title">
                        {props.headingTitle}
                    </DialogTitle>
                )}
                {props.subText && (
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {props.subText}
                        </DialogContentText>
                    </DialogContent>
                )}
                <DialogActions>
                    {props.disagreeLabel && <Button onClick={props.handleDisagree}>{props.disagreeLabel}</Button>}
                    {props.agreeLabel &&
                        <Button onClick={props.handleAgree}>
                            {props.agreeLabel}
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}