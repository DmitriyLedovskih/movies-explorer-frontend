import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

const Login = () => {
  return (
    <section className="auth-page">
      <span className="logo auth-page__logo">
        <img src={logo} alt="" className="logo__image" />
      </span>
      <h2 className="auth-page__title">Рады видеть!</h2>
      <form name="register-form" className="auth-page__form">
        <label className="auth-page__form-label">
          <span className="auth-page__form-text">E-mail</span>
          <input
            type="email"
            className="auth-page__form-input main-input"
            name="email"
            required
          />
        </label>
        <label className="auth-page__form-label">
          <span className="auth-page__form-text">Пароль</span>
          <input
            type="password"
            className="auth-page__form-input main-input"
            name="password"
            required
          />
        </label>
        <button
          type="button"
          className="auth-page__form-button main-button main-button_type_primary"
        >
          Войти
        </button>
      </form>
      <p className="auth-page__text">
        Ёще не зарегистрированы?{" "}
        <Link to="/signup" className="auth-page__link main-link">
          Регистрация
        </Link>
      </p>
    </section>
  );
};

export default Login;
