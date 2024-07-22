import { useState } from 'react';
import './Header.css'
import { FaSortDown } from "react-icons/fa";




const Header = () => {

    const [dropdownVisible, setDropdownVisible] = useState(true);

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };
    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    return (
        <header>
            {/* <div>header</div> */}
            <img style={{padding: '10px'}} src='https://tecnics.com/wp-content/uploads/2020/03/logo1.png' />
            <p className='header-font'>Expense Statment</p>


            <nav className="nav">
                <button>Travel</button>
                <button>Expenses</button>
                <button
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
                <button>App Center</button>
            </nav>
        </header>
    )
}
export default Header;