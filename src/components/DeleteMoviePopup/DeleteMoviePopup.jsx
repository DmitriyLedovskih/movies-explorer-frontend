import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const DeleteMoviePopup = ({
  title,
  buttonText,
  onSubmit,
  isOpenPopup,
  onClose,
  onCloseOverlay,
}) => {
  return (
    <PopupWithForm
      title={title}
      buttonText={buttonText}
      onSubmit={onSubmit}
      isOpenPopup={isOpenPopup}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
    />
  );
};

export default DeleteMoviePopup;
