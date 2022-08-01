import React from "react";
import { IoIosArrowDown } from "react-icons/io";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

import "./index.css";
import { getSavedPosts } from "../../api/savedAPI";

export const SavedPage = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const SavedPost = savedPost => (
    <div className="thread">
      <div className="user-overview">
        <div className="left-section">
          <img
            src={savedPost.creatorAvatar}
            alt="user-avatar"
            className="avatar"
          />
          <div className="info">
            <p className="user-name">{savedPost.creator}</p>
            <p className="time">{savedPost.createTime}</p>
          </div>
        </div>
      </div>
      <p className="status">{savedPost.status}</p>
      <img
        src={savedPost.image}
        alt=""
        className="post-img"
      />
    </div>
  )
  return (
    <div>
      <Header isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      <div className="saved-page-container">
        <div className="title">Bài viết đã lưu</div>
        <div className="sorter">
          <p className="menu-text" id="nav">
            Sắp xếp với
          </p>
          <li className="sort-menu">
            <p>
              <IoIosArrowDown className="nav-down-icon">v</IoIosArrowDown>
            </p>
            <ul className="subnav">
              <li>
                <p>Ngày đăng</p>
              </li>
              <li>
                <p>Lượng yêu thích</p>
              </li>
              <li>
                <p>Tùy chỉnh</p>
              </li>
            </ul>
          </li>
        </div>
        {/* //*Code drop down */}
        <div className="list-thread">
          {getSavedPosts.map(savedPost => (
            <SavedPost
              creatorAvatar={savedPost.creatorAvatar}
              creator={savedPost.creator}
              createTime={savedPost.createTime}
              status={savedPost.status}
              image={savedPost.image}
            />)
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
