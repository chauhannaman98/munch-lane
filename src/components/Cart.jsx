import { useSelector } from "react-redux";
import CartItems from "./CartItems";

const Cart = () => {

    const cartItems = useSelector((store) => store.cart.items);

    return (
        <div className="m-12 px-10 mx-20">
            <h1 className="font-semibold text-4xl">Cart</h1>
            <div>
                <CartItems items={cartItems} />
            </div>
        </div>
    );
};

export default Cart;