import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestautrantCategory";


const RestaurantMenu = () => {
    const { resID } = useParams();

    const resInfo = useRestaurantMenu(resID);

    if (resInfo === null) return <Shimmer />;

    const {
        name,
        locality,
        cuisines,
        costForTwoMessage,
        sla,
        avgRatingString,
    } = resInfo?.cards[0]?.card?.card?.info;

    const categories = (resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (res) => res?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ));

    return (
        <div className="menu m-10 px-52">
            <h1 className="font-bold text-4xl mb-4">{name}</h1>
            <h2 className="font-thin">{cuisines.join(", ")}</h2>
            <h3 className="font-thin">{locality}, {sla.lastMileTravelString} | {costForTwoMessage}</h3>
            <h3 className="my-2">⌛{sla.deliveryTime} mins&emsp;&emsp;⭐{avgRatingString}</h3>
            <h2 className="mt-12 mb-4 font-bold text-3xl">Menu</h2>
            <div className="menu">
                {categories.map((category, index) =>
                    <RestaurantCategory
                        key={index}
                        card={category}
                    />
                )}
            </div>
        </div>
    );
};

export default RestaurantMenu;