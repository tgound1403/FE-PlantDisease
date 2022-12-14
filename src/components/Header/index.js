import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "../../redux/userSlice";
import "./index.css";
import { Modal } from "../Modal";
import axios from "axios";

require("dotenv").config();

export const Header = ({ isOpenModal, setIsOpenModal }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isActiveHeader, setIsActiveHeader] = useState(false);
  const [tabActive, setTabActive] = useState(0);

  const lineRef = useRef(null);
  const loginRef = useRef(null);

  const { pathname } = useLocation();

  function handleOnScroll() {
    if (this.scrollY > 120) {
      setIsActiveHeader(true);
    } else {
      setIsActiveHeader(false);
    }
  }

  const handleActiveTab = (e, index) => {
    setTabActive(index);
    lineRef.current.style.left = e.target.offsetLeft + "px";
    lineRef.current.style.width = e.target.offsetWidth + "px";
  };

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);
    return () => window.removeEventListener("scroll", handleOnScroll);
  }, []);

  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.style.left = loginRef.current.offsetLeft + "px";
      lineRef.current.style.width = loginRef.current.offsetWidth + "px";
    }
  }, [isOpenModal]);

  // *Code for LOGIN
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    console.log("Getting information from input");
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${
          process.env.BACKEND_API_URL ||
          "https://desolate-everglades-44147.herokuapp.com"
        }/api/users/login`,

        {
          email,
          password,
        },
        config
      );
      console.log("Login successful, User information: ");
      setIsOpenModal(false);
      dispatch(loginSuccess(data));
      history.push("/");
      console.log(data);
      // localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error.message);
      setError("Email ho???c m???t kh???u kh??ng ????ng, vui l??ng th??? l???i");
      dispatch(loginFailure());
      console.log("User not found, please check again or register");
    }
  };

  // *Code for REGISTER
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function CheckPassword(inputPassword) {
    if (inputPassword.length < 8) {
      setError("M???t kh???u c???a b???n ph???i c?? ????? d??i t??? 8 k?? t??? tr??? l??n");
      console.log("Your password must be at least 8 characters");
      return false;
    }
    if (inputPassword.search(/[a-z]/i) < 0) {
      setError("M???t kh???u c???a b???n ph???i c?? ??t nh???t m???t ch??? c??i");
      console.log("Your password must contain at least one letter.");
      return false;
    }
    if (inputPassword.search(/[0-9]/) < 0) {
      setError("M???t kh???u c???a b???n ph???i c?? ??t nh???t m???t con s???");
      console.log("Your password must contain at least one digit.");
      return false;
    }
    if (inputPassword.search(/[!@#$%^&*]/) > 0) {
      setError("M???t kh???u c???a b???n kh??ng ???????c ch???a k?? t??? ?????c bi???t");
      console.log("Your password mustn't contain special character");
      return false;
    } else return true;
  }

  const registerHandler = async (e) => {
    e.preventDefault();

    if (CheckPassword(password)) {
      if (password !== confirmPassword) {
        setError("M???t kh???u kh??ng kh???p, vui l??ng th??? l???i");
        console.log("Register failed because password not match");
      } else {
        setError(null);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          };
          const { data } = await axios.post(
            `${
              process.env.BACKEND_API_URL ||
              "https://desolate-everglades-44147.herokuapp.com"
            }/api/users`,
            {
              name,
              email,
              password,
              verified: false,
            },
            config
          );
          console.log("Register successful");
          history.push("/");
          alert(
            "M???t email ???? ???????c g???i ?????n h???p th?? c???a b???n, vui l??ng ki???m tra v?? k??ch ho???t t??i kho???n"
          );
          // setIsLogin(true);
          setIsOpenModal(false);
          console.log(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (err) {
          console.log(err);
          console.log("Register failed");
        }
      }
    } else {
      console.log("Password requirement not meet");
    }
  };

  return (
    <>
      <Modal isOpen={isOpenModal} stateOpenModal={setIsOpenModal}>
        <div className="modal__wrap-content">
          <div className="tabs">
            <div
              className={`tab-item ${tabActive === 0 ? "active" : ""}`}
              onClick={(e) => handleActiveTab(e, 0)}
              ref={loginRef}
            >
              ????ng nh???p
            </div>
            <div
              className={`tab-item ${tabActive === 1 ? "active" : ""}`}
              onClick={(e) => handleActiveTab(e, 1)}
            >
              ????ng k??
            </div>
            <div className="line" ref={lineRef}></div>
          </div>
          <div className="panes">
            <div className="loginContainer">
              <form onSubmit={loginHandler}>
                <div className={`pane-item ${tabActive === 0 ? "active" : ""}`}>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Nh???p email c???a b???n"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      M???t kh???u
                    </label>
                    <div>
                      <input
                        required
                        type="password"
                        className="form-control password"
                        placeholder="Nh???p m???t kh???u c???a b???n"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                  </div>
                  <Link to="/forgot-password">
                    <div className="forget-password">Qu??n m???t kh???u?</div>
                  </Link>
                  <div className="wrap-btn-login">
                    {error !== "" ? <div className="error">{error}</div> : ""}

                    <button
                      className="btn-login"
                      varian="primary"
                      type="submit"
                    >
                      ????ng nh???p
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="registerContainer">
              <form onSubmit={registerHandler}>
                <div className={`pane-item ${tabActive === 1 ? "active" : ""}`}>
                  <div className="form-group">
                    <label htmlFor="" className="form-label">
                      T??n ng?????i d??ng
                    </label>
                    <input
                      required
                      type="text"
                      id="username"
                      placeholder="Nh???p t??n t??i kho???n c???a b???n"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="Nh???p email c???a b???n"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="" className="form-label">
                      M???t kh???u
                    </label>
                    <div>
                      <input
                        required
                        type="password"
                        placeholder="Nh???p m???t kh???u c???a b???n"
                        className="form-control password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="" className="form-label">
                      Nh???p l???i m???t kh???u
                    </label>
                    <input
                      required
                      type="password"
                      className="form-control password"
                      placeholder="Nh???p l???i m???t kh???u c???a b???n"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                  </div>

                  <div className="wrap-btn-login">
                    {
                      error !== "" ? <div className="error">{error}</div> : ""
                      // <Route exact path='../Landing.js' component={Landing} />
                    }
                    <button className="btn-login" type="submit">
                      ????ng k??
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      <header className={`header ${isActiveHeader ? "active" : ""}`}>
        <div className="container">
          <div className="header__wrap">
            <div className="header__logo">
              <Link to="/home">
                <span className="header__logo-text">PLANT</span>
                <span className="header__logo-text-right">DISEASE</span>
              </Link>
            </div>

            <ul className="header__nav-list">
              <Link
                to="/home"
                className={`header__nav-item ${
                  pathname === "/home" && !isOpenModal ? "active" : ""
                }`}
              >
                <p className="header__nav-right">Trang ch???</p>
              </Link>
              <Link
                to="/du-doan"
                className={`header__nav-item ${
                  pathname === "/du-doan" && !isOpenModal ? "active" : ""
                }`}
              >
                <p className="header__nav-right header__nav-predict">D??? ??o??n</p>
              </Link>
              <Link
                to="/forum"
                className={`header__nav-item ${
                  pathname === "/forum" && !isOpenModal ? "active" : ""
                }`}
              >
                <p className="header__nav-right">Di???n ????n</p>
              </Link>

              <li
                className={`header__nav-sign header__nav-item ${isOpenModal}`}
                onClick={() => {
                  if (!currentUser) {
                    setIsOpenModal(true);
                  }
                }}
                onDoubleClick={() => {
                  if (currentUser) {
                    dispatch(logout());
                    setIsOpenModal(true);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <p className={`header__nav-right `}>
                  {currentUser ? "????ng xu???t" : "????ng nh???p"}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};
