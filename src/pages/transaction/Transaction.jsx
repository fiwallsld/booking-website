import { useEffect } from "react";
import { useUser } from "../../store/userContext";
import { useState } from "react";
import formatDate from "../../components/hook/useFormatDate";
import alertify from "alertifyjs";

import "./transaction.css";

function Transaction() {
  const { user, userAxios } = useUser();
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userAxios.get(`transaction?API=${user?.username}`);
        setTransactions(res.data);
      } catch (err) {
        alertify.set("notifier", "position", "top-center");
        alertify.error(`Something went wrong!`);
      }
    };
    getData();
  }, [user]);

  return (
    <div className="container-table">
      <h2>Your Transactions</h2>
      <br />
      {!transactions && <h2>Loading...</h2>}
      {transactions && (
        <table className="table">
          <thead className="tr-head">
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trans, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="td--name">{trans.hotel}</td>
                <td>{trans.room.toString()}</td>
                <td>
                  {`${formatDate(trans.dateStart)} - ${formatDate(
                    trans.dateEnd
                  )}`}
                </td>
                <td>${trans.price}</td>
                <td>{trans.payment}</td>
                <td>
                  <span className={`td--status ${trans.status.toLowerCase()}`}>
                    {trans.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Transaction;
