import React from "react";
import "./MoviesCard.css";
import closeIcon from "../../images/close-icon.svg";
import checkIcon from "../../images/check-icon.svg";
import { BASE_URL } from "../../utils/MoviesApi";
import { useLocation } from "react-router-dom";

const MoviesCard = ({ movie, savedMovie, onSaveMovie, openDeletePopup }) => {
  const { pathname } = useLocation();

  const isSaved = savedMovie.some((mov) => mov.movieId === movie.id);
  const isDelete = savedMovie.find((mov) => mov.movieId === movie.id);
  console.log(savedMovie, isSaved);
  // console.log(movie);

  return (
    <article className="movies-card">
      <a href={movie.trailerLink} className="movies-card__link">
        <div className="movies-card__header">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <p className="movies-card__time">{movie.duration} минут</p>
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
            } main-button_type_dark main-button`}
            type="button"
            onClick={() =>
              !isSaved ? onSaveMovie(movie) : openDeletePopup(isDelete)
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
            onClick={() => openDeletePopup(movie)}
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
