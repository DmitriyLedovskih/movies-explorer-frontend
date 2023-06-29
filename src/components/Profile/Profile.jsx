import React from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Profile = ({
  onSignOut,
  onEditProfile,
  isEditProfile,
  setIsEditProfile,
  handleChange,
  errors,
  isValid,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const openProfileEdit = () => {
    setTimeout(() => {
      setIsEditProfile(true);
    }, 0);
  };

  return (
    <section className="profile">
      <div className="container">
        <form className="profile__form" onSubmit={onEditProfile}>
          <div className="profile__content">
            <h1 className="profile__title">Привет, {currentUser.name}!</h1>
            <ul className="profile__list main-list">
              <li className="profile__list-item">
                <span className="profile__list-label">Имя</span>
                <input
                  type="text"
                  name="name"
                  className={`profile__list-input ${
                    isEditProfile ? "profile__list-input_visible" : ""
                  } ${
                    errors.name ? "profile__list-input_type_error" : ""
                  } main-input`}
                  placeholder="Имя"
                  onChange={handleChange}
                  defaultValue={currentUser.name}
                  minLength="2"
                  maxLength="30"
                  required
                  pattern="^[А-ЯЁа-яёA-Za-z -]+$"
                />
                <span
                  className={`profile__list-text ${
                    isEditProfile ? "profile__list-text_hide" : ""
                  }`}
                >
                  {currentUser.name}
                </span>
                <span className="profile__list-error">
                  {errors.name &&
                    "Это поле должно содержать только латиницу, кириллицу, пробел или дефис."}
                </span>
              </li>
              <li className="profile__list-item">
                <span className="profile__list-label">E-mail</span>
                <input
                  type="text"
                  name="email"
                  className={`profile__list-input ${
                    isEditProfile ? "profile__list-input_visible" : ""
                  } ${
                    errors.email ? "profile__list-input_type_error" : ""
                  } main-input`}
                  placeholder="E-mail"
                  onChange={handleChange}
                  defaultValue={currentUser.email}
                  required
                  pattern="^\S+@\S+\.\S+$"
                />
                <span
                  className={`profile__list-text ${
                    isEditProfile ? "profile__list-text_hide" : ""
                  }`}
                >
                  {currentUser.email}
                </span>
                <span className="profile__list-error">{errors.email}</span>
              </li>
            </ul>
          </div>
          <div className="profile__links">
            {isEditProfile ? (
              <button
                className={`profile__links-link profile__links-link_type_edit main-button ${
                  !isValid ? "main-button_disabled" : ""
                }  main-link`}
                type="submit"
                disabled={!isValid}
              >
                Сохранить
              </button>
            ) : (
              <button
                className="profile__links-link profile__links-link_type_edit main-button main-link"
                type="button"
                onClick={openProfileEdit}
              >
                Редактировать
              </button>
            )}
            <button
              className="profile__links-link profile__links-link_type_exit main-button main-link"
              type="button"
              onClick={onSignOut}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
