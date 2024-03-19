import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";


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


    const itemCards = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card?.itemCards;

    return (
        <div className="menu m-10 px-52">
            <h1 className="font-bold text-4xl mb-4">{name}</h1>
            <h2 className="font-thin">{cuisines.join(", ")}</h2>
            <h3 className="font-thin">{locality}, {sla.lastMileTravelString} | {costForTwoMessage}</h3>
            <h3 className="my-2">⌛{sla.deliveryTime} mins&emsp;&emsp;⭐{avgRatingString}</h3>
            <h2 className="mt-12 mb-4 font-bold text-2xl">Menu</h2>
            <ul>
                {itemCards.map((item) => (
                    <li
                        key={item.card.info.id}
                        className="my-4">
                        <h4>
                            {item.card.info.name} -&nbsp;
                            ₹{(item.card.info.price / 100) || (item.card.info.defaultPrice / 100)}
                        </h4>
                        <p className="font-thin text-xs">{item.card.info.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantMenu;