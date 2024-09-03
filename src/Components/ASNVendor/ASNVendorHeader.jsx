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



const ASNVendorHeader = () => {
  // const [dropdownVisible, setDropdownVisible] = useState(true);

  // const handleMouseEnter = () => {
  //     setDropdownVisible(true);
  // };
  // const handleMouseLeave = () => {
  //     setDropdownVisible(false);
  // };
  const dispatch = useDispatch();
  const nav = useNavigate();

  const signout = () => {

    dispatch(clearAuth());
    localStorage.removeItem('auth');
    localStorage.clear();
    nav('/asn-vendor-login');
  }

  const back =()=>{
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

        <nav className="nav">
          {/* <NavLink
          exact
          to="home"
          style={({ isActive, isPending, isTransitioning }) => ({
            padding: "10px",
            textDecoration: "none",
            color: isPending ? "black" : isActive ? "red" : "inherit",
            fontWeight: isPending ? "bold" : "normal",
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="new-invoice"
          style={({ isActive, isPending, isTransitioning }) => ({
            padding: "10px",
            textDecoration: "none",
            color: isPending ? "black" : isActive ? "red" : "inherit",
            fontWeight: isPending ? "bold" : "normal",
          })}
        >
          New Invoice
        </NavLink>
        <NavLink
          to="my-invoice"
          style={({ isActive, isPending, isTransitioning }) => ({
            padding: "10px",
            textDecoration: "none",
            color: isPending ? "black" : isActive ? "red" : "inherit",
            fontWeight: isPending ? "bold" : "normal",
          })}
        >
          My Invoice
        </NavLink>
        <NavLink
          to="payment-received"
          style={({ isActive, isPending, isTransitioning }) => ({
            padding: "10px",
            textDecoration: "none",
            color: isPending ? "black" : isActive ? "red" : "inherit",
            fontWeight: isPending ? "bold" : "normal",
          })}
        >
          Payment Received
        </NavLink>
        <NavLink
          to= "#"
          // "debit-credit"
          style={({ isActive, isPending, isTransitioning }) => ({
            padding: "10px",
            textDecoration: "none",
            color: "black",
            // color: isPending ? "black" : isActive ? "red" : "inherit",
            fontWeight: isPending ? "bold" : "normal",
          })}
        >
          Debit/Credit
        </NavLink> */}

          <Button  style={{fontSize: '20px' }} size='small' color='error' onClick={signout}><IoPowerOutline /></Button>
        </nav>
      </header>
      {/* <Button startIcon={<MdOutlineArrowBackIos />} color="error" style={{ margin: '-80px 0px 0px 0px', zIndex: '101' }} size="small" /> */}


      {/* <Tooltip title="Back" arrow>
        <IconButton color="error" style={{ margin: '-80px 10px 0px 10px', zIndex: '101', position: 'sticky' }} size="small">
          <MdOutlineArrowBackIos />
        </IconButton>
      </Tooltip> */}


    </>
  );
};
export default ASNVendorHeader;
