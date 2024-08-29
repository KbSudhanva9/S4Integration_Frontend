import { useState } from "react";
// import "./Header.css";
import { FaSortDown } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { clearAuth } from "../../Redux/AuthSlice";

const OrderToCashHeader = () => {
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
    nav('/order-to-cash-login');
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
          to="create"
          style={({ isActive, isPending, isTransitioning }) => ({
            padding: "10px",
            textDecoration: "none",
            color: isPending ? "black" : isActive ? "red" : "inherit",
            fontWeight: isPending ? "bold" : "normal",
          })}
        >
          Create
        </NavLink>
        <NavLink
          to="display"
          style={({ isActive, isPending, isTransitioning }) => ({
            padding: "10px",
            textDecoration: "none",
            color: isPending ? "black" : isActive ? "red" : "inherit",
            fontWeight: isPending ? "bold" : "normal",
          })}
        >
          Display
        </NavLink>
        {/* <NavLink
          to="invoice-status"
          style={({ isActive, isPending, isTransitioning }) => ({
            padding: "10px",
            textDecoration: "none",
            color: isPending ? "black" : isActive ? "red" : "inherit",
            fontWeight: isPending ? "bold" : "normal",
          })}
        >
          Invoice Status
        </NavLink> */}
        <Button variant="contained" size='small' color='error' onClick={signout}>Sign out</Button>
      </nav>
    </header>
  );
};
export default OrderToCashHeader;
