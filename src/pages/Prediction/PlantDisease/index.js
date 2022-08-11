import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Components
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import LoadingSpinner from "../../../components/LoadingSpinner";

// Assets
import BgFooter from "../../../assets/images/bg-guesspage-2.png";
import axios from "axios";
// Css
import "./index.css";

const displayListOfRecomendedDisease = (data) => {
  if (!data.length) return "";

  return data.map((text, index) => <p key={index}>{text}</p>);
};

export const PlantDisease = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const [formData, setFormData] = React.useState({
    img_upload: null,
    img_upload_show: null,
  });

  const fileNameRef = React.useRef(null);
  const [predictionData, setPredictionData] = useState({});
  const [name, setName] = useState({
    img_path: "",
  });

  const handleOnChangeFile = (e) => {
    setPredictionData({});
    const { files } = e.target;
    let reader = new FileReader();

    if (files && files[0]) {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setFormData({ ...formData, img_upload: reader.result });
      };
    }

    fileNameRef.current.innerHTML = files[0]?.name || "Chọn ảnh";
    setName(files[0].name);
  };

  const handleUploadFile = async () => {
    setFormData({ ...formData, img_upload_show: formData.img_upload });
    // setPredictionData({})
    var request = new FormData();
    for (let key in name) {
      request.append(key, name[key]);
    }
    setIsLoading(true);
    await axios({
      url: "http://localhost:5000/predict_image",
      method: "POST",
      data: request,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        const responseData = res.data;
        setPredictionData(responseData);
        setIsLoading(false);
        console.log(responseData);
      })
      .catch((err) => {
        setErrorMessage("Error occurred when predicting image");
        setPredictionData({});
        setIsLoading(false);
        console.log(err);
      });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    displayListOfRecomendedDisease(predictionData);
    return () => {
      setPredictionData({});
    };
  }, []);

  return (
    <div>
      <Header isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />

      <div>
        <section className="banner-guess-page">
          <div className="container">
            <div
              className="banner__box"
              style={{ maxWidth: "420px", top: "20%" }}
            >
              <h1 className="banner__box__title_ps ">CHẨN ĐOÁN BỆNH CHO CÂY</h1>
              <p className="banner__box__content_ps">
                Chọn ảnh để hệ thống chẩn đoán bệnh cho cây
              </p>

              <div className="guess__wrap-file">
                <input
                  type="file"
                  name="img_upload"
                  id="img_upload"
                  accept="image/*"
                  hidden
                  onChange={handleOnChangeFile}
                />
                <div className="guess__file-display">
                  <label
                    htmlFor="img_upload"
                    title="Chọn ảnh"
                    ref={fileNameRef}
                  >
                    Chọn tệp ảnh
                  </label>
                  <div
                    className="guess__file__btn-upload"
                    onClick={handleUploadFile}
                    disabled={isLoading}
                  >
                    CHẨN ĐOÁN
                  </div>
                </div>
              </div>
              {errorMessage && <div className="error">{errorMessage}</div>}
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                formData.img_upload_show && (
                  <>
                    <div className="wrap-show-img">
                      <img
                        src={formData.img_upload_show}
                        alt=""
                        style={{
                          borderRadius: "14px",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <p className="percent-disease-text">
                      {predictionData["name"]}
                    </p>

                    {predictionData["symptom"] !== "" ? (
                      <div className="contain__Predict">
                        <div className="predict__contain">
                          <div className="contain__box__top">
                            <div className="predict__box__picture">
                              <p className="predict__box__title">
                                CÁC TRIỆU CHỨNG KHI CÂY NHIỄM BỆNH
                              </p>
                            </div>
                          </div>

                          <div className="predict__box__down">
                            <ul className="contain__box__down__title">
                              <li className="contain__box__down__method enable__scroll">
                                <p className="contain__name">
                                  {predictionData["symptom"]}
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="predict__contain">
                          <div className="contain__box__top">
                            <div className="predict__box__picture">
                              <p className="predict__box__title">
                                PHƯƠNG THỨC ĐIỀU TRỊ
                              </p>
                            </div>
                          </div>
                          <div className="predict__box__down">
                            <ul className="contain__box__down__title">
                              <li className="contain__box__down__method enable__scroll">
                                <p>{predictionData["treatment"]}</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="predict__contain">
                          <div className="contain__box__top">
                            <div className="predict__box__picture">
                              <p className="predict__box__title">
                                CÁCH ĐIỀU TRỊ CÁC BỆNH TƯƠNG TỰ
                              </p>
                            </div>
                          </div>
                          <div className="predict__box__down">
                            <ul className="contain__box__down__title">
                              <li className="contain__box__down__method enable__scroll">
                                {predictionData !== {} &&
                                predictionData["rc"] !== ""
                                  ? displayListOfRecomendedDisease(
                                      predictionData["rc"]
                                    )
                                  : ""}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <Link className="reload-btn" to="/du-doan">
                      CHẨN ĐOÁN KHÁC
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer className="footer" bgImage={BgFooter} />
    </div>
  );
};
