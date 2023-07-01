import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";

const Login = ({
  values,
  handleChange,
  onLogin,
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
      <h2 className="auth-page__title">Рады видеть!</h2>
      <form name="register-form" className="auth-page__form" onSubmit={onLogin}>
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
