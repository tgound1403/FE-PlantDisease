// Components
import React from "react";
import { useSelector } from "react-redux";
// Components
import { Header } from "../../components/Header";
import { Link } from "react-router-dom";
// Css
import "./index.css";

import styled from "styled-components";

const WelcomeMessage = styled.div`
  font-size: 2.5rem;
  margin-bottom: 5rem;
  font-style: italic;
  margin-left: 10vw;
  background-color: #f5f5f5;
  opacity: 0.7;
  padding: 10px;
  border-radius: 10px;
  width: 55%;
`;
export const WelcomePage = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const { currentUser } = useSelector((state) => state.user);
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
              {currentUser ? (
                <WelcomeMessage>
                  Chào mừng trở lại, {currentUser.name}
                </WelcomeMessage>
              ) : (
                ""
              )}
              <p className="banner__box__content">
                Phân tích nhanh bệnh lý của cây trồng, tìm ra giải pháp điều trị
                phù hợp để tăng năng suất cho cây
              </p>
              {currentUser ? (
                ""
              ) : (
                <div className="banner__box__btn">
                  <span className="banner__btn" onClick={handleOpenModal}>
                    BẮT ĐẦU
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section-intro">
          <div className="intro__title">
            <h2>
              "Nếu ai cũng có thể trồng một cái cây trong cuộc đời thì nỗi cô
              đơn chỉ còn là đứa trẻ của niềm vui"
            </h2>
            <p>-Trồng một cái cây trong cuộc đời-</p>
          </div>

          <div className="wrap-box-intro">
            <div className="intro__box">
              <Link to="/du-doan-hinh-anh">
                <h4 className="intro__box-title">Dự đoán</h4>
              </Link>
              <p className="intro__box-content">
                Sử dụng trí tuệ nhân tạo để dự đoán bệnh cho cây thông qua hình
                ảnh bạn chụp
              </p>
            </div>
            <div className="intro__box">
              <Link to="/forum ">
                <h4 className="intro__box-title">Diễn đàn</h4>
              </Link>
              <p className="intro__box-content">
                Nơi bạn có thể giao lưu hỏi đáp với những người khác có chung
                tình yêu với sức khỏe cây trồng
              </p>
            </div>
            <div className="intro__box">
              <h4 className="intro__box-title">Đề xuất</h4>
              <p className="intro__box-content">
                Sử dụng trí tuệ nhân tạo để đề xuất cây trồng hoặc phân bón phù
                hợp cho đất trồng của bạn
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
