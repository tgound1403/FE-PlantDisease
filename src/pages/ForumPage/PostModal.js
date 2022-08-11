import React, { useEffect, useRef, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./PostModal.css";
const axios = require("axios");
const Compress = require("compress.js").default;

function PostModal({ closeModal, initialText = "hi" }) {
  // Set up storing image
  // Open Explorer
  const inputFile = useRef(null);
  const [imageToPreview, setImageToPreview] = useState();
  const { currentUser } = useSelector((state) => state.user);

  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    setImageToPreview(file);
    file.preview = URL.createObjectURL(file);
  };
  async function resizeImageFn(file) {
    const compress = new Compress();

    const resizedImage = await compress.compress([file], {
      size: 2, // the max size in MB, defaults to 2MB
      quality: 1, // the quality of the image, max is 1,
      maxWidth: 300, // the max width of the output image, defaults to 1920px
      maxHeight: 300, // the max height of the output image, defaults to 1920px
      resize: true, // defaults to true, set false if you do not want to resize the image width and height
    });
    const img = resizedImage[0];
    const base64str = img.data;
    const imgExt = img.ext;
    const resizedFile = Compress.convertBase64ToFile(base64str, imgExt);
    return resizedFile;
  }

  let onFileChange = async (e) => {
    const imageFile = e.target.files[0];
    setImageToPreview(imageFile);
    const resizedImage = await resizeImageFn(imageFile);
    setImageToUpload(imageFile);
    setImageToUpload(resizedImage);
  };

  useEffect(() => {
    return () => {
      imageToPreview && URL.revokeObjectURL(imageToPreview.preview);
    };
  }, [imageToPreview]);

  const [imageToUpload, setImageToUpload] = useState();

  const [postData, setPostData] = useState({
    userId: currentUser._id,
    creatorAvatar: "https://wallpaper.dog/large/5439024.jpg",
    creator: currentUser.name,
    createTime: Date.now(),
    status: "",
    image: "",
  });

  const handleChange = (e) => {
    let newData = { ...postData };
    newData[e.target.id] = e.target.value;
    setPostData(newData);
  };

  const submit = () => {
    console.log(postData);
    const request = new FormData();

    for (let key in postData) {
      request.append(key, postData[key]);
    }
    request.append("image", imageToUpload);
    axios({
      method: "POST",
      url: `${
        process.env.BACKEND_API_URL || "http://localhost:4000"
      }/api/post-with-img`,
      data: request,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log("post succeed");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [text, setText] = useState(initialText);
  const isTextareaDisable = postData.status.length === 0;

  return (
    <div className="background">
      <div className="forum-modal-container ">
        <div className="top-modal">
          <div className="modal-title"> Tạo bài viết </div>
          <div
            onClick={() => {
              closeModal();
            }}
          >
            <FaRegTimesCircle className="exit-btn" />
          </div>
        </div>
        <div className="body-modal">
          <textarea
            id="status"
            type="text"
            value={postData.status}
            onChange={(e) => {
              handleChange(e);
              setText(e.target.value);
            }}
            className="body-box"
          />
          {imageToUpload && (
            <img
              src={imageToPreview.preview}
              alt="preview for upload"
              className="img-input"
            />
          )}
        </div>
        <div className="bottom-modal">
          <div className="function-modal">
            <p className="hint"> Thêm vào bài viết của bạn </p>
            <div
              className="add-img-btn"
              id="image"
              // onClick={onButtonClick}
              onChange={handlePreviewImage}
            >
              {/* <FaRegFileImage
                alt="add image"
                className="add-img"
                onClick={onButtonClick}
              > */}
              <input
                type="file"
                id="image"
                // className="form-control-file"
                ref={inputFile}
                onChange={(e) => {
                  onFileChange(e);
                  handleChange(e);
                }}
                // style={{
                //   display: "none",
                // }}
              />
              {/* </FaRegFileImage> */}
            </div>
          </div>
          <button
            className="post-btn"
            disabled={isTextareaDisable}
            onClick={() => {
              // onSubmit();
              submit();
              closeModal();
            }}
            // handleSubmit={onSubmit}
          >
            Đăng bài
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
