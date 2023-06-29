const BASE_URL = "https://api.movies.dmitriyled.nomoredomains.rocks";

export const register = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  const user = await res.json();
  return user;
}

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const user = await res.json();
  return user;
}

export const checkToken = async () => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  });
  const user = await res.json();
  return user;
}

export const editProfile = async (name, email) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email })
  });
  const user = await res.json();
  return user;
}

export const signOut = async () => {
  const res = await fetch(`${BASE_URL}/signout`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export const getSaveMovies = async () => {
  const res = await fetch(`${BASE_URL}/movies`, {
    method: "GET",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data.data;
}

export const saveMovie = async (movie) => {
  const res = await fetch(`${BASE_URL}/movies`, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });
  const data = await res.json();
  return data.data;
}

export const deleteSaveMovie = async (id) => {
  const res = await fetch(`${BASE_URL}/movies/${id}`, {
    method: "DELETE",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}
