import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useLocation } from "react-router-dom";

const Movies = ({
  movies,
  savedMovie,
  onSaveMovie,
  openDeletePopup,
  isLoading,
  getMovies,
  renderMovie,
  values,
  isValid,
  errors,
  onSearch,
  handleChangeSearchInput,
  handleChangeCheckbox,
  isChecked,
  onclickLoadMore,
}) => {
  return (
    <div className="movies">
      <div className="container">
        <SearchForm
          values={values}
          isValid={isValid}
          errors={errors}
          onSearch={onSearch}
          handleChangeSearchInput={handleChangeSearchInput}
          handleChangeCheckbox={handleChangeCheckbox}
          isChecked={isChecked}
        />
        <MoviesCardList
          movies={movies}
          savedMovie={savedMovie}
          onSaveMovie={onSaveMovie}
          isLoading={isLoading}
          openDeletePopup={openDeletePopup}
          renderMovie={renderMovie}
          onclickLoadMore={onclickLoadMore}
        />
      </div>
    </div>
  );
};

export default Movies;
