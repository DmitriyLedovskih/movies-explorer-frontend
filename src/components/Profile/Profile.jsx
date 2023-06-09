import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <section className="profile">
      <div className="container">
        <div className="profile__row">
          <div className="profile__content">
            <h1 className="profile__title">Привет, Виталий!</h1>
            <ul className="profile__list main-list">
              <li className="profile__list-item">
                <span className="profile__list-label">Имя</span>
                <span className="profile__list-text">Виталий</span>
              </li>
              <li className="profile__list-item">
                <span className="profile__list-label">E-mail</span>
                <span className="profile__list-text">pochta@yandex.ru</span>
              </li>
            </ul>
          </div>
          <div className="profile__links">
            <button
              className="profile__links-link profile__links-link_type_edit main-button main-link"
              type="button"
            >
              Редактировать
            </button>
            <button
              className="profile__links-link profile__links-link_type_exit main-button main-link"
              type="button"
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
