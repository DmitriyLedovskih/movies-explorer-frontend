import React from "react";
import "./Portfolio.css";
import arrowIcon from "../../images/arrow-icon.svg";

const Portfolio = () => {
  return (
    <section className="section portfolio">
      <div className="container section__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list main-list">
          <li className="portfolio__list-item">
            <a
              href="https://dmitriyledovskih.github.io/how-to-learn"
              className="portfolio__list-link main-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Статичный сайт
              <img
                src={arrowIcon}
                alt="Иконка стрелочки"
                className="portfolio__list-icon"
              />
            </a>
          </li>
          <li className="portfolio__list-item">
            <a
              href="https://dmitriyledovskih.github.io/russian-travel"
              className="portfolio__list-link main-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Адаптивный сайт
              <img
                src={arrowIcon}
                alt="Иконка стрелочки"
                className="portfolio__list-icon"
              />
            </a>
          </li>
          <li className="portfolio__list-item">
            <a
              href="https://mesto.dmitriyledovskih.nomoredomains.monster"
              className="portfolio__list-link main-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Одностраничное приложение
              <img
                src={arrowIcon}
                alt="Иконка стрелочки"
                className="portfolio__list-icon"
              />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Portfolio;
