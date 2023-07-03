import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

const MoviesCardList = ({
  movies,
  savedMovie,
  onSaveMovie,
  isLoading,
  openDeletePopup,
  renderMovie,
  onclickLoadMore,
  isSubmitLoading,
}) => {
  return (
    <section className="movies-cards" aria-label="Список с фильмами">
      {isLoading ? (
        <Preloader />
      ) : movies ? (
        movies.length > 0 ? (
          <>
            <div className="movies-cards__list">
              {movies.slice(0, renderMovie).map((movie) => (
                <MoviesCard
                  movie={movie}
                  key={movie.id}
                  onSaveMovie={onSaveMovie}
                  openDeletePopup={openDeletePopup}
                  isSubmitLoading={isSubmitLoading}
                />
              ))}
            </div>
            {movies.length > renderMovie && (
              <button
                className="movies-cards__button main-button_type_dark-secondary main-button"
                type="button"
                onClick={onclickLoadMore}
              >
                Ещё
              </button>
            )}
          </>
        ) : (
          <p className="movies-cards__not-found">Ничего не найдено :(</p>
        )
      ) : savedMovie && savedMovie.length > 0 ? (
        <div className="movies-cards__list">
          {savedMovie.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.movieId}
              onSaveMovie={onSaveMovie}
              openDeletePopup={openDeletePopup}
              isSubmitLoading={isSubmitLoading}
            />
          ))}
        </div>
      ) : (
        <p className="movies-cards__not-found">Ничего не найдено :(</p>
      )}
    </section>
  );
};

export default MoviesCardList;
