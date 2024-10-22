import { useState } from "react";
// import "./Header.css";
import { FaSortDown } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { clearAuth } from "../../Redux/AuthSlice";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { IconButton, Tooltip } from "@mui/material";
import { IoCaretBack, IoPowerOutline } from "react-icons/io5";



const GatePassHeader = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const signout = () => {

        dispatch(clearAuth());
        localStorage.removeItem('auth');
        localStorage.clear();
        nav('/asn-vendor-login');
    }

    const back = () => {
        nav(-1);
    }


    return (
        <>
            <header>
                <div>
                    <Tooltip title="Back" arrow>
                        <IconButton onClick={back} color="error" style={{ margin: '-32px 0px 0px 0px', zIndex: '101', position: 'sticky' }} size="large">
                            <IoCaretBack />
                        </IconButton>
                    </Tooltip>
                    <img
                        style={{ padding: "10px 0px 10px 0px", width: '185px', height: '30px' }}
                        src="https://tecnics.com/wp-content/uploads/2020/03/logo1.png"
                    />
                </div>
                {/* <nav className="nav">
                    <Button style={{ fontSize: '20px' }} size='small' color='error' onClick={signout}><IoPowerOutline /></Button>
                </nav> */}
            </header>
        </>
    );
};
export default GatePassHeader;
