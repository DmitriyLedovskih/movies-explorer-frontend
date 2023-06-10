import React from "react";
import "./SearchForm.css";

const SearchForm = () => {
  return (
    <form className="search-form" name="search-form">
      <div className="search-form__label">
        <input
          type="text"
          className="search-form__input main-input"
          placeholder="Фильм"
          name="search-input"
          required
        />
        <button
          className="search-form__button main-button main-button_type_primary"
          type="button"
        >
          Поиск
        </button>
      </div>
      <div className="search-form__label search-form__label-checkbox">
        <input
          type="checkbox"
          className="search-form__checkbox-input"
          name="search-checkbox"
          value="check"
          defaultChecked
        />
        <span className="search-form__checkbox"></span>
        Короткометражки
      </div>
    </form>
  );
};

export default SearchForm;
