import RestaurantCards from "./RestaurantCards";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
    // state variable
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurants] = useState([]);

    const [searchText, setSearchText] = useState('');

    const onlineSatus = useOnlineStatus();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=32.68174848851485&lng=74.90224409848452&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

        const jsonData = await data.json();
        setListOfRestaurants(jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurants(jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    if (onlineSatus === false) {
        return (
            <h1>
                Oops! Looks like you are not connected to the internet. Please check your connection.
            </h1>
        );
    }

    return listOfRestaurants.length === 0 ? (
        <Shimmer />
    ) : (
        <div className="body">
            <div className="top-container">
                <div className="search">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search your favorite restaurant"
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                    <button
                        className="search-btn"
                        value={searchText}
                        onClick={() => {
                            const filteredRestaurant = listOfRestaurants.filter(
                                (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                            );
                            setFilteredRestaurants(filteredRestaurant);
                        }}
                    >
                        Search
                    </button>
                </div>
                <div className="filter">
                    <button
                        className="btn-filter"
                        onClick={() => {
                            const filteredList = listOfRestaurants.filter(
                                (res) => res.info.avgRating > 4
                            );
                            setFilteredRestaurants(filteredList);
                        }}
                    >
                        Top Rated Restaurant
                    </button>
                </div>
            </div>
            <div className="res-container">
                {
                    filteredRestaurant.map(restaurant => (
                        <Link
                            to={"/restaurants/" + restaurant.info.id}
                            key={restaurant.info.id}
                        >
                            <RestaurantCards ResData={restaurant} />
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default Body;