import { useDispatch } from "react-redux";
import { addItem } from "../../utils/redux/cartSlice";

const ItemList = ({ items, dummy }) => {
    const dispatch = useDispatch();

    const handleAddItem = (item) => {
        dispatch(addItem(item));
    };

    return (
        <div>
            {
                items.itemCards.map((item) => (
                    <div
                        data-testid="menu-item"
                        key={item.card.info.id}
                        className="flex justify-between my-6 border-b-2 border-solid border-slate-200"
                    >
                        <div>
                            <div className="flex flex-col">
                                <span>
                                    {item.card.info.name}&emsp; {
                                        (item.card.info.itemAttribute.vegClassifier) === "VEG"
                                            ? "🟢" : "🔴"
                                    }
                                </span>
                                <span>₹{(item.card.info.price / 100) || (item.card.info.defaultPrice / 100)}</span>
                            </div>
                            <div className="mb-6 text-xs font-thin">
                                <p>{item.card.info.description}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center w-24 ml-8">
                            <button
                                className="w-24 h-10 border-[#00A300] border-solid border-2 text-[#00A300]
                                                rounded-lg hover:shadow-lg hover:bg-[#00A300] hover:text-white"
                                onClick={() => handleAddItem(item)}
                            >
                                Add +
                            </button>
                        </div>
                    </div>
                ))
            }
        </div >
    );
};

export default ItemList;