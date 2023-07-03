import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const DeleteMoviePopup = ({
  title,
  buttonText,
  onSubmit,
  isOpenPopup,
  onClose,
  onCloseOverlay,
  isSubmitLoading,
}) => {
  return (
    <PopupWithForm
      title={title}
      buttonText={buttonText}
      onSubmit={onSubmit}
      isOpenPopup={isOpenPopup}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      isSubmitLoading={isSubmitLoading}
    />
  );
};

export default DeleteMoviePopup;
