import { Outlet } from "react-router-dom";
import ASNVendorHeader from "./ASNVendorHeader";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { FaCheck } from "react-icons/fa6";

const ASNVendorMainPage = () => {

    const [po ,setPO] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return ( 
        <>
            <ASNVendorHeader />
            <div style={{margin: '8px', padding: '10px', borderRadius: '8px'}}>
                <Outlet context={{po, setPO, setSnackbarOpen}}/>
            </div>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert icon={<FaCheck />} onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Your invoice has been submitted.
                </Alert>
            </Snackbar>
        </>
     );
}
 
export default ASNVendorMainPage;