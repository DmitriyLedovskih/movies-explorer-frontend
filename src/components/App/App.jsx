import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import {
  checkToken,
  deleteSaveMovie,
  editProfile,
  getSaveMovies,
  login,
  register,
  saveMovie,
  signOut,
} from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { BASE_URL, getMovies } from "../../utils/MoviesApi";
import ProctectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import DeleteMoviePopup from "../DeleteMoviePopup/DeleteMoviePopup";

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const allMovies = JSON.parse(localStorage.getItem("allMovies"));
  const saveMovies = JSON.parse(localStorage.getItem("saveMovies"));
  const searchMovies = JSON.parse(localStorage.getItem("searchMovies"));
  const searchSaveMovies = JSON.parse(localStorage.getItem("searchSaveMovies"));
  const searchCheckboxIsChecked = JSON.parse(
    localStorage.getItem("searchCheckboxIsChecked")
  );
  const searchSaveMoviesCheckboxIsChecked = JSON.parse(
    localStorage.getItem("searchSaveMoviesCheckboxIsChecked")
  );
  const searchInputValue = localStorage.getItem("searchInputValue");
  const searchSaveMoviesInputValue = localStorage.getItem(
    "searchSaveMoviesInputValue"
  );
  const loggedIn = localStorage.getItem("loggedIn");
  const [moviesIsChecked, setMoviesIsChecked] = React.useState(false);
  const [saveMoviesIsChecked, setSaveMoviesIsChecked] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedMovie, setSelectedMovie] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [meSaveMovie, setMeSaveMovie] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEditProfile, setIsEditProfile] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = React.useState(false);
  const [successText, setSuccessText] = React.useState("");
  const [errorText, setErrorText] = React.useState(
    "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
  );
  const [isLoadingButtonText, setIsLoadingButtonText] = React.useState(false);
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [renderMovie, setRenderMovie] = React.useState(12);
  const [loadMovie, setLoadMovie] = React.useState(3);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const hideInfoTooltip = () => {
    setTimeout(() => {
      setIsOpenInfoTooltip(false);
      setSuccessText("");
    }, 2000);
  };

  const getMe = async () => {
    try {
      const data = await checkToken();
      if (data.data) {
        setCurrentUser(data.data);
        localStorage.setItem("loggedIn", true);
      }
    } catch (error) {
      localStorage.setItem("loggedIn", false);
    }
  };

  const getAllMovies = async () => {
    try {
      setIsLoading(true);
      const data = await getMovies();
      if (data.length > 0) {
        setMovies(data);
        localStorage.setItem("allMovies", JSON.stringify(data));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setMovies([]);
      setIsOpenInfoTooltip(true);
      hideInfoTooltip();
    }
  };

  const getMeSaveMovies = async () => {
    try {
      setIsLoading(true);
      const data = await getSaveMovies();
      if (data.length > 0) {
        setMeSaveMovie(data);
        localStorage.setItem("saveMovies", JSON.stringify(data));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setMeSaveMovie([]);
      setIsOpenInfoTooltip(true);
      hideInfoTooltip();
    }
  };

  React.useEffect(() => {
    getMeSaveMovies();
  }, []);

  const handleRegisterSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const data = await register(values.name, values.email, values.password);
      if (data.data) {
        navigate("/signin");
        resetForm();
        setIsSuccess(true);
        setSuccessText("Вы успешно зарегистрировались!");
      } else {
        setErrorText(data.message);
        setIsSuccess(false);
      }
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setIsOpenInfoTooltip(true);
      hideInfoTooltip();
    }
  };

  const handleLoginSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const data = await login(values.email, values.password);
      if (data.user) {
        navigate("/movies");
        setCurrentUser(data.user);
        resetForm();
        localStorage.setItem("loggedIn", true);
        setIsSuccess(true);
        setSuccessText("Вы успешно авторизовались!");
      } else {
        setErrorText(data.message);
        setIsSuccess(false);
      }
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setIsOpenInfoTooltip(true);
      hideInfoTooltip();
    }
  };

  const handleEditProfile = async (evt) => {
    evt.preventDefault();
    try {
      const data = await editProfile(values.name, values.email);
      if (data.data) {
        setCurrentUser(data.data);
        setIsEditProfile(false);
        setSuccessText("Вы успешно изменили данные!");
        setIsSuccess(true);
      }
      setErrorText(data.message);
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setIsOpenInfoTooltip(true);
      hideInfoTooltip();
    }
  };

  const handleSignOut = async () => {
    try {
      const { message } = await signOut();
      if (message) {
        localStorage.clear();
        setMeSaveMovie([]);
        setIsSuccess(true);
        navigate("/");
        setSuccessText(message);
      }
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setIsOpenInfoTooltip(true);
      hideInfoTooltip();
    }
  };

  const postMovie = async (movie) => {
    try {
      const data = await saveMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${BASE_URL}/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${BASE_URL}/${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      });
      if (data) {
        setMeSaveMovie((state) => [...state, data]);
        setIsSuccess(true);
        setSuccessText("Фильм успешно сохранен!");
        handleChangeSearchSaveMoviesCheckbox();
      } else {
        setErrorText("Фильм не удалось сохранить!");
        setIsSuccess(false);
      }
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setIsOpenInfoTooltip(true);
      hideInfoTooltip();
    }
  };
  // console.log(meSaveMovie);

  const handleMovieDelete = async (evt) => {
    evt.preventDefault();
    setIsLoadingButtonText(true);
    try {
      const { message } = await deleteSaveMovie(selectedMovie._id);
      if (message === "Фильм удален") {
        setIsSuccess(true);
        setSuccessText(message);
        setMeSaveMovie(
          saveMovies.filter((movie) => movie._id !== selectedMovie._id)
        );
        handleChangeSearchSaveMoviesCheckbox();
        closeAllPopups();
      } else {
        setIsSuccess(false);
        setErrorText(message);
      }
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setIsOpenInfoTooltip(true);
      hideInfoTooltip();
      setIsLoadingButtonText(false);
    }
  };

  const handleDeleteMovieClick = (movie) => {
    setIsOpenPopup(!isOpenPopup);
    setSelectedMovie(movie);
  };

  const closeAllPopups = () => {
    setIsOpenPopup(false);
    setSelectedMovie({});
  };

  const closeByOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  React.useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };

    if (isOpenPopup) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpenPopup]);

  const onclickLoadMore = () => {
    setRenderMovie(renderMovie + loadMovie);
  };

  const onResize = () => {
    setTimeout(() => {
      if (windowWidth >= 990) {
        setRenderMovie(12);
        setLoadMovie(3);
      } else if (windowWidth >= 700) {
        setRenderMovie(8);
        setLoadMovie(2);
      } else {
        setRenderMovie(5);
        setLoadMovie(2);
      }
    }, 1000);
  };

  React.useEffect(() => {
    onResize();
  }, [windowWidth]);

  React.useEffect(() => {
    const resize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleSearch = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    if (pathname === "/movies") {
      const movies = allMovies.filter((movie) =>
        movie.nameRU
          .toLowerCase()
          .includes(values.searchMoviesValue.toLowerCase())
      );
      setMovies(movies);
      localStorage.setItem("searchMovies", JSON.stringify(movies));
      localStorage.setItem("searchInputValue", values.searchMoviesValue);
    } else {
      const movies = saveMovies.filter((movie) =>
        movie.nameRU
          .toLowerCase()
          .includes(values.searchSaveMoviesValue.toLowerCase())
      );
      setMeSaveMovie(movies);
      localStorage.setItem("searchSaveMovies", JSON.stringify(movies));
      localStorage.setItem(
        "searchSaveMoviesInputValue",
        values.searchSaveMoviesValue
      );
    }
    setIsLoading(false);
  };

  const handleChangeSearchInput = (evt) => {
    handleChange(evt);
    if (evt.target.value === "" && pathname === "/movies") {
      localStorage.removeItem("searchMovies");
      localStorage.removeItem("searchInputValue");
      getAllMovies();
    } else if (evt.target.value === "" && pathname === "/saved-movies") {
      localStorage.removeItem("searchSaveMovies");
      localStorage.removeItem("searchSaveMoviesInputValue");
      getMeSaveMovies();
    }
  };

  const handleChangeSearchCheckbox = (evt) => {
    if (evt.target.checked) {
      const movies = allMovies.filter((movie) => movie.duration <= 40);
      setMovies(movies);
      localStorage.setItem("searchMovies", JSON.stringify(movies));
      localStorage.setItem("searchCheckboxIsChecked", evt.target.checked);
      setMoviesIsChecked(evt.target.checked);
    } else {
      const movies = allMovies.filter((movie) => movie.duration > 40);
      setMovies(movies);
      localStorage.setItem("searchMovies", JSON.stringify(movies));
      localStorage.setItem("searchCheckboxIsChecked", evt.target.checked);
      setMoviesIsChecked(evt.target.checked);
    }
  };

  const handleChangeSearchSaveMoviesCheckbox = () => {
    if (!saveMoviesIsChecked) {
      const movies = saveMovies.filter((movie) => movie.duration <= 40);
      setMeSaveMovie(movies);
      localStorage.setItem("searchSaveMovies", JSON.stringify(movies));
      localStorage.setItem(
        "searchSaveMoviesCheckboxIsChecked",
        !saveMoviesIsChecked
      );
      setSaveMoviesIsChecked(!saveMoviesIsChecked);
    } else {
      const movies = saveMovies.filter((movie) => movie.duration > 40);
      setMeSaveMovie(movies);
      localStorage.setItem("searchSaveMovies", JSON.stringify(movies));
      localStorage.setItem(
        "searchSaveMoviesCheckboxIsChecked",
        !saveMoviesIsChecked
      );
      setSaveMoviesIsChecked(!saveMoviesIsChecked);
    }
  };

  React.useEffect(() => {
    if (searchMovies) {
      setMovies(searchMovies);
      setIsLoading(false);
    }

    if (loggedIn && !searchMovies) {
      getAllMovies();
    }

    if (searchSaveMovies) {
      setMeSaveMovie(searchSaveMovies);
    }

    if (loggedIn && !searchSaveMovies) {
      getMeSaveMovies();
    }

    if (loggedIn) {
      getMe();
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (searchCheckboxIsChecked) {
      setMoviesIsChecked(searchCheckboxIsChecked);
    }

    if (searchSaveMoviesCheckboxIsChecked) {
      setSaveMoviesIsChecked(searchSaveMoviesCheckboxIsChecked);
    }
  }, []);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        {pathname === "/" && <Header loggedIn={loggedIn} />}
        {pathname === "/movies" && <Header loggedIn={loggedIn} />}
        {pathname === "/saved-movies" && <Header loggedIn={loggedIn} />}
        {pathname === "/profile" && <Header loggedIn={loggedIn} />}
        <main className="content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProctectedRouteElement
                  element={Movies}
                  movies={movies}
                  savedMovie={meSaveMovie}
                  onSaveMovie={postMovie}
                  openDeletePopup={handleDeleteMovieClick}
                  isLoading={isLoading}
                  getMovies={getAllMovies}
                  setIsLoading={setIsLoading}
                  renderMovie={renderMovie}
                  values={
                    searchInputValue
                      ? searchInputValue
                      : values.searchMoviesValue
                  }
                  isValid={isValid}
                  errors={errors}
                  onSearch={handleSearch}
                  handleChangeSearchInput={handleChangeSearchInput}
                  handleChangeCheckbox={handleChangeSearchCheckbox}
                  isChecked={moviesIsChecked}
                  onclickLoadMore={onclickLoadMore}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProctectedRouteElement
                  element={SavedMovies}
                  savedMovie={meSaveMovie}
                  openDeletePopup={handleDeleteMovieClick}
                  setIsLoading={setIsLoading}
                  values={
                    searchSaveMoviesInputValue
                      ? searchSaveMoviesInputValue
                      : values.searchSaveMoviesValue
                  }
                  isValid={isValid}
                  errors={errors}
                  onSearch={handleSearch}
                  handleChangeSearchInput={handleChangeSearchInput}
                  handleChangeCheckbox={handleChangeSearchSaveMoviesCheckbox}
                  isChecked={saveMoviesIsChecked}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  values={values}
                  handleChange={handleChange}
                  onRegister={handleRegisterSubmit}
                  errors={errors}
                  isValid={isValid}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  values={values}
                  handleChange={handleChange}
                  onLogin={handleLoginSubmit}
                  errors={errors}
                  isValid={isValid}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProctectedRouteElement
                  element={Profile}
                  onSignOut={handleSignOut}
                  onEditProfile={handleEditProfile}
                  isEditProfile={isEditProfile}
                  setIsEditProfile={setIsEditProfile}
                  handleChange={handleChange}
                  errors={errors}
                  isValid={isValid}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {pathname === "/" && <Footer />}
        {pathname === "/movies" && <Footer />}
        {pathname === "/saved-movies" && <Footer />}
        <InfoTooltip
          isOpenInfoTooltip={isOpenInfoTooltip}
          isSuccess={isSuccess}
          successText={successText}
          errorText={errorText}
        />
        <DeleteMoviePopup
          title="Вы точно хотите удалить сохраненый фильм?"
          buttonText={isLoadingButtonText ? "Удаление..." : "Удалить"}
          onSubmit={handleMovieDelete}
          isOpenPopup={isOpenPopup}
          onClose={closeAllPopups}
          onCloseOverlay={closeByOverlay}
        />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
