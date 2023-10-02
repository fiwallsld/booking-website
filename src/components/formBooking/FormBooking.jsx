import { DateRange } from "react-date-range";
import { useState } from "react";
import SelectRoom from "./SelectRoom";
import { useCallback } from "react";
import { useEffect } from "react";
import alertify from "alertifyjs";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/userContext";
import "./formBooking.css";

function FormBooking({ hotel }) {
  const navigate = useNavigate();
  const { userAxios } = useUser();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [card, setCart] = useState("");
  const [rooms, setRooms] = useState([]);
  const [payment, setPayment] = useState("nothing");
  const [error, setError] = useState({});

  const [bill, setBill] = useState(0);
  const [totalBill, setTotalBill] = useState(0);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleCheck = useCallback(
    (roomInput) => {
      let tmpRooms = [...rooms];
      if (roomInput.checked) {
        tmpRooms.push(roomInput.value);
        setBill((pre) => (pre += roomInput.price));
      } else {
        tmpRooms = tmpRooms.filter((room) => room !== roomInput.value);
        setBill((pre) => (pre -= roomInput.price));
      }
      setRooms(tmpRooms);
    },
    [rooms]
  );

  useEffect(() => {
    const sumDate =
      (new Date(date[0].endDate) - new Date(date[0].startDate)) /
        (1000 * 60 * 60 * 24) +
      1;
    setTotalBill(bill * sumDate);
  }, [date, rooms]);

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const res = await userAxios.post(`/hotels/${hotel._id}`, {
        hotel: hotel._id,
        date: date,
        fullName,
        email,
        phone,
        card,
        rooms,
        price: totalBill,
        payment,
      });

      setError({});

      alertify.set("notifier", "position", "top-center");
      alertify.success(res.data.mes);
      setTimeout(() => {
        navigate("/transaction");
      }, 1500);
    } catch (err) {
      setError(err.response.data);
      alertify.set("notifier", "position", "top-center");
      alertify.error(
        err.response.data ? err.response.data.mes : "Something went wrong!!!"
      );
    }
  };
  return (
    <div>
      <form onSubmit={submitHandle}>
        <div className="form">
          <div>
            <h2>Date</h2>
            <div className="">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
              />
            </div>
          </div>
          <div className="form-info">
            <h2>Reserve Info</h2>
            <label htmlFor="fullName">Your Full Name:</label>
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              className={`${error.fullName ? "danger" : ""}`}
            />
            {error.fullName && (
              <>
                <span className="textDanger">{error.fullName}</span>
                <br />
              </>
            )}
            <label htmlFor="email">Your Email:</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={`${error.email ? "danger" : ""}`}
            />
            {error.email && (
              <>
                <span className="textDanger">{error.email}</span>
                <br />
              </>
            )}
            <label htmlFor="phone">Your Phone Number:</label>
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className={`${error.phone ? "danger" : ""}`}
            />
            {error.phone && (
              <>
                <span className="textDanger">{error.phone}</span>
                <br />
              </>
            )}
            <label htmlFor="cardNumber">Your Identity Card Number:</label>
            <input
              name="cardNumber"
              type="text"
              placeholder="Card Number"
              value={card}
              onChange={(e) => {
                setCart(e.target.value);
              }}
              className={`${error.card ? "danger" : ""}`}
            />
            {error.card && (
              <>
                <span className="textDanger">{error.card}</span>
                <br />
              </>
            )}
          </div>
        </div>

        <h2>Select Rooms</h2>
        {error.rooms && <span className="textDanger">{error.rooms}</span>}
        <div className="form-room">
          {hotel.rooms.map((room) => (
            <SelectRoom
              room={room}
              onCheck={handleCheck}
              key={room._id}
              error={error.rooms ? true : false}
            />
          ))}
        </div>
        <hr className="mb-2" />

        <h2>Total Bill: ${totalBill}</h2>

        <div className="form-pay">
          <div className="form-pay--method">
            <select
              name="payMethod"
              value={payment}
              onChange={(e) => {
                setPayment(e.target.value);
              }}
            >
              <option value="nothing">Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="CreditCard">Credit Card</option>
            </select>
            <br />
            {error.payment && (
              <span className="textDanger">{error.payment}</span>
            )}
          </div>
          <div>
            <button className="btn" type="submit">
              Reserve
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormBooking;
