import React from "react";
import "./AboutMe.css";
import myPhoto from "../../images/my-photo.jpg";

const AboutMe = () => {
  return (
    <section className="section about-me" id="about-me">
      <div className="container section__container">
        <h2 className="section__title about-me__title">Студент</h2>
        <div className="about-me__row">
          <div className="about-me__content">
            <h3 className="about-me__content-title">Дмитрий</h3>
            <h4 className="about-me__content-subtitle">
              Фронтенд-разработчик, 20 лет
            </h4>
            <p className="about-me__content-descr">
              Ещё с&nbsp;детства мечтал стать программистом. Когда пришло время
              выбора профессии, сразу заинтересовала веб-разработчика. Сейчас
              больше всего увлекает фронтенд разработка. Я&nbsp;всегда готов
              учиться и&nbsp;изучать новые технологии. Могу быстро
              адаптироваться к&nbsp;новым задачам и&nbsp;технологиям. Люблю
              покаться на&nbsp;велосипеде или&nbsp;же поиграть
              в&nbsp;компьютерные или настольные игры.
            </p>
            <a
              href="https://github.com/DmitriyLedovskih"
              className="about-me__content-link main-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </div>
          <img src={myPhoto} alt="Моя фотография" className="about-me__image" />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
