import { useSelector, useDispatch } from "react-redux";
import CartItems from "./CartItems";
import { clearCart } from "../../utils/redux/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();

    const cartItems = useSelector((store) => store.cart.items);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="m-12 px-10 mx-20">
            <div className="flex justify-between">
                <h1 className="font-semibold text-4xl">Cart</h1>
                <button
                    className="border-[#f4d35e] border-solid border-2 rounded-full p-1 px-4
                                    hover:bg-[#f4d35e] hover:text-white"
                    onClick={handleClearCart}
                >
                    Clear Cart
                </button>
            </div>
            <div>
                {cartItems.length === 0 && (
                    <h1 className="text-center my-16 text-slate-700 font-medium text-xl">
                        Opps! Your cart is empty as your stomach. Don't strave yourself and add some food. 😋
                    </h1>
                )}
                <CartItems items={cartItems} />
            </div>
        </div>
    );
};

export default Cart;