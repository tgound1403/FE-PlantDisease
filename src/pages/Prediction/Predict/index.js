import React from "react";
import { Header } from "../../../components/Header";
// import { Footer } from '../../../components/Footer';
import { makeStyles } from "@material-ui/core/styles";
import "./index.css";
import { Link } from "react-router-dom";

export const Predict = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const useStyle = makeStyles({
    ptop: {
      paddingTop: "50px",
      display: "flex",
      width: "100vw",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      //   height: "100vh",
    },
  });
  const classes = useStyle();

  return (
    <div>
      <Header isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      <div className="main">
        <div className="contain-container">
          <div className={classes.ptop}>
            <div className="contain">
              <div className="contain__box">
                <Link to="/du-doan-hinh-anh">
                  <div className="contain__box__top">
                    <div className="pic contain__box__picture">
                      <p className="contain__box__title">
                        CHẨN ĐOÁN BỆNH BẰNG HÌNH ẢNH
                      </p>
                    </div>
                  </div>
                  <div className="contain__box__down__button">
                    <div className="contain__button">Thực hiện</div>
                  </div>
                  <div className="filter"></div>
                </Link>
              </div>
            </div>

            <div className="contain">
              <div className="contain__box">
                <Link to="/du-doan-benh">
                  <div className="contain__box__top">
                    <div className="plant contain__box__picture">
                      <div className="contain__box__title">
                        <p>GỢI Ý</p>
                        <p>CÂY TRỒNG DỰA VÀO ĐẤT</p>
                      </div>
                    </div>
                  </div>
                  <div className="contain__box__down__button">
                    <div className="contain__button">Thực hiện</div>
                  </div>
                  <div className="filter"></div>
                </Link>
              </div>
            </div>

            <div className="contain">
              <div className="contain__box">
                <Link to="/du-doan-phan-bon">
                  <div className="contain__box__top">
                    <div className="fert contain__box__picture">
                      <div className="contain__box__title">
                        <p>GỢI Ý</p>
                        <p>PHÂN BÓN DỰA VÀO ĐẤT</p>
                      </div>
                    </div>
                  </div>
                  <div className="contain__box__down__button">
                    <div className="contain__button">Thực hiện</div>
                  </div>
                  <div className="filter"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};
