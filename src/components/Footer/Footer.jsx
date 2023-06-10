import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__row">
          <p className="footer__copyright">&copy; 2023</p>
          <nav className="footer__navigation">
            <ul className="footer__menu main-list">
              <li className="footer__menu-item">
                <a
                  href="https://practicum.yandex.ru"
                  className="footer__menu-link main-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__menu-item">
                <a
                  href="https://github.com/DmitriyLedovskih"
                  className="footer__menu-link main-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
