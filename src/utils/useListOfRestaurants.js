import { useEffect, useState } from "react";

const useListOfRestaurants = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState(null);

    console.log("Hook called");

    useEffect(() => {
        console.log("useEffect called");
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=32.68174848851485&lng=74.90224409848452&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

        const jsonData = await data.json();
        console.log("called fetchData");
        setListOfRestaurants(jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    console.log(listOfRestaurants);

    return listOfRestaurants;
};

export default useListOfRestaurants;