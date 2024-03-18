import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";


const RestaurantMenu = () => {
    const { resID } = useParams();

    const resInfo = useRestaurantMenu(resID);

    if (resInfo === null) return <Shimmer />;

    const { name, locality, cuisines, costForTwoMessage } =
        resInfo?.cards[0]?.card?.card?.info;


    const itemCards = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card?.itemCards;

    return (
        <div className="menu">
            <h1>{name}</h1>
            <h2>{cuisines.join(", ")}</h2>
            <h3>{locality} | {costForTwoMessage}</h3>
            <h2>Menu</h2>
            <ul>
                {itemCards.map((item) => (
                    <li key={item.card.info.id}>
                        <h4>
                            {item.card.info.name} -&nbsp;
                            {(item.card.info.price / 100) || (item.card.info.defaultPrice / 100)}
                        </h4>
                        <p>{item.card.info.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantMenu;