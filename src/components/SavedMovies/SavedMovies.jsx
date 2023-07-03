import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = ({
  savedMovie,
  isLoading,
  openDeletePopup,
  values,
  isValid,
  errors,
  onSearch,
  handleChangeSearchInput,
  handleChangeCheckbox,
  isChecked,
  isSubmitLoading,
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
          savedMovie={savedMovie}
          isLoading={isLoading}
          openDeletePopup={openDeletePopup}
          isSubmitLoading={isSubmitLoading}
        />
      </div>
    </div>
  );
};

export default SavedMovies;
