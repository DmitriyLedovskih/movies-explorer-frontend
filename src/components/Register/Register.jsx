import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";

const Register = ({
  values,
  handleChange,
  onRegister,
  errors,
  isValid,
  isSubmitLoading,
  loggedIn,
}) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <section className="auth-page">
      <Link to="/" className="logo auth-page__logo">
        <img src={logo} alt="Логотип сайта" className="logo__image" />
      </Link>
      <h2 className="auth-page__title">Добро пожаловать!</h2>
      <form
        name="register-form"
        className="auth-page__form"
        onSubmit={onRegister}
        noValidate
      >
        <label className="auth-page__form-label">
          <span className="auth-page__form-text">Имя</span>
          <input
            type="text"
            className={`auth-page__form-input ${
              errors.name ? "auth-page__form-input_type_error" : ""
            } ${isSubmitLoading ? "main-input_disabled" : ""} main-input`}
            name="name"
            required
            onChange={handleChange}
            defaultValue={values.name}
            minLength="2"
            maxLength="30"
            pattern="^[А-ЯЁа-яёA-Za-z -]+$"
          />
          <span className="auth-page__form-error">
            {errors.name &&
              "Это поле должно содержать только латиницу, кириллицу, пробел или дефис."}
          </span>
        </label>
        <label className="auth-page__form-label">
          <span className="auth-page__form-text">E-mail</span>
          <input
            type="email"
            className={`auth-page__form-input ${
              errors.email ? "auth-page__form-input_type_error" : ""
            } ${isSubmitLoading ? "main-input_disabled" : ""} main-input`}
            name="email"
            required
            onChange={handleChange}
            defaultValue={values.email}
            pattern="^\S+@\S+\.\S+$"
          />
          <span className="auth-page__form-error">{errors.email}</span>
        </label>
        <label className="auth-page__form-label">
          <span className="auth-page__form-text">Пароль</span>
          <input
            type="password"
            className={`auth-page__form-input ${
              errors.password ? "auth-page__form-input_type_error" : ""
            } ${isSubmitLoading ? "main-input_disabled" : ""} main-input`}
            name="password"
            required
            onChange={handleChange}
            defaultValue={values.password}
          />
          <span className="auth-page__form-error">{errors.password}</span>
        </label>
        <button
          type="submit"
          className={`auth-page__form-button main-button main-button_type_primary ${
            !isValid || isSubmitLoading ? "main-button_disabled" : ""
          }`}
          disabled={!isValid || isSubmitLoading}
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
    </section>
  );
};

export default Register;
