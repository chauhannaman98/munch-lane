import { CDN_URL } from "../utils/constants";

const RestaurantCards = (props) => {
    const { ResData } = props;

    const {
        cloudinaryImageId,
        name,
        cuisines,
        avgRatingString,
        sla,
        costForTwo
    } = ResData?.info

    url = 'url("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/' + { cloudinaryImageId } + '")'

    return (
        <div className="res-card" style={{ backgroundColor: "#f0f0f0" }}>
            <img
                className="res-logo"
                alt="res-logo"
                src={CDN_URL + cloudinaryImageId}
            />
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRatingString}</h4>
            <h4>{costForTwo}</h4>
            <h4>{sla.deliveryTime} mins</h4>
        </div>
    );
};

export default RestaurantCards;