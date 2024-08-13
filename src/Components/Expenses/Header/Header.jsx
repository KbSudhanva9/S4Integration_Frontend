import { useState } from "react";
import "./Header.css";
import { FaSortDown } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const Header = () => {
  // const [dropdownVisible, setDropdownVisible] = useState(true);

  // const handleMouseEnter = () => {
  //     setDropdownVisible(true);
  // };
  // const handleMouseLeave = () => {
  //     setDropdownVisible(false);
  // };

  const nav = useNavigate();

  const signout =()=>{
    localStorage.clear();
    nav('/');
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
          to="expense"
          style={({ isActive, isPending, isTransitioning }) => ({
            padding: "10px",
            textDecoration: "none",
            color: isPending ? "black" : isActive ? "red" : "inherit",
            fontWeight: isPending ? "bold" : "normal",
          })}
        >
          Expenses
        </NavLink>
        <NavLink
          to="travel"
          style={({ isActive, isPending, isTransitioning }) => ({
            padding: "10px",
            textDecoration: "none",
            color: isPending ? "black" : isActive ? "red" : "inherit",
            fontWeight: isPending ? "bold" : "normal",
          })}
        >
          Second Screen
        </NavLink>

        <Button variant="contained" size='small' color='error' onClick={signout}>Sign out</Button>
        
        {/* <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="dropdown-button"
                >
                Invoices <FaSortDown /> 
                {dropdownVisible && (
                    <div className="dropdown-menu">
                    <a href="/service1">Service 1</a>
                    <a href="/service2">Service 2</a>
                    <a href="/service3">Service 3</a>
                    </div>
                )}
                </button>
                <button>Approvels</button>
                <button>App Center</button> */}
      </nav>
    </header>
  );
};
export default Header;
