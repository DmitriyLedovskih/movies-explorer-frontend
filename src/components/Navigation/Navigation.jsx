import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ closeBurgerMenu }) => {
  return (
    <nav className="navigation">
      <ul className="navigation__menu main-list">
        <li className="navigation__menu-item">
          <Link
            to="/"
            className="navigation__menu-link main-link"
            onClick={closeBurgerMenu}
          >
            Главная
          </Link>
        </li>
        <li className="navigation__menu-item">
          <Link
            to="/movies"
            className="navigation__menu-link navigation__menu-link_active main-link"
            onClick={closeBurgerMenu}
          >
            Фильмы
          </Link>
        </li>
        <li className="navigation__menu-item">
          <Link
            to="/saved-movies"
            className="navigation__menu-link main-link"
            onClick={closeBurgerMenu}
          >
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
