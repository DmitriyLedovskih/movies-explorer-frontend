import React from "react";
import "./MoviesCard.css";
import cardImage from "../../images/card-image.jpg";
import closeIcon from "../../images/close-icon.svg";
import checkIcon from "../../images/check-icon.svg";

const MoviesCard = () => {
  return (
    <article className="movies-card">
      <div className="movies-card__header">
        <h2 className="movies-card__title">В погоне за Бенкси</h2>
        <p className="movies-card__time">27 минут</p>
      </div>
      <div className="movies-card__thumbnail">
        <img
          src={cardImage}
          alt="В погоне за Бенкси"
          className="movies-card__image"
        />
      </div>
      <div className="movies-card__footer">
        <button
          className="movies-card__button main-button_type_dark main-button"
          type="button"
        >
          Сохранить
          {/* <img
            src={closeIcon}
            alt="Иконка крестика"
            className="movies-card__button-icon"
          /> */}
          {/* <img
            src={checkIcon}
            alt="Иконка галочки"
            className="movies-card__button-icon"
          /> */}
        </button>
      </div>
    </article>
  );
};

export default MoviesCard;
