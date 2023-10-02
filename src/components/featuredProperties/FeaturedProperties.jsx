import { Link } from "react-router-dom";
import "./featuredProperties.css";

const FeaturedProperties = ({ hotels }) => {
  const sortHotels = hotels?.sort((a, b) => b.rating - a.rating).slice(0, 3);

  // console.log(sortHotels);
  return (
    <div className="fp">
      {sortHotels.map((hotel) => (
        <div className="fpItem" key={hotel._id}>
          <img
            src={hotel.photos[Math.floor(Math.random() * hotel.photos.length)]}
            alt=""
            className="fpImg"
          />
          <span className="fpName">
            <Link to={`/hotels/${hotel._id}`}>{hotel.name}</Link>
          </span>
          <span className="fpCity">{hotel.city}</span>
          <span className="fpPrice">Starting from ${hotel.cheapestPrice}</span>
          <div className="fpRating">
            <button>{hotel.rating}</button>
            <span>Excellent</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
