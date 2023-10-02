import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { useUser } from "../../store/userContext";
import "./list.css";

const List = () => {
  const { userAxios } = useUser();
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [options, setOptions] = useState(location.state.options);

  const [openDate, setOpenDate] = useState(false);
  const [hotels, setHotels] = useState();

  const [error, setError] = useState(null);

  const [searchData, setSearchData] = useState({
    destination,
    date,
    options,
    minPrice,
    maxPrice,
  });

  const searchHandle = () => {
    setSearchData({ destination, date, options });
  };

  useEffect(() => {
    const searchFn = async () => {
      try {
        const res = await userAxios.post("hotels/search", searchData);
        setHotels(res.data);
        setError(null);
      } catch (err) {
        setError(err.response);
        setHotels([]);
      }
    };

    searchFn();
  }, [searchData]);

  return (
    <>
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                value={destination}
                type="text"
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span
                className="show-date"
                onClick={() => setOpenDate(!openDate)}
              >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                date[0].endDate,
                "dd/MM/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    name="minPrice"
                    min={0}
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    name="maxPrice"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    onChange={(e) => {
                      setOptions((pre) => ({ ...pre, adult: e.target.value }));
                    }}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                    onChange={(e) => {
                      setOptions((pre) => ({
                        ...pre,
                        children: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                    onChange={(e) => {
                      setOptions((pre) => ({ ...pre, room: e.target.value }));
                    }}
                  />
                </div>
              </div>
            </div>
            <button onClick={searchHandle}>Search</button>
          </div>
          <div className="listResult">
            {error && <h3>{error?.mes}</h3>}
            {hotels?.length > 0 &&
              hotels.map((hotel) => (
                <SearchItem hotel={hotel} key={hotel._id} />
              ))}
            {/* <SearchItem /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
