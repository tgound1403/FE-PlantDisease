import React from 'react';
import './index.css';

export const Modal = ({ isOpen, children, stateOpenModal }) => {
  return (
    <React.Fragment>
      {isOpen && (
        <div className='modal'>
          <div
            className='modal__overlay'
            onClick={() => stateOpenModal(false)}
          />
          <div className='modal__body'>{children}</div>
        </div>
      )}
    </React.Fragment>
  );
};
