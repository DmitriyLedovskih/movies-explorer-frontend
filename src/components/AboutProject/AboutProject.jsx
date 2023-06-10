import React from "react";
import "./AboutProject.css";

const AboutProject = () => {
  return (
    <section className="section about-project" id="about-project">
      <div className="container section__container">
        <h2 className="section__title about-project__title">О проекте</h2>
        <div className="about-project__row">
          <div className="about-project__column">
            <h3 className="about-project__column-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__column-descr">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__column">
            <h3 className="about-project__column-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__column-descr">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__block">
          <div className="about-project__block-column about-project__block-column_active">
            <div className="about-project__block-line about-project__block-line_active">
              1 неделя
            </div>
            <span className="about-project__block-text">Back-end</span>
          </div>
          <div className="about-project__block-column">
            <div className="about-project__block-line">4 недели</div>
            <span className="about-project__block-text">Front-end</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
