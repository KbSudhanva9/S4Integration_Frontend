import { useState } from "react";
// import "./Header.css";
import { FaSortDown } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { clearAuth } from "../../Redux/AuthSlice";
import { IoPowerOutline } from "react-icons/io5";

const VendorInvoicingHeader = () => {
  // const [dropdownVisible, setDropdownVisible] = useState(true);

  // const handleMouseEnter = () => {
  //     setDropdownVisible(true);
  // };
  // const handleMouseLeave = () => {
  //     setDropdownVisible(false);
  // };
  const dispatch = useDispatch();
  const nav = useNavigate();

  const signout =()=>{
    
    dispatch(clearAuth());
    localStorage.removeItem('auth');
    localStorage.clear();
    nav('/vendor-invoicing-login');
  }

  return (
    <header>
      <img
        style={{ padding: "10px 0px 10px 20px", width: '185px', height: '30px' }}
        src="https://tecnics.com/wp-content/uploads/2020/03/logo1.png"
      />

      <nav className="nav">
        <NavLink
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
        </NavLink>
        
        <Button size='small' style={{fontSize: '20px' }} color='error' onClick={signout}><IoPowerOutline /></Button>
      </nav>
    </header>
  );
};
export default VendorInvoicingHeader;
