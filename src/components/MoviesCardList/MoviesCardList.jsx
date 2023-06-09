import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = () => {
  return (
    <section className="movies-cards">
      <div className="movies-cards__list">
        <MoviesCard />
      </div>
      {/* <p className="movies-cards__not-found">Фильм не найден :(</p> */}
      <button
        className="movies-cards__button main-button_type_dark-secondary main-button"
        type="button"
      >
        Ещё
      </button>
    </section>
  );
};

export default MoviesCardList;
