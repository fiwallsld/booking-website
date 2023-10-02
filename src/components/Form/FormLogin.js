import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../../store/userContext";

import styles from "./Login.module.css";

function FormLogin() {
  const navigate = useNavigate();
  const { user, setUser, userAxios } = useUser();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const [errorDataInput, setErrorDataInput] = useState({});
  const [resSuccess, setResSuccess] = useState(null);

  const [dataInput, setDataInput] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDataInput({
      ...dataInput,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userAxios.post(
        `auth?mode=${isLogin ? "login" : "sign-up"}`,
        { data: dataInput }
      );

      if (isLogin) {
        setUser(res.data.user);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: res.data.user.username,
            password: res.data.user.password,
          })
        );
      }

      setResSuccess(res.data);

      setTimeout(() => {
        setResSuccess(null);
        setErrorDataInput({});
        isLogin ? navigate("/") : navigate("/auth?mode=login");
      }, 1500);
    } catch (err) {
      setErrorDataInput(err.response.data);
    }
  };

  return (
    <form className={`${styles.contain} text-center`} onSubmit={handleSubmit}>
      <h2 className={`${styles.title} mb-2`}>
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      <hr className="mb-3" />
      {resSuccess ? (
        <div className="mb-3">
          <h2 className="mb-1">{resSuccess.mesSuccess}</h2>
          <p>{`Redirecting to ${isLogin ? "home page" : "login page"} ...`}</p>
        </div>
      ) : (
        <div className={`${styles.inputs} my-3`}>
          <input
            type="text"
            name="username"
            value={dataInput.username}
            onChange={handleOnChange}
            placeholder="User name"
            className={`${errorDataInput.username ? styles.danger : ""} w-100`}
          />
          {errorDataInput.username && (
            <span className={`${styles.textDanger} mb-2`}>
              {errorDataInput.username}
            </span>
          )}
          <input
            type="password"
            name="password"
            value={dataInput.password}
            onChange={handleOnChange}
            placeholder="Password"
            className={`${errorDataInput.password ? styles.danger : ""}`}
          />
          {errorDataInput.password && (
            <span className={`${styles.textDanger} mb-2`}>
              {errorDataInput.password}
            </span>
          )}
          {!isLogin ? (
            <>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={dataInput.fullName}
                onChange={handleOnChange}
                className={`${errorDataInput.fullName ? styles.danger : ""}`}
              />
              {errorDataInput.fullName && (
                <span className={`${styles.textDanger} mb-2`}>
                  {errorDataInput.fullName}
                </span>
              )}
              <input
                type="email"
                name="email"
                value={dataInput.email}
                onChange={handleOnChange}
                placeholder="Email"
                className={`${errorDataInput.email ? styles.danger : ""} w-100`}
              />
              {errorDataInput.email && (
                <span className={`${styles.textDanger} mb-2`}>
                  {errorDataInput.email}
                </span>
              )}
              <input
                type="phone"
                name="phone"
                value={dataInput.phone}
                onChange={handleOnChange}
                placeholder="Phone Number"
                className={`${errorDataInput.phone ? styles.danger : ""}`}
              />
              {errorDataInput.phone && (
                <span className={`${styles.textDanger} mb-2`}>
                  {errorDataInput.phone}
                </span>
              )}
            </>
          ) : null}
        </div>
      )}

      <button
        className={`btn ${styles.formBtn} pri-bgr mb-3 ${
          resSuccess ? "disabled" : ""
        }`}
        type="submit"
        disabled={resSuccess ? true : false}
      >
        {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
      </button>

      <div className={``}>
        <span to="">
          {isLogin ? "Create an account? " : "Login? "}
          <Link
            to={`?mode=${isLogin ? "signup" : "login"}`}
            className={`${resSuccess ? "dis" : ""}`}
          >
            Click
          </Link>
        </span>
      </div>
    </form>
  );
}

export default FormLogin;
