import ItemList from "./ItemList";

const RestaurantCategory = ({ card, showItems, setShowIndex }) => {

    const handleClick = () => {
        setShowIndex();
    };

    return (
        <div>
            <div className="w-full bg-gray-50 shadow-lg m-4 p-4">
                <div
                    className="flex justify-between cursor-pointer"
                    onClick={handleClick}
                >
                    <span className="font-medium text-xl">{card?.card?.card?.title} ({card?.card?.card?.itemCards.length})</span>
                    <span>⬇️</span>
                </div>
                {
                    showItems && <ItemList items={card.card.card} />
                }
            </div>
        </div>
    );
};

export default RestaurantCategory;