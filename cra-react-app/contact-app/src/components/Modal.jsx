import React from 'react';

function Modal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal">
      <p>{message}</p>
      <button onClick={onConfirm}>تایید</button>
      <button onClick={onCancel}>لغو</button>
    </div>
  );
}

export default Modal;