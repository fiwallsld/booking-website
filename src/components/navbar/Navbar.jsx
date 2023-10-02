import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../store/userContext";
import { useEffect } from "react";

import "./navbar.css";

const Navbar = () => {
  const { user, setUser, userAxios } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const userAuto = JSON.parse(localStorage.getItem("user"));
    if (userAuto) {
      const autoLogin = async () => {
        try {
          const res = await userAxios.post(`auth?mode=login`, {
            data: userAuto,
          });
          setUser(res.data.user);
        } catch (err) {
          console.log("user not found");
          localStorage.removeItem("user");
        }
      };
      autoLogin();
    }
  }, []);

  const handleLogout = async () => {
    try {
      const res = await userAxios.get(`/logout`);
      setUser("");
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <h2 className="logo">
          <Link to="/">Booking Website</Link>
        </h2>

        <div className="navItems">
          {!user && (
            <>
              <button className="navButton">
                <Link to="/auth?mode=sign-up">Sign Up</Link>
              </button>
              <button className="navButton">
                <Link to="auth?mode=login">Login</Link>
              </button>
            </>
          )}
          {user && (
            <>
              <span>{user.email}</span>
              <button className="navButton">
                <Link to={`/transaction?API=${user.username}`}>
                  Transactions
                </Link>
              </button>
              <button className="navButton" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
