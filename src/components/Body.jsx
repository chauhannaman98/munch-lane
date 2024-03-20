import RestaurantCards, { withIsOpenLabel } from "./RestaurantCards";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
    // state variable
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurants] = useState([]);
    const [ratingsFilter, setRatingsFilter] = useState(false);
    const [searchText, setSearchText] = useState('');

    const RestaurantCardOnline = withIsOpenLabel(RestaurantCards);

    const onlineSatus = useOnlineStatus();

    useEffect(() => {
        const filteredList = listOfRestaurants.filter(
            (res) => res.info.avgRating > 4
        );
        ratingsFilter === true
            ? setFilteredRestaurants(filteredList)
            : setFilteredRestaurants(listOfRestaurants);
    }, [ratingsFilter]);

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
            <div className="top-container flex p-4 justify-between">
                <div className="search">
                    <input
                        type="text"
                        className="search-input w-80 mr-6 border-2 border-solid border-slate-500 rounded-full p-1 px-4"
                        placeholder="Search your favorite restaurant"
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                    <button
                        className="search-btn bg-[#0d3b66] text-white p-1 px-4 rounded-full"
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
                <div className="filter ">
                    <button
                        className="btn-filter border-gray-500 border-solid border-2 rounded-full p-1 px-4 shadow-lg"
                        onClick={() => {
                            const filteredList = listOfRestaurants.filter(
                                (res) => res.info.avgRating > 4
                            );
                            setFilteredRestaurants(filteredList);
                        }}
                    >
                        Ratings 4.0+
                    </button>
                </div>
            </div>
            <div className="res-container flex mt-4 p-10 px-48 flex-wrap justify-evenly">
                {
                    filteredRestaurant.map(restaurant => (
                        <Link
                            to={"/restaurants/" + restaurant.info.id}
                            key={restaurant.info.id}
                        >
                            {
                                restaurant.info.isOpen
                                    ? (<RestaurantCardOnline ResData={restaurant} />)
                                    : (<RestaurantCards ResData={restaurant} />)
                            }
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default Body;