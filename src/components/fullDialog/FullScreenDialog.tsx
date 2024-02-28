import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {User} from "../../Types/User";
import AlertDialogSlide, {IAlertDialogSlideProps} from "../usersTable/AlertDialogSlide";
import UsersTable from "../usersTable/UsersTable";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface IFullScreenDialogProps {

    action_close: () => void;

    rows: Array<User>;
    action: (id: string) => void;
    tittle: string;
    text: string;
    button: string;


}
const FullScreenDialog: React.FunctionComponent<IFullScreenDialogProps> = ({action_close,rows,action,tittle,text,button }) => {
    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        action_close();
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Isorija
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <UsersTable rows={rows} action={action} tittle={tittle} text={text} button={button}></UsersTable>
                </List>
            </Dialog>
        </div>
    );
}
export default FullScreenDialog;
