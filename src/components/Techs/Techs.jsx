import React from "react";
import "./Techs.css";

const Techs = () => {
  return (
    <section className="section techs" id="techs">
      <div className="container section__container">
        <h2 className="section__title techs__title">Технологии</h2>
        <div className="techs__block">
          <h3 className="techs__block-title">7 технологий</h3>
          <p className="techs__block-subtitle">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
          <ul className="techs__block-list main-list">
            <li className="techs__block-item">HTML</li>
            <li className="techs__block-item">CSS</li>
            <li className="techs__block-item">JS</li>
            <li className="techs__block-item">React</li>
            <li className="techs__block-item">Git</li>
            <li className="techs__block-item">Express.js</li>
            <li className="techs__block-item">mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Techs;
