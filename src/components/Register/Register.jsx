import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

const Register = () => {
  return (
    <section className="auth-page">
      <span className="logo auth-page__logo">
        <img src={logo} alt="" className="logo__image" />
      </span>
      <h2 className="auth-page__title">Добро пожаловать!</h2>
      <form name="register-form" className="auth-page__form">
        <label className="auth-page__form-label">
          <span className="auth-page__form-text">Имя</span>
          <input
            type="text"
            className="auth-page__form-input main-input"
            name="name"
          />
        </label>
        <label className="auth-page__form-label">
          <span className="auth-page__form-text">E-mail</span>
          <input
            type="email"
            className="auth-page__form-input main-input"
            name="email"
          />
        </label>
        <label className="auth-page__form-label">
          <span className="auth-page__form-text">Пароль</span>
          <input
            type="password"
            className="auth-page__form-input main-input auth-page__form-input_type_error"
            name="password"
          />
          <span className="auth-page__form-error">Что-то пошло не так...</span>
        </label>
        <button
          type="button"
          className="auth-page__form-button main-button main-button_type_primary"
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="auth-page__text">
        Уже зарегистрированы?{" "}
        <Link to="/signin" className="auth-page__link main-link">
          Войти
        </Link>
      </p>
      <InfoTooltip />
    </section>
  );
};

export default Register;
