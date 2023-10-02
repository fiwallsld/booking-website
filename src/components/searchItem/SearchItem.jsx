import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ hotel }) => {
  return (
    <div className="searchItem">
      <img src={hotel.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">
          <Link to={`/hotels/${hotel._id}`}>{hotel.name}</Link>
        </h1>
        <span className="siDistance">{hotel.distance} from center</span>
        {/* <span className="siTaxiOp">{hotel.tag}</span> */}
        <span className="siTaxiOp">Free Airport Taxi</span>
        <span className="siSubtitle">{hotel.rooms[0].desc}</span>
        <span className="siFeatures">
          {hotel.type} * {hotel.rooms[0].title}
        </span>

        {/* {free_cancel ? (
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        ) : (
          <div></div>
        )} */}
      </div>
      <div className="siDetails">
        <div className="siRating">
          {/* <span>{rate_text}</span> */}
          <span>Excellent</span>
          <button>{hotel.rating} </button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${hotel.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${hotel._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
