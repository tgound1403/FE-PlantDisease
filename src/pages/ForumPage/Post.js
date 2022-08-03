import React, { useState, useLayoutEffect } from "react";
import CommentModal from "../../comments/CommentModal";
import LoadingSpinner from "../../components/LoadingSpinner";
import { BiUpvote, BiDownvote, BiComment, BiShareAlt } from "react-icons/bi";
import { format } from "timeago.js";
require("dotenv").config();
const axios = require("axios");
const Post = () => {
  const [openComment, setOpenComment] = useState(false);

  // const [like, setLike] = useState(post.likes.length);
  const [upvote, setUpVote] = useState(false);
  const [isUpVote, setIsUpVote] = useState(false);
  const [downvote, setDownVote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);
  const [posts, setPosts] = useState([]);
  // const [postImage, setPostImage] = useState('')

  const [isLoading, setIsLoading] = useState();

  // const [user, setUser] = useState({});
  // const { user: currentUser } = useContext(AuthContext);

  // useEffect(() => {
  // }, [currentUser._id, post.likes]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axios.get(`/users?userId=${post.userId}`);
  //     setUser(res.data);
  //   };
  //   fetchUser();
  // }, [post.userId]);

  // learn API with Easy Frontend
  // const [postList, setPostList] = useState([]);
  // useEffect(() => {
  //   const fetchPostList = async () => {
  //     try {
  // const params = { _page: 1, _limit: 10 };
  //       const response = await postList.getAll();
  //       setPostList(response.data);
  //     } catch (err) {
  //     console.log(err)
  //     }
  //   }
  //   fetchPostList();
  // }, []);

  const upvoteHandler = () => {
    try {
      // axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setUpVote(isUpVote ? upvote - 1 : upvote + 1);
    setIsUpVote(!isUpVote);
  };

  const downvoteHandler = () => {
    try {
      // axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setDownVote(isDownVote ? downvote - 1 : downvote + 1);
    setIsDownVote(!isDownVote);
  };

  const getPosts = () => {
    setIsLoading(true);
    axios
      .get(
        `${
          process.env.BACKEND_API_URL ||
          "https://desolate-everglades-44147.herokuapp.com"
        }/api/posts`
      )
      .then((res) => {
        const data = res.data;
        let reverseData = data.reverse();
        setPosts(reverseData);
        setIsLoading(false);
        console.log("Posts has been received");
      })
      .catch((err) => {
        alert("Error while get Post");
        setIsLoading(false);
        console.log(err);
      });
  };

  const displayPosts = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <PostItem
        key={index}
        creatorAvatar={post.creatorAvatar}
        creator={post.creator}
        createTime={post.createTime}
        status={post.status}
        image={post.imageSrc}
      />
    ));
  };

  let configImageData = (imgBase64) => {
    var base64Flag = "data:image/jpeg;base64,";
    let image = base64Flag + imgBase64;
    return image;
  };

  useLayoutEffect(() => {
    getPosts();
    // displayPosts(posts)
  }, []);

  const PostItem = (post) => (
    <div className="thread" key={post.id}>
      <div className="user-overview">
        <div className="left-section">
          <img src={post.creatorAvatar} alt="user-avatar" className="avatar" />
          <div className="info">
            <p className="user-name clickable">{post.creator}</p>
            <p className="time">{format(post.createTime)}</p>
          </div>
        </div>
        {/* <div className="badge">Vip</div> */}
      </div>
      <p className="status">{post.status}</p>
      <img
        // src={image}
        // src={post.image}
        src={configImageData(post.image)}
        alt="post img fetch from db"
        className="post-img"
      />
      <div className="interaction-bar">
        <div className="react-btn" onClick={upvoteHandler}>
          <BiUpvote className="clickable" />
          <div className="counter">{upvote}</div>
        </div>
        <div className="react-btn" onClick={downvoteHandler}>
          <BiDownvote className=" clickable" />
          <div className="counter">{downvote}</div>
        </div>
        <BiComment
          className="comment clickable"
          onClick={() => {
            setOpenComment(true);
          }}
          onDoubleClick={() => {
            setOpenComment(false);
          }}
        />

        <BiShareAlt className="share-btn clickable" />
      </div>
      {openComment && <CommentModal closeModal={setOpenComment} />}
    </div>
  );

  return (
    <div id="wrapper">
      {isLoading ? <LoadingSpinner /> : displayPosts(posts)}
    </div>
  );
};
export default Post;
