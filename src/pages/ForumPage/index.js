// Components
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
// Components
import { Header } from "../../components/Header";

// Css
import "../ForumPage/index.css";
import PostModal from "./PostModal";
import Post from "./Post";
import { createPost as createPostApi } from "../../api/postAPI";

// *Export
export const Forum = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isScroll, setIsScroll] = React.useState(false);

  const [openPost, setOpenPost] = useState(false);

  const [backendPosts, setBackendPosts] = useState([]);

  const { currentUser } = useSelector(state => state.user);

  const [posts, setPosts] = useState([])

  const Message = styled.div`
  margin-top: -20vh;
  font-size: 40px;
  font-align: center;
  font-weight: 500
  `
  const PageMessage = styled.div`
  background-color: var(--primary-color);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `

  const fetchPosts = () => {
    setPosts(backendPosts.filter(
      (backendPost) => backendPost.parentId === null
    ));
  }

  const addPost = (text) => {
    createPostApi(text).then((post) => {
      setBackendPosts([post, ...backendPosts]);
    });
  };

  // Copy from header
  function handleOnScroll() {
    if (this.scrollY > 120) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  }

  React.useEffect(() => { if (currentUser) { fetchPosts() } else { setIsOpenModal(true) } }, [currentUser, fetchPosts])

  React.useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);
    return () => window.removeEventListener("scroll", handleOnScroll);
  }, []);

  return (
    <div>
      <Header isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />

      {openPost && <PostModal closeModal={setOpenPost} />}

      {currentUser ? <div className="forum-page-container">
        <div className={`left-menu ${isScroll ? "active" : ""} `}>
          <p className="heading">Danh mục</p>
          <div
            className="other-pages"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Link to="" className="list-item hot-thread">
              Bài viết nóng 🔥🔥🔥
            </Link>
            <Link to="/saved" className="list-item saved-thread">
              Bài viết đã lưu ✅
            </Link>
          </div>
        </div>

        <div className="newsfeed">
          <div
            className="post-container"
            onClick={() => {
              setOpenPost(true);
            }}
          >
            <p className="text">Hôm nay bạn có tin gì?</p>
            <div className="choose-btn">
              <p>+</p>
            </div>
          </div>
          <Post />
          <div>
            {posts.map((post) => (
              <Post
                post={post}
                addComment={addPost}
              // deleteComment={deletePost}
              // updateComment={updatePost}
              />
            ))}
          </div>
        </div>

        <div className={`right-menu ${isScroll ? "active" : ""} `}>
          <img
            src="https://www.thesprucepets.com/thmb/sfuyyLvyUx636_Oq3Fw5_mt-PIc=/3760x2820/smart/filters:no_upscale()/adorable-white-pomeranian-puppy-spitz-921029690-5c8be25d46e0fb000172effe.jpg"
            alt="your avatar"
            className="your-avatar"
          />
          <Link to="/profilepage" className="your-name">
            {currentUser ? currentUser.name : ""}
          </Link>
          <p className="your-level">{currentUser ? currentUser.email : ""}</p>
        </div>
      </div> : <PageMessage>
        <Message>
          Bạn cần đăng nhập để sử dụng tính năng này
        </Message>
      </PageMessage>}
    </div>
  );
};
