import { CDN_URL } from "../utils/constants";

const RestaurantCards = (props) => {
    const { ResData } = props;

    const {
        cloudinaryImageId,
        name,
        cuisines,
        avgRating,
        sla,
        costForTwo
    } = ResData?.info

    return (
        <div
            className="res-card m-4 p-4 w-56 flex flex-col justify-center
                        shadow-lg rounded-2xl"
            style={{ backgroundColor: "#f0f0f0" }}>
            <div
                className="w-50 flex justify-center mb-4">
                <img
                    className="res-logo object-cover w-full h-48 rounded-2xl"
                    alt="res-logo"
                    src={CDN_URL + cloudinaryImageId}
                />
            </div>
            <h3 className="font-bold">{name}</h3>
            <h4>⭐{avgRating}&nbsp; • &nbsp;{sla.deliveryTime} mins</h4>
            <h4 className="font-thin">{cuisines.join(", ")}</h4>
            <h4>{costForTwo}</h4>
            <h4></h4>
        </div>
    );
};

export default RestaurantCards;