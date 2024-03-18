import { useEffect, useState } from "react";
import { RESTAURANT_MENU_URL } from "./constants";

const useRestaurantMenu = (resID) => {
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(RESTAURANT_MENU_URL + resID);
        const json = await data.json();

        setResInfo(json.data);
    }

    return resInfo;
};

export default useRestaurantMenu;