function SelectRoom({ room, onCheck, error }) {
  const { title, maxPeople, price } = room;
  // console.log(room);
  return (
    <div className="form-room--info">
      <div className="form-room--text">
        <h3>{title}</h3>
        <p>Pay nothing until September 04, 2022</p>
        <span>Max people: {maxPeople}</span>
        <h3>${price}</h3>
      </div>
      <div className="form-room--check">
        {room.roomNumbers.map((num) => (
          <div
            className={`form-room--checkBox ${error ? "textDanger" : ""}`}
            key={num._id}
          >
            <span>{num}</span>
            <br />
            <input
              type="checkbox"
              value={num}
              onChange={(e) => {
                onCheck({
                  value: e.target.value,
                  checked: e.target.checked,
                  price: price,
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectRoom;
