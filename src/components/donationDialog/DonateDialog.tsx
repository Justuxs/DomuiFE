import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import { Book } from '../../Types/Book';
import {Alert} from "@mui/material";
import sendRequest from "../../api/fetch";
import {bookUrl_create, loginUrl} from "../../api/endpoints";
import {logIn} from "../../services/AuthService";


export default function DonateDialog() {
    const [open, setOpen] = React.useState(false);
    const [book, setBook] = useState<Book>({} as Book);
    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    async function handleDonate() {
        if (book.ISBN == null || book.title == null || book.author == null) {
            alert("Please fill all fields");
            return;
        }
        let ISBN = book.ISBN;
        let title = book.title;
        let author = book.author;
        const res = await sendRequest(bookUrl_create, "POST", JSON.stringify({ISBN, title, author}));
        if (res.status) {
            alert(res.message);
            //ocument.location.href = "/";
        }
        if (!res.status) {
            alert("Bad books props");
        }
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Dovonoti knyga
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Dovonoti knyga</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Jūsų dovanota knyga taps mūsų bibliotekos dalimi.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ISBN"
                        label="ISBN numeris"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setBook({ ...book, ISBN: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="TITLE"
                        label="Knygos pavadinimas"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setBook({...book,title: e.target.value})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="AUTHOR"
                        label="Autorius"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>setBook({...book,author: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Atšaukti</Button>
                    <Button onClick={handleDonate}>Dovonoti</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
