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
import {
  BREAKPOINT_DESKTOP,
  BREAKPOINT_TABLET,
  DURATION_SHORT_FILM,
  LOADING_MOVIE_DESKTOP,
  LOADING_MOVIE_TABLET_AND_MOBILE,
  RENDER_MOVIE_DESKTOP,
  RENDER_MOVIE_MOBILE,
  RENDER_MOVIE_TABLET,
} from "../../utils/constants";

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    values,
    setValues,
    setIsValid,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation();
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
  const [movieId, setMovieId] = React.useState("");
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
  const [renderMovie, setRenderMovie] = React.useState(RENDER_MOVIE_DESKTOP);
  const [loadMovie, setLoadMovie] = React.useState(LOADING_MOVIE_DESKTOP);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);

  const filterMovieDuration =
    allMovies &&
    allMovies.filter((movie) =>
      moviesIsChecked
        ? movie.duration <= DURATION_SHORT_FILM
        : movie.duration > DURATION_SHORT_FILM
    );

  const filterSaveMovieDuration =
    saveMovies &&
    saveMovies.filter((movie) =>
      saveMoviesIsChecked
        ? movie.duration <= DURATION_SHORT_FILM
        : movie.duration > DURATION_SHORT_FILM
    );

  const filterFullMovies =
    allMovies &&
    allMovies.filter((movie) =>
      searchInputValue
        ? movie.nameRU.toLowerCase().includes(searchInputValue.toLowerCase()) &&
          movie.duration <= DURATION_SHORT_FILM
        : movie.duration <= DURATION_SHORT_FILM
    );

  const filterSaveFullMovies =
    saveMovies &&
    saveMovies.filter((movie) =>
      searchSaveMoviesInputValue
        ? movie.nameRU
            .toLowerCase()
            .includes(searchSaveMoviesInputValue.toLowerCase()) &&
          movie.duration <= DURATION_SHORT_FILM
        : movie.duration <= DURATION_SHORT_FILM
    );

  const filterShortMovies =
    allMovies &&
    allMovies.filter((movie) =>
      searchInputValue
        ? movie.nameRU.toLowerCase().includes(searchInputValue.toLowerCase()) &&
          movie.duration > DURATION_SHORT_FILM
        : movie.duration > DURATION_SHORT_FILM
    );

  const filterSaveShortMovies =
    saveMovies &&
    saveMovies.filter((movie) =>
      searchSaveMoviesInputValue
        ? movie.nameRU
            .toLowerCase()
            .includes(searchSaveMoviesInputValue.toLowerCase()) &&
          movie.duration > DURATION_SHORT_FILM
        : movie.duration > DURATION_SHORT_FILM
    );

  const signOutParams = () => {
    localStorage.clear();
    setMeSaveMovie([]);
    navigate("/");
    resetForm();
    setIsEditProfile(false);
  };

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
      signOutParams();
      setIsSuccess(false);
      setIsOpenInfoTooltip(true);
      hideInfoTooltip();
    }
  };

  const getAllMovies = async () => {
    setIsLoading(true);
    try {
      const data = await getMovies();
      if (data) {
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
    setIsLoading(true);
    try {
      const data = await getSaveMovies();
      if (data) {
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

  const handleRegisterSubmit = async (evt) => {
    evt.preventDefault();
    setIsSubmitLoading(true);
    try {
      const data = await register(values.name, values.email, values.password);
      if (data.data) {
        navigate("/movies");
        resetForm();
        setCurrentUser(data.user);
        localStorage.setItem("loggedIn", true);
        setIsSuccess(true);
        setSuccessText("Вы успешно зарегистрировались!");
        getAllMovies();
        getMeSaveMovies();
      }
    } catch (error) {
      setIsSuccess(false);
      setErrorText(error);
    } finally {
      setIsSubmitLoading(false);
      setIsOpenInfoTooltip(true);
      hideInfoTooltip();
    }
  };

  const handleLoginSubmit = async (evt) => {
    evt.preventDefault();
    setIsSubmitLoading(true);
    try {
      const data = await login(values.email, values.password);
      if (data.user) {
        navigate("/movies");
        setCurrentUser(data.user);
        resetForm();
        localStorage.setItem("loggedIn", true);
        setIsSuccess(true);
        setSuccessText("Вы успешно авторизовались!");
        getAllMovies();
        getMeSaveMovies();
      }
    } catch (error) {
      setIsSuccess(false);
      setErrorText(error);
    } finally {
      setIsSubmitLoading(false);
      setIsOpenInfoTooltip(true);
      hideInfoTooltip();
    }
  };

  const handleEditProfile = async (evt) => {
    evt.preventDefault();
    setIsSubmitLoading(true);
    try {
      const data = await editProfile(values.name, values.email);
      if (data.data) {
        setCurrentUser(data.data);
        setIsEditProfile(false);
        setSuccessText("Вы успешно изменили данные!");
        setIsSuccess(true);
        resetForm();
      }
    } catch (error) {
      setIsSuccess(false);
      setErrorText(error);
    } finally {
      setIsSubmitLoading(false);
      setIsOpenInfoTooltip(true);
      hideInfoTooltip();
    }
  };

  const handleSignOut = async () => {
    try {
      const { message } = await signOut();
      if (message) {
        signOutParams();
        setIsSuccess(true);
      }
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setIsOpenInfoTooltip(true);
      hideInfoTooltip();
    }
  };

  const postMovie = async (movie) => {
    setIsSubmitLoading(true);
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
        const mov = [...saveMovies, data].filter((movie) =>
          saveMoviesIsChecked
            ? movie.duration <= DURATION_SHORT_FILM
            : movie.duration > DURATION_SHORT_FILM
        );
        setMeSaveMovie(mov);
        localStorage.setItem("searchSaveMovies", JSON.stringify(mov));
        localStorage.setItem(
          "saveMovies",
          JSON.stringify([...saveMovies, data])
        );
        setIsSuccess(true);
        setSuccessText("Фильм успешно сохранен!");
      }
    } catch (error) {
      setIsSuccess(false);
      setErrorText("Фильм не удалось сохранить!");
    } finally {
      setIsSubmitLoading(false);
      setIsOpenInfoTooltip(true);
      hideInfoTooltip();
    }
  };

  const handleMovieDelete = async (evt) => {
    evt.preventDefault();
    setIsLoadingButtonText(true);
    setIsSubmitLoading(true);
    try {
      const { message } = await deleteSaveMovie(movieId);
      if (message) {
        const deleteMovie = saveMovies.filter((movie) => movie._id !== movieId);
        const saveDeleteMovie = saveMovies.filter((movie) =>
          saveMoviesIsChecked
            ? movie.duration <= DURATION_SHORT_FILM && movie._id !== movieId
            : movie.duration > DURATION_SHORT_FILM && movie._id !== movieId
        );
        setIsSuccess(true);
        setSuccessText(message);
        setMeSaveMovie(saveDeleteMovie);
        localStorage.setItem(
          "searchSaveMovies",
          JSON.stringify(saveDeleteMovie)
        );
        localStorage.setItem("saveMovies", JSON.stringify(deleteMovie));
        closeAllPopups();
      }
    } catch (error) {
      setIsSuccess(false);
      setErrorText(error);
    } finally {
      setIsSubmitLoading(false);
      setIsOpenInfoTooltip(true);
      hideInfoTooltip();
      setIsLoadingButtonText(false);
    }
  };

  const handleDeleteMovieClick = (id) => {
    setIsOpenPopup(!isOpenPopup);
    setMovieId(id);
  };

  const closeAllPopups = () => {
    setIsOpenPopup(false);
    setMovieId("");
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
      if (windowWidth >= BREAKPOINT_DESKTOP) {
        setRenderMovie(RENDER_MOVIE_DESKTOP);
        setLoadMovie(LOADING_MOVIE_DESKTOP);
      } else if (windowWidth >= BREAKPOINT_TABLET) {
        setRenderMovie(RENDER_MOVIE_TABLET);
        setLoadMovie(LOADING_MOVIE_TABLET_AND_MOBILE);
      } else {
        setRenderMovie(RENDER_MOVIE_MOBILE);
        setLoadMovie(LOADING_MOVIE_TABLET_AND_MOBILE);
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
    try {
      setIsValid(false);
      if (pathname === "/movies") {
        const searchAndFilterMovies = allMovies.filter((movie) =>
          moviesIsChecked
            ? movie.duration <= DURATION_SHORT_FILM &&
              movie.nameRU
                .toLowerCase()
                .includes(values.searchMoviesValue.toLowerCase())
            : movie.duration > DURATION_SHORT_FILM &&
              movie.nameRU
                .toLowerCase()
                .includes(values.searchMoviesValue.toLowerCase())
        );
        setMovies(searchAndFilterMovies);
        localStorage.setItem(
          "searchMovies",
          JSON.stringify(searchAndFilterMovies)
        );
        localStorage.setItem("searchInputValue", values.searchMoviesValue);
      } else {
        const searchAndFilterSaveMovies = saveMovies.filter((movie) =>
          saveMoviesIsChecked
            ? movie.duration <= DURATION_SHORT_FILM &&
              movie.nameRU
                .toLowerCase()
                .includes(values.searchSaveMoviesValue.toLowerCase())
            : movie.duration > DURATION_SHORT_FILM &&
              movie.nameRU
                .toLowerCase()
                .includes(values.searchSaveMoviesValue.toLowerCase())
        );
        setMeSaveMovie(searchAndFilterSaveMovies);
        localStorage.setItem(
          "searchSaveMovies",
          JSON.stringify(searchAndFilterSaveMovies)
        );
        localStorage.setItem(
          "searchSaveMoviesInputValue",
          values.searchSaveMoviesValue
        );
      }
    } catch (error) {
      setErrorText("Введите название фильма!");
      setIsOpenInfoTooltip(true);
      hideInfoTooltip();
    }
  };

  const handleChangeSearchInput = (evt) => {
    handleChange(evt);
    if (evt.target.value === "" && pathname === "/movies") {
      localStorage.removeItem("searchMovies");
      localStorage.removeItem("searchInputValue");
      setMovies(filterMovieDuration);
    } else if (evt.target.value === "" && pathname === "/saved-movies") {
      localStorage.removeItem("searchSaveMovies");
      localStorage.removeItem("searchSaveMoviesInputValue");
      setMeSaveMovie(filterSaveMovieDuration);
    }
  };

  const handleChangeSearchCheckbox = (evt) => {
    if (evt.target.checked) {
      setMovies(filterFullMovies);
      localStorage.setItem("searchMovies", JSON.stringify(filterFullMovies));
      localStorage.setItem("searchCheckboxIsChecked", evt.target.checked);
      setMoviesIsChecked(evt.target.checked);
    } else {
      setMovies(filterShortMovies);
      localStorage.setItem("searchMovies", JSON.stringify(filterShortMovies));
      localStorage.setItem("searchCheckboxIsChecked", evt.target.checked);
      setMoviesIsChecked(evt.target.checked);
    }
  };

  const handleChangeSearchSaveMoviesCheckbox = (evt) => {
    if (evt.target.checked) {
      setMeSaveMovie(filterSaveFullMovies);
      localStorage.setItem(
        "searchSaveMovies",
        JSON.stringify(filterSaveFullMovies)
      );
      localStorage.setItem(
        "searchSaveMoviesCheckboxIsChecked",
        evt.target.checked
      );
      setSaveMoviesIsChecked(evt.target.checked);
    } else {
      setMeSaveMovie(filterSaveShortMovies);
      localStorage.setItem(
        "searchSaveMovies",
        JSON.stringify(filterSaveShortMovies)
      );
      localStorage.setItem(
        "searchSaveMoviesCheckboxIsChecked",
        evt.target.checked
      );
      setSaveMoviesIsChecked(evt.target.checked);
    }
  };

  React.useEffect(() => {
    if (loggedIn && !searchInputValue) {
      setMovies(filterMovieDuration);
      localStorage.setItem("searchMovies", JSON.stringify(filterMovieDuration));
    }

    if (loggedIn && !searchSaveMoviesInputValue) {
      setMeSaveMovie(filterSaveMovieDuration);
      localStorage.setItem(
        "searchSaveMovies",
        JSON.stringify(filterSaveMovieDuration)
      );
    }

    if (loggedIn) {
      getMe();
    }
  }, [loggedIn, pathname]);

  React.useEffect(() => {
    if (searchMovies) {
      setMoviesIsChecked(searchCheckboxIsChecked);
      setMovies(searchMovies);
      setIsLoading(false);
    } else {
      setMovies(allMovies);
    }

    if (searchSaveMovies) {
      setSaveMoviesIsChecked(searchSaveMoviesCheckboxIsChecked);
      setMeSaveMovie(searchSaveMovies);
      setIsLoading(false);
    } else {
      setMeSaveMovie(filterSaveMovieDuration);
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
                  isSubmitLoading={isSubmitLoading}
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
                  isSubmitLoading={isSubmitLoading}
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
                  isSubmitLoading={isSubmitLoading}
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
                  isSubmitLoading={isSubmitLoading}
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
                  values={values}
                  errors={errors}
                  isValid={isValid}
                  isSubmitLoading={isSubmitLoading}
                  setValues={setValues}
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
          isSubmitLoading={isSubmitLoading}
        />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
