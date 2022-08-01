// Components
import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
// Components
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

// Css
import "./index.css";
import BlockModal from "./BlockModal.js";
import { getPersonalPosts } from "../../api/personalPostAPI";


export const ProfilePage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);
  const history = useHistory();

  const PersonalPost = personalPost => (
    <div className="thread">
      <div className="user-overview">
        <div className="left-section">
          <img
            src="https://www.thesprucepets.com/thmb/sfuyyLvyUx636_Oq3Fw5_mt-PIc=/3760x2820/smart/filters:no_upscale()/adorable-white-pomeranian-puppy-spitz-921029690-5c8be25d46e0fb000172effe.jpg"
            alt="user-avatar"
            className="avatar"
          />
          <div className="info">
            <p className="user-name">Nguyen Trieu Duong</p>
            <p className="time">{personalPost.createTime}</p>
          </div>
        </div>
      </div>
      <p className="status">{personalPost.status}</p>
      <img
        src={personalPost.image}
        alt=""
        className="post-img"
      />
    </div>)

  const toProfileEdit = () => {
    history.push('/profile')
  }

  return (
    <div>
      <Header isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      {openBlock && <BlockModal closeModal={setOpenBlock} />}

      <div className="profile-page-container">
        <div className="user-info">
          <img
            className="profile-avatar"
            alt=""
            src="https://www.thesprucepets.com/thmb/sfuyyLvyUx636_Oq3Fw5_mt-PIc=/3760x2820/smart/filters:no_upscale()/adorable-white-pomeranian-puppy-spitz-921029690-5c8be25d46e0fb000172effe.jpg"
          ></img>
          <div className="profile-left-section">
            <div>
              <p className="profile-name" onClick={toProfileEdit}>Nguyen Trieu Duong</p>
              <div className="user-level">Vip</div>
            </div>
            <p className="number">6</p>
            <p className="text">Bài viết</p>
            <p className="number">14</p>
            <p className="text">Người theo dõi</p>
            <p className="number">3</p>
            <p className="text">Người đang theo dõi</p>
            <div className="interaction">
              <button className="follow btn">Theo dõi</button>
              <button
                className="block btn"
                onClick={() => {
                  setOpenBlock(true);
                }}
              >
                Chặn
              </button>
            </div>
          </div>
        </div>

        <div className="timeline">
          {getPersonalPosts.map(personalPost => (
            <PersonalPost
              status={personalPost.status}
              image={personalPost.image}
              createTime={personalPost.createTime}
            />
          ))}

        </div>
      </div>
      <Footer />
    </div>
  );
};
