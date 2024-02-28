import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface AlertProps {
  tittle: string;
  text: string;
  subject: string;
  action: (answer: boolean) => void;
}
const AlertDialog: React.FunctionComponent<AlertProps> = ({ tittle, text, subject, action }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    action(false);
    setOpen(false);
  };

  const handleYes = () => {
    setOpen(false);
    action(true);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {tittle}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          Ar tikrai norite?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text} {subject}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ne</Button>
          <Button onClick={handleYes} autoFocus>
            Taip
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AlertDialog;
