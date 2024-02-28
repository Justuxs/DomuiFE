import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import {Book} from "../../Types/Book";
import sendRequest from "../../api/fetch";
import {bookUrl, bookUrl_create, userUrl} from "../../api/endpoints";

interface FormDialogProps {
    input_book: Book;
}

export default function FormDialog({ input_book }: { input_book: Book }) {
    const [open, setOpen] = React.useState(false);

    const [book, setBook] = useState<Book>(input_book);
    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    async function handleChange() {
        if (book.ISBN == null || book.title == null || book.author == null) {
            alert("Please fill all fields");
            return;
        }
        let ISBN = book.ISBN;
        let title = book.title;
        let author = book.author;
        const res = await sendRequest(`${bookUrl}/${ISBN}`, "PUT", JSON.stringify({ISBN, title, author}));
        if (res.status) {
            alert(res.message);
            //ocument.location.href = "/";
        }
        if (!res.status) {
            alert(res.message);
        }
        handleClose();
    }


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Redaguoti
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Redaguoti</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Knyga- {book.ISBN}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="TITLE"
                        label="Knygos pavadinimas"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={book.title}
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
                        value={book.author}
                        onChange={(e)=>setBook({...book,author: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Atšaukti</Button>
                    <Button onClick={handleChange}>Redaguoti</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
