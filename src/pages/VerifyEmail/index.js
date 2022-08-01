// Components
import React from "react";

// Components
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import "./index.css";

export const VerifyEmail = () => {
  const [isOpenModal, setIsOpenModal] = React.useState('');  
  
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <div>
      <Header isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />

      <div className="page-container">
        <p className="page-heading">Your email has been verified successful</p>

        <button className="btn__login" onClick={handleOpenModal}>Back to login</button>
      </div>
      <Footer></Footer>
    </div>
  );
};
