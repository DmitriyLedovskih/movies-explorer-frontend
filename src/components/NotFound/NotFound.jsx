import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="not-found">
      <div className="container">
        <div className="not-found__row">
          <div className="not-found__content">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__subtitle">Страница не найдена</p>
          </div>
          <Link to="/" className="not-found__link main-link">
            Назад
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
