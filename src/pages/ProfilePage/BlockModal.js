import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import "./BlockModal.css";
function BlockModal({ closeModal }) {
  return (
    <div className="background">
      <div className="modal-container">
        <div className="top-modal">
          <div className="modal-title">Bạn có chắc muốn chặn người dùng này? </div>
          <div
            onClick={() => {
              closeModal();
            }}
          >
            <FaRegTimesCircle className="exit-btn" />
          </div>
        </div>
        <div className="body-modal"></div>
        <div className="bottom-modal">
          <button
            className="block-btn"
            onClick={() => {
              closeModal();
            }}
          >
            Chặn 
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlockModal;
