import { Header } from "../../components/Header";
import React, { useEffect, useState } from "react";
import "./index.css";
import "dotenv/config";
import axios from "axios";
import { useSelector } from "react-redux";
import styled from "styled-components";
const moment = require("moment");

const DisplayInfo = styled.p`
  font-size: 20px;
  margin-left: 30px;
  font-style: italic;
  font-weight: 200;
`;

const DisplayInfoName = styled.p`
  font-size: 20px;
  display: block;
  margin-top: -25px;
  margin-left: 415px;
  font-style: italic;
  font-weight: 200;
`;

export const Profile = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState(Date);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [firstNameDB, setFirstNameDB] = useState("");
  const [lastNameDB, setLastNameDB] = useState("");
  const [birthdayDB, setBirthdayDB] = useState(Date);
  const [phoneNumberDB, setPhoneNumberDB] = useState("");
  const [emailDB, setEmailDB] = useState("");
  const [genderDB, setGenderDB] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    // SEND data to DB
    e.preventDefault();
    console.log(firstName);
    console.log(lastName);
    console.log(birthday);
    console.log(phoneNumber);
    console.log(gender);

    axios({
      method: "POST",
      url: `${
        process.env.BACKEND_API_URL ||
        "https://desolate-everglades-44147.herokuapp.com"
      }/api/users/edit-profile/${currentUser._id}`,
      data: { firstName, lastName, birthday, phoneNumber, gender },
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("edit user info succeed");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserInfo = () => {
    axios
      .get(
        `${
          process.env.BACKEND_API_URL ||
          "https://desolate-everglades-44147.herokuapp.com"
        }/api/users/info/${currentUser._id}`
      )
      .then((res) => {
        const data = res.data;
        setFirstNameDB(data.firstName);
        setLastNameDB(data.lastName);
        setBirthdayDB(data.birthday);
        setPhoneNumberDB(data.phoneNumber);
        setGenderDB(data.gender);
        console.log("user info has been received");
        console.log(data);
      })
      .catch((err) => {
        alert("Error while get user info");
        console.log(err);
      });
  };

  useEffect(() => {
    getUserInfo();
    // dispatch(loginSuccess(state => state.user))
  }, []);

  const formatDate = (inputDate) => {
    return moment(inputDate).format("DD/MM/YYYY");
  };

  return (
    <div>
      <Header isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      <div>
        <div className="banner-profile">
          <div className="profile-menu">
            <div className="profile">
              <div className="profile__user profile__user-left">
                <div className="profile__image-user"></div>

                {firstNameDB === "" ? (
                  <p className="profile__user-name">...</p>
                ) : (
                  <p className="profile__user-name">
                    {firstNameDB + " " + lastNameDB}
                  </p>
                )}
              </div>

              <div className="profile__user profile__user-right">
                <div className="profile-choose">
                  <div className="profile-fullName">
                    <p className="profile-font">Họ</p>
                    <p className="profile-ten profile-font">Tên</p>
                  </div>
                  <div className="profile-name">
                    {firstNameDB === "" ? (
                      <input
                        type="text"
                        className="profile__user-firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    ) : (
                      <DisplayInfo>{firstNameDB}</DisplayInfo>
                    )}
                    {lastNameDB === "" ? (
                      <input
                        type="text"
                        className="profile__user-lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    ) : (
                      <DisplayInfoName>{lastNameDB}</DisplayInfoName>
                    )}
                  </div>
                </div>
                <p className="profile-font">Ngày Sinh</p>
                {birthdayDB === null ? (
                  <input
                    className="profile__user-date profile-use"
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                ) : (
                  <DisplayInfo>{formatDate(birthdayDB)}</DisplayInfo>
                )}
                <p className="profile-font">Số điện thoại</p>
                {phoneNumberDB === "" ? (
                  <input
                    type="text"
                    className="profile__user-phone profile-use"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                ) : (
                  <DisplayInfo>{phoneNumberDB}</DisplayInfo>
                )}
                <p className="profile-font">Email</p>
                {currentUser.email === "" ? (
                  <input
                    type="text"
                    className="profile__user-mail profile-use"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <DisplayInfo>{currentUser.email}</DisplayInfo>
                )}
                <p className="profile-font">Giới tính</p>
                {genderDB === "" ? (
                  <input
                    type="text"
                    className="profile__user-sex profile-use"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                ) : (
                  <DisplayInfo>{genderDB}</DisplayInfo>
                )}
                <span className="profile-save" onClick={handleSubmit}>
                  LƯU
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-profile"></div>
      </div>
    </div>
  );
};
