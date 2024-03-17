import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { RESTAURANT_MENU_URL } from "../utils/constants";


const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null);

    const { resID } = useParams();

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch(RESTAURANT_MENU_URL + resID);

        const jsonData = await data.json();
        setResInfo(jsonData?.data);
    };

    if (resInfo === null) return <Shimmer />;

    const { name, locality, cuisines, costForTwoMessage } =
        resInfo?.cards[0]?.card?.card?.info;


    const itemCards = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards;

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