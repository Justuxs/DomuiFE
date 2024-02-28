import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import ReturnTable, {IReturnTableProps} from "../ReturnTable/ReturnTable";
import {Book} from "../../Types/Book";
import {User} from "../../Types/User";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export interface IAlertDialogSlideProps {

    action_close: () => void;

    action_button: () => void;

    user: User | undefined;

    isbn: string;

}
const AlertDialogSlide: React.FunctionComponent<IAlertDialogSlideProps> = ({action_close, user,isbn,action_button}) => {
    const [open, setOpen] = React.useState(true);



  const handleClose = () => {
    action_close();
  };
  const handleAction = () => {
      action_button();
    };

  return (
      <div>
:
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Informacija apie knyga "+isbn}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                {user=== undefined ? "Knyga nepaimta":<h4>Knyga paimta naudotojo<br/>Email : {user.email} <br/>Vardas : {user.name}<br/>Pavarde : {user.surname}</h4>}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleAction}>ISTROIJA</Button>
              <Button onClick={handleClose}>Uždaryti</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
export default AlertDialogSlide;
