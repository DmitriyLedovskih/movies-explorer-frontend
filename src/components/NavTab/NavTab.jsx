import React from "react";
import "./NavTab.css";

const NavTab = () => {
  const handleClick = (evt, id) => {
    evt.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="nav-tab">
      <div className="container">
        <ul className="nav-tab__list main-list">
          <li className="nav-tab__item">
            <a
              href="#about-project"
              className="nav-tab__link main-link"
              onClick={(evt) => handleClick(evt, "about-project")}
            >
              О проекте
            </a>
          </li>
          <li className="nav-tab__item">
            <a
              href="#techs"
              className="nav-tab__link main-link"
              onClick={(evt) => handleClick(evt, "techs")}
            >
              Технологии
            </a>
          </li>
          <li className="nav-tab__item">
            <a
              href="#about-me"
              className="nav-tab__link main-link"
              onClick={(evt) => handleClick(evt, "about-me")}
            >
              Студент
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavTab;
