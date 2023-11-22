import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DemoDogButton from './DemoDogButton';
import { colors } from './colors';
import { useShowDialog } from '../hooks';

export default function DemoDogDialog() {
    const { handleDialogMessageChange, isError, isOpen, message, setDialogMessage, setDialogTitle, setIsError, title } = useShowDialog();

    function handleCloseDialog() {
        handleDialogMessageChange(false);
        setIsError(false);
        setDialogMessage('');
        setDialogTitle('');
    }

    return (
        <Dialog 
            aria-label="Demo Dog Dialog"
            onClose={handleCloseDialog}
            open={isOpen}
            z-index={30}
        >
            <DialogTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isError ? <p style={{ color: colors.error, fontWeight: 900 }}>{title}</p> : <p style={{ color: colors.atosGreen, fontWeight: 900 }}>{title}</p>}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <DemoDogButton buttonColor={isError ? colors.error : colors.atosGreen} onClick={handleCloseDialog} text="OK" isTextBtn />
            </DialogActions>
        </Dialog>
    );  
}

