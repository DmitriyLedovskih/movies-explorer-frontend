import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import profileIcon from "../../images/profile-icon.svg";
import Navigation from "../Navigation/Navigation";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <Link to="/" className="logo">
            <img src={logo} alt="Логотип сайта" className="logo__image" />
          </Link>
          <div className="header__block">
            {/* <Navigation /> */}
            {/* <Link to="/profile" className="header__user main-link">
              Аккаунт
              <img
                src={profileIcon}
                alt="Иконка аккаунта"
                className="header__user-image"
              />
            </Link> */}
          </div>
          <nav className="header__links-navigation">
            <ul className="header__links-menu main-list">
              <li className="header__links-item">
                <Link to="/signup" className="header__links-link main-link">
                  Регистрация
                </Link>
              </li>
              <li className="header__links-item">
                <Link
                  to="/signin"
                  className="header__links-button main-button main-button_type_success"
                >
                  Войти
                </Link>
              </li>
            </ul>
          </nav>
          {/* <button className="header__burger main-button" type="button">
            <span className="header__burger-line"></span>
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
