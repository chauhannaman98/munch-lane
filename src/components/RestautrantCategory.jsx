import ItemList from "./ItemList";

const RestaurantCategory = (props) => {
    const { card } = props?.card?.card;

    return (
        <div>
            <div className="w-full bg-gray-50 shadow-lg m-4 p-4">
                <div
                    className="flex justify-between cursor-pointer"
                    onClick={handleClick}
                >
                    <span className="font-medium text-xl">{card?.title} ({card?.itemCards.length})</span>
                    <span>⬇️</span>
                </div>
                {
                    showItems && <ItemList items={card} />
                }
            </div>
        </div>
    );
};

export default RestaurantCategory;