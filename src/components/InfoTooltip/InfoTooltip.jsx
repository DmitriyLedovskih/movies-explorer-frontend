import React from "react";
import "./InfoTooltip.css";
import successIcon from "../../images/check-icon.svg";
import errorIcon from "../../images/close-icon.svg";

const InfoTooltip = ({
  isOpenInfoTooltip,
  isSuccess,
  successText,
  errorText,
}) => {
  return (
    <div
      className={`info-tooltip ${
        isOpenInfoTooltip ? "info-tooltip_opened" : ""
      } ${isSuccess ? "info-tooltip_type_success" : "info-tooltip_type_error"}`}
    >
      <img
        src={isSuccess ? successIcon : errorIcon}
        alt={isSuccess ? "Иконка галочки" : "Иконка крестика"}
        className="info-tooltip__icon"
      />
      <h2 className="info-tooltip__title">
        {isSuccess ? successText : errorText}
      </h2>
    </div>
  );
};

export default InfoTooltip;
