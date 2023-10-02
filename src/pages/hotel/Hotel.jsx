import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormBooking from "../../components/formBooking/FormBooking";
import alertify from "alertifyjs";
import { useUser } from "../../store/userContext";
import "./hotel.css";

const Hotel = () => {
  const { user, userAxios } = useUser();

  const hotelId = useParams().hotelId;
  const [hotel, setHotel] = useState(null);
  const [isShowBook, setIsShowBook] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userAxios.get(`hotels/${hotelId}`);
        setHotel(res.data);
      } catch (err) {
        alertify.set("notifier", "position", "top-center");
        alertify.error(`Something went wrong!`);
      }
    };
    getData();
  }, [user]);

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const photos = hotel?.photos;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <>
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        {!hotel && <h3>Loading ...</h3>}
        {hotel && (
          <div className="hotelWrapper">
            <button
              className="bookNow"
              onClick={() => setIsShowBook((pre) => !pre)}
            >
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{hotel.title}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{hotel.address}</span>
            </div>
            <span className="hotelDistance">
              {`Excellent location – ${hotel.distance}m from center`}
            </span>
            <span className="hotelPriceHighlight">
              {`Book a stay over $${hotel.cheapestPrice} at this property and get a free airport taxi`}
            </span>
            <div className="hotelImages">
              {photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{hotel.title}</h1>
                <p className="hotelDesc">{hotel.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a 9-night stay!</h1>
                <span>
                  {`Located in the real heart of Krakow, this property has an
                  excellent location score of ${hotel.rating}!`}
                </span>
                <h2>
                  <b>$945</b> (9 nights)
                </h2>
                <button onClick={() => setIsShowBook((pre) => !pre)}>
                  Reserve or Book Now!
                </button>
              </div>
            </div>
            {isShowBook && <FormBooking hotel={hotel} />}
          </div>
        )}
      </div>
    </>
  );
};

export default Hotel;
