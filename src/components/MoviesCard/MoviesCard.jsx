import React from "react";
import "./MoviesCard.css";
import closeIcon from "../../images/close-icon.svg";
import checkIcon from "../../images/check-icon.svg";
import { BASE_URL } from "../../utils/MoviesApi";
import { useLocation } from "react-router-dom";

const MoviesCard = ({
  movie,
  onSaveMovie,
  openDeletePopup,
  isSubmitLoading,
}) => {
  const { pathname } = useLocation();

  const saveMovies = JSON.parse(localStorage.getItem("saveMovies"));

  const isSaved =
    saveMovies && saveMovies.some((mov) => mov.movieId === movie.id);
  const isDelete =
    saveMovies && saveMovies.find((mov) => mov.movieId === movie.id);

  const minutesToHours = () => {
    const minutes = movie.duration % 60;
    const hours = Math.floor(movie.duration / 60);
    return `${hours !== 0 ? `${hours} час${hours >= 2 ? "а" : ""}` : ""} ${
      minutes !== 0 ? `${minutes} минут` : ""
    }`;
  };

  return (
    <article className="movies-card">
      <a href={movie.trailerLink} className="movies-card__link">
        <div className="movies-card__header">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <p className="movies-card__time">{minutesToHours()}</p>
        </div>
        <div className="movies-card__thumbnail">
          <img
            src={
              pathname === "/movies"
                ? `${BASE_URL}/${movie.image.url}`
                : movie.image
            }
            alt={movie.nameRU}
            className="movies-card__image"
          />
        </div>
      </a>
      <div className="movies-card__footer">
        {pathname === "/movies" ? (
          <button
            className={`movies-card__button ${
              isSaved ? "movies-card__button_active" : ""
            } main-button_type_dark main-button ${
              isSubmitLoading ? "main-button_disabled" : ""
            }`}
            type="button"
            onClick={() =>
              !isSaved ? onSaveMovie(movie) : openDeletePopup(isDelete._id)
            }
          >
            <>
              {!isSaved ? (
                "Сохранить"
              ) : (
                <img
                  src={checkIcon}
                  alt="Иконка галочки"
                  className="movies-card__button-icon"
                />
              )}
            </>
          </button>
        ) : (
          <button
            className="movies-card__button main-button_type_dark main-button"
            type="button"
            onClick={() => openDeletePopup(movie._id)}
          >
            <img
              src={closeIcon}
              alt="Иконка крестика"
              className="movies-card__button-icon"
            />
          </button>
        )}
      </div>
    </article>
  );
};

export default MoviesCard;
