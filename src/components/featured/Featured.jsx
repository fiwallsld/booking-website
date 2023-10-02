import "./featured.css";

const Featured = ({ err, isLoading, hotels }) => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img src="./images/Ha Noi.jpg" alt="Ha Noi" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ha Noi</h1>
          <h2>
            {hotels.filter((hotel) => hotel.city === "Ha Noi").length}{" "}
            properties
          </h2>
        </div>
      </div>

      <div className="featuredItem">
        <img src="./images/HCM.jpg" alt="HCM" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ho Chi Minh</h1>
          <h2>
            {hotels.filter((hotel) => hotel.city === "Ho Chi Minh").length}{" "}
            properties
          </h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="./images/Da Nang.jpg" alt="Da Nang" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>
            {hotels.filter((hotel) => hotel.city === "Da Nang").length}{" "}
            properties
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
