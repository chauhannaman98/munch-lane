import { useState, useEffect } from 'react';
import { LOGO_URL } from '../utils/constants';
import { Link } from 'react-router-dom';

const Header = () => {
    const [btnName, setButtonName] = useState(['Login']);

    return (
        <div className="header">
            <div className="logo-container">
                <Link to="/">
                    <img
                        className="logo"
                        src={LOGO_URL}>
                    </img></Link>
            </div>
            <div className="nav-items">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>Cart</li>
                    <button
                        className='login-btn'
                        onClick={() => {
                            btnName === "Login"
                                ? setButtonName("Logout")
                                : setButtonName("Login");
                        }}
                    >
                        {btnName}
                    </button>
                </ul>
            </div>
        </div>
    );
};

export default Header;