import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const Movies = () => {
  return (
    <div className="movies">
      <div className="container">
        <SearchForm />
        <MoviesCardList />
        {/* <Preloader /> */}
      </div>
    </div>
  );
};

export default Movies;
