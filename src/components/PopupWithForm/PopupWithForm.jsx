import React from "react";
import "./PopupWithForm.css";

const PopupWithForm = ({
  children,
  title,
  buttonText,
  onSubmit,
  isOpenPopup,
  onClose,
  onCloseOverlay,
  isSubmitLoading,
}) => {
  return (
    <div
      className={`popup ${isOpenPopup ? "popup_opened" : ""}`}
      onClick={onCloseOverlay}
    >
      <div className="popup__container">
        <h2 className="popup__container-title">{title}</h2>
        <button
          className="popup__container-close main-button"
          onClick={onClose}
        ></button>
        <form className="popup__container-form" onSubmit={onSubmit}>
          {children && children}
          <button
            className={`main-button ${
              isSubmitLoading ? "main-button_disabled" : ""
            } main-button_type_success popup__container-button`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
