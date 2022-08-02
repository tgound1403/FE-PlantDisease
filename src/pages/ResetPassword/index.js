// Components
import React, { useState } from "react";

// Components
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import "./index.css";
import 'dotenv/config'
const axios = require('axios');

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const resetPassword = async (e) => {
    e.preventDefault();
    console.log("Getting information from input");
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log('resetting password')
      const { data } = await axios.post(
        `${process.env.BACKEND_API_URL}/api/users/send-reset/:token`,
        {
          password
        },
        config,
      );
      console.log(data)
      console.log('your password has been reset')
    } catch (error) {
      console.log(error);
      console.log("Cannot reset password ");
    }
  }

  return (
    <div>
      <Header isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />

      <div className="page-container">
        <p className="page-heading">Reset Password</p>
        <form className="form-container" onSubmit={resetPassword}>
          <label className='form-label'>
            Password
          </label>
          <input
            required
            type="password"
            placeholder="Enter your new password to reset"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label className='form-label'>
            Retype Password
          </label>
          <input
            required
            type="password"
            placeholder="Enter your new password again"
            className="form-control"
            onChange={(e) => setRetypePassword(e.target.value)}
            value={retypePassword}
          />

          <button
            className="btn-send"
            variant="primary"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};
