import { useState, useEffect } from 'react';
import { LOGO_URL } from '../utils/constants';
import { Link } from 'react-router-dom';

const Header = () => {
    const [btnName, setButtonName] = useState(['Login']);

    return (
        <div className="header flex justify-between p-4 shadow-lg mb-2">
            <div className="logo-container">
                <Link to="/">
                    <img
                        className="w-20 rounded-full transition delay-100 duration-300 hover:scale-110"
                        src={LOGO_URL}>
                    </img></Link>
            </div>
            <div className="nav-items">
                <ul className='flex p-4 m-4'>
                    <li className='px-4 font-bold hover:text-[#ee964b]'>
                        <Link to="/">Home</Link>
                    </li>
                    <li className='px-4 hover:text-[#ee964b]'>
                        <Link to="/grocery">Grocery</Link>
                    </li>
                    <li className='px-4 hover:text-[#ee964b]'>
                        <Link to="/about">About</Link>
                    </li>
                    <li className='px-4 hover:text-[#ee964b]'>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li className='px-4 hover:text-[#ee964b] cursor-pointer'>
                        Cart
                    </li>
                    <button
                        className='login-btn px-4 hover:text-[#ee964b]'
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