import React from "react";
import "./InfoTooltip.css";
import successIcon from "../../images/check-icon.svg";
import errorIcon from "../../images/close-icon.svg";

const InfoTooltip = () => {
  return (
    <div className="info-tooltip">
      <div className="info-tooltip__container">
        <button
          className="info-tooltip__close-button main-button"
          type="button"
        ></button>
        <img
          src={errorIcon}
          alt="Иконка крестика"
          className="info-tooltip__icon info-tooltip__icon_type_error"
        />
        <h2 className="info-tooltip__title info-tooltip__title_type_error">
          Что-то пошло не так! Попробуйте ещё раз.
        </h2>
      </div>
    </div>
  );
};

export default InfoTooltip;
