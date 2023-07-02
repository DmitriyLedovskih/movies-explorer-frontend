import React from "react";
import "./SearchForm.css";
import { useLocation } from "react-router-dom";

const SearchForm = ({
  values,
  isValid,
  errors,
  onSearch,
  handleChangeSearchInput,
  handleChangeCheckbox,
  isChecked,
}) => {
  const { pathname } = useLocation();

  const isErrorText = (text) => {
    return text ? "Нужно ввести ключевое слово" : "Фильм";
  };

  const isErrorClassName = (error) => {
    return error ? "search-form__input_type_error" : "";
  };

  return (
    <form
      className="search-form"
      name="search-form"
      onSubmit={onSearch}
      noValidate
    >
      <label className="search-form__label">
        <input
          type="text"
          className={`search-form__input ${
            pathname === "/movies"
              ? isErrorClassName(errors.searchMoviesValue)
              : isErrorClassName(errors.searchSaveMoviesValue)
          } main-input`}
          placeholder={
            pathname === "/movies"
              ? isErrorText(errors.searchMoviesValue)
              : isErrorText(errors.searchSaveMoviesValue)
          }
          name={
            pathname === "/movies"
              ? "searchMoviesValue"
              : "searchSaveMoviesValue"
          }
          required
          defaultValue={values}
          onChange={handleChangeSearchInput}
        />
        <button
          className={`search-form__button main-button ${
            !isValid ? "main-button_disabled" : ""
          } main-button_type_primary`}
          type="submit"
          disabled={!isValid}
        >
          Поиск
        </button>
      </label>
      <label className="search-form__label search-form__label-checkbox">
        <input
          type="checkbox"
          className="search-form__checkbox-input"
          name="searchCheckbox"
          onChange={handleChangeCheckbox}
        />
        <span
          className={`search-form__checkbox ${
            isChecked ? "search-form__checkbox_checked" : ""
          }`}
        ></span>
        Короткометражки
      </label>
    </form>
  );
};

export default SearchForm;
