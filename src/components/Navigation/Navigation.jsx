import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ closeBurgerMenu }) => {
  return (
    <nav className="navigation">
      <ul className="navigation__menu main-list">
        <li className="navigation__menu-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__menu-link ${
                isActive ? "navigation__menu-link_active" : ""
              } main-link`
            }
            onClick={closeBurgerMenu}
          >
            Главная
          </NavLink>
        </li>
        <li className="navigation__menu-item">
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `navigation__menu-link ${
                isActive ? "navigation__menu-link_active" : ""
              } main-link`
            }
            onClick={closeBurgerMenu}
          >
            Фильмы
          </NavLink>
        </li>
        <li className="navigation__menu-item">
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              `navigation__menu-link ${
                isActive ? "navigation__menu-link_active" : ""
              } main-link`
            }
            onClick={closeBurgerMenu}
          >
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
