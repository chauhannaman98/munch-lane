import { useState, useContext } from 'react';
import { LOGO_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
    const [btnName, setButtonName] = useState(['Login']);

    const { loggedInUser } = useContext(UserContext);

    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);

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
                    <li className='px-4 font-bold hover:text-[#ee964b] cursor-pointer'>
                        Cart ({cartItems.length})
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
                    <li className='px-4 font-bold hover:text-[#e76f51] cursor-pointer'>
                        {loggedInUser}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;