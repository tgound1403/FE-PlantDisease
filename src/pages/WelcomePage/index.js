// Components
import React from "react";

// Components
import { Header } from "../../components/Header";

// Css
import "./index.css";

export const HomePage = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <div>
      <Header isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />

      <div>
        <section className="section-banner">
          <div className="container">
            <div className="banner__box">
              <h1 className="banner__box__title">
                SINH TRẮC BỆNH LÝ CÂY TRỒNG
              </h1>
              <p className="banner__box__content">
                Phân tích nhanh bệnh lý của cây trồng, tìm ra giải pháp điều trị
                phù hợp để tăng năng suất cho cây.
              </p>
              <div className="banner__box__btn">
                <span className="banner__btn" onClick={handleOpenModal}>
                  BẮT ĐẦU
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
