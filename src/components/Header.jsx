import { useState, useEffect } from 'react';
import { LOGO_URL } from '../utils/constants';

const Header = () => {
    const [btnName, setButtonName] = useState(['Login']);

    return (
        <div className="header">
            <div className="logo-container">
                <img
                    className="logo"
                    src={LOGO_URL}>
                </img>
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contact">Contact</a></li>
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