import React from "react";
import "./SearchForm.css";

const SearchForm = () => {
  return (
    <form className="search-form" name="search-form">
      <label className="search-form__label">
        <input
          type="text"
          className="search-form__input main-input"
          placeholder="Фильм"
          name="search-input"
        />
        <button
          className="search-form__button main-button main-button_type_primary"
          type="button"
        >
          Поиск
        </button>
      </label>
      <label className="search-form__label search-form__label-checkbox">
        <input
          type="checkbox"
          className="search-form__checkbox-input"
          name="search-checkbox"
          value="check"
          defaultChecked
        />
        <div className="search-form__checkbox"></div>
        Короткометражки
      </label>
    </form>
  );
};

export default SearchForm;
