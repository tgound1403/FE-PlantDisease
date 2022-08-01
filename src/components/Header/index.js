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
        "/api/users/login",
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
      console.log(error);
      setError("Email hoặc mật khẩu không đúng, vui lòng thử lại");
      dispatch(loginFailure());
      console.log("User not found, please check again or register");
    }
  };

  // *Code for REGISTER
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function CheckPassword(inputPassword) {
    if (inputPassword.length < 8) {
      setError("Mật khẩu của bạn phải có độ dài từ 8 ký tự trở lên");
      console.log("Your password must be at least 8 characters");
      return false;
    }
    if (inputPassword.search(/[a-z]/i) < 0) {
      setError("Mật khẩu của bạn phải có ít nhất một chữ cái");
      console.log("Your password must contain at least one letter.");
      return false;
    }
    if (inputPassword.search(/[0-9]/) < 0) {
      setError("Mật khẩu của bạn phải có ít nhất một con số");
      console.log("Your password must contain at least one digit.");
      return false;
    }
    if (inputPassword.search(/[!@#$%^&*]/) > 0) {
      setError("Mật khẩu của bạn không được chứa kí tự đặc biệt");
      console.log("Your password mustn't contain special character");
      return false;
    } else return true;
  }

  const registerHandler = async (e) => {
    e.preventDefault();

    if (CheckPassword(password)) {
      if (password !== confirmPassword) {
        setError("Mật khẩu không khớp, vui lòng thử lại");
        console.log("Register failed because password not match");
      } else {
        setError(null);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const { data } = await axios.post(
            "/api/users",
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
            "Một email đã được gửi đến hộp thư của bạn, vui lòng kiểm tra và kích hoạt tài khoản"
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
              Đăng nhập
            </div>
            <div
              className={`tab-item ${tabActive === 1 ? "active" : ""}`}
              onClick={(e) => handleActiveTab(e, 1)}
            >
              Đăng ký
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
                      placeholder="Nhập email của bạn"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      Mật khẩu
                    </label>
                    <div>
                      <input
                        required
                        type="password"
                        className="form-control password"
                        placeholder="Nhập mật khẩu của bạn"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                  </div>
                  <Link to="/forgot-password">
                    <div className="forget-password">Quên mật khẩu?</div>
                  </Link>
                  <div className="wrap-btn-login">
                    {error !== "" ? <div className="error">{error}</div> : ""}

                    <button
                      className="btn-login"
                      varian="primary"
                      type="submit"
                    >
                      Đăng nhập
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
                      Tên người dùng
                    </label>
                    <input
                      required
                      type="text"
                      id="username"
                      placeholder="Nhập tên tài khoản của bạn"
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
                      placeholder="Nhập email của bạn"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="" className="form-label">
                      Mật khẩu
                    </label>
                    <div>
                      <input
                        required
                        type="password"
                        placeholder="Nhập mật khẩu của bạn"
                        className="form-control password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="" className="form-label">
                      Nhập lại mật khẩu
                    </label>
                    <input
                      required
                      type="password"
                      className="form-control password"
                      placeholder="Nhập lại mật khẩu của bạn"
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
                      Đăng ký
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
                className={`header__nav-item ${pathname === "/home" && !isOpenModal ? "active" : ""
                  }`}
              >
                <p className="header__nav-right">Trang chủ</p>
              </Link>
              <Link
                to="/du-doan"
                className={`header__nav-item ${pathname === "/du-doan" && !isOpenModal ? "active" : ""
                  }`}
              >
                <p className="header__nav-right header__nav-predict">Dự đoán</p>
              </Link>
              <Link
                to="/forum"
                className={`header__nav-item ${pathname === "/forum" && !isOpenModal ? "active" : ""
                  }`}
              >
                <p className="header__nav-right">Diễn đàn</p>
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
                  {currentUser ? "Đăng xuất" : "Đăng nhập"}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};
