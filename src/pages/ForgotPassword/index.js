// Components
import React, { useState } from "react";

// Components
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import "../ForgotPassword/index.css";
const axios = require('axios');

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isOpenModal, setIsOpenModal] = React.useState(false);



  const emailReset = async (e) => {
    e.preventDefault();
    console.log("Getting information from input");
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/forgot-password",
        {
          email,
        },
        config,
      );
      console.log(data)
      alert('Liên kết đặt lại mật khẩu đã được gửi đến email của bạn')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Header isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      <div className="page-container">
      <p className="page-heading">Forgot Password? Enter your email to start reset</p>
        <form className='forgot-form-container' onSubmit={emailReset}>
          <label className='form-label'>
            Email
          </label>
          <input
            required
            type="email"
            placeholder="Enter your email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button
            className="btn-send-email"
            variant="primary"
            type="submit"
          >
            Send email
          </button>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};
