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
                        shadow-lg rounded-2xl hover:transition ease-out  delay-100 duration-500 hover:scale-90"
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


export const withIsOpenLabel = (RestaurantCards) => {
    return (props) => {
        return (
            <div>
                <label
                    className="z-10 m-2 p-2 rounded-lg shadow-lg absolute bg-[#faf0ca] text-green-500 font-bold"
                >
                    Open
                </label>
                <RestaurantCards {...props} />
            </div>
        )
    };
};


export default RestaurantCards;