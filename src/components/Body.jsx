import RestaurantCards from "./RestaurantCards";
import resList from '../utils/mockData';

const Body = () => {
    return (
        <div className="body">
            <div className="search">Search Bar</div>
            <div className="res-container">
                {
                    resList.map(restaurant => (
                        <RestaurantCards key={restaurant.info.id} ResData={restaurant} />
                    ))
                }
            </div>
        </div>
    );
};

export default Body;