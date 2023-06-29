import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import profileIcon from "../../images/profile-icon.svg";
import Navigation from "../Navigation/Navigation";

const Header = ({ loggedIn }) => {
  const [isVisibleBurgerMenu, setIsVisibleBurgerMenu] = React.useState(false);

  const openBurgerMenu = () => {
    setIsVisibleBurgerMenu(!isVisibleBurgerMenu);
  };

  const closeBurgerMenu = () => {
    setIsVisibleBurgerMenu(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <Link to="/" className="logo">
            <img src={logo} alt="Логотип сайта" className="logo__image" />
          </Link>
          {loggedIn ? (
            <>
              <div
                className={`header__block ${
                  isVisibleBurgerMenu ? "header__block_opened" : ""
                }`}
              >
                <Navigation closeBurgerMenu={closeBurgerMenu} />
                <Link
                  to="/profile"
                  className="header__user main-link"
                  onClick={closeBurgerMenu}
                >
                  Аккаунт
                  <img
                    src={profileIcon}
                    alt="Иконка аккаунта"
                    className="header__user-image"
                  />
                </Link>
              </div>
              <button
                className={`header__burger ${
                  isVisibleBurgerMenu ? "header__burger_active" : ""
                } main-button`}
                type="button"
                onClick={openBurgerMenu}
              >
                <span
                  className={`header__burger-line ${
                    isVisibleBurgerMenu ? "header__burger-line_active" : ""
                  }`}
                ></span>
              </button>
            </>
          ) : (
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
