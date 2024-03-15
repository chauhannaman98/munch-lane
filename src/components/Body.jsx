import RestaurantCards from "./RestaurantCards";
import resList from '../utils/mockData';
import { useState } from "react";

const Body = () => {
    // state variable
    const [listOfRestaurants, setListOfRestaurants] = useState(resList);

    return (
        <div className="body">
            <div className="filter">
                <button
                    className="btn-filter"
                    onClick={() => {
                        const filteredList = listOfRestaurants.filter(
                            (res) => res.info.avgRating > 4
                        );
                        setListOfRestaurants(filteredList);
                    }}
                >
                    Top Rated Restaurant
                </button>
            </div>
            <div className="res-container">
                {
                    listOfRestaurants.map(restaurant => (
                        <RestaurantCards key={restaurant.info.id} ResData={restaurant} />
                    ))
                }
            </div>
        </div>
    );
};

export default Body;