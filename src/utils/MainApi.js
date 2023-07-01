const BASE_URL = "https://api.movies.dmitriyled.nomoredomains.rocks";

export const register = async (name, email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const user = await res.json();
    return res.ok ? user : Promise.reject(user.message);
  } catch (error) {
    console.log(error);
  }
}

export const login = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const user = await res.json();
    return res.ok ? user : Promise.reject(user.message);
  } catch (error) {
    console.log(error);
  }
}

export const checkToken = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await res.json();
    return res.ok ? user : Promise.reject(res.statusText);
  } catch (error) {
    console.log(error);
  }
}

export const editProfile = async (name, email) => {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email })
    });
    const user = await res.json();
    return res.ok ? user : Promise.reject(user.message);
  } catch (error) {
    console.log(error);
  }
}

export const signOut = async () => {
  try {
    const res = await fetch(`${BASE_URL}/signout`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return res.ok ? data : Promise.reject(res.statusText);

  } catch (error) {
    console.log(error);

  }
}

export const getSaveMovies = async () => {
  try {
    const res = await fetch(`${BASE_URL}/movies`, {
      method: "GET",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return res.ok ? data.data : Promise.reject(res.statusText);
  } catch (error) {
    console.log(error);
  }
}

export const saveMovie = async (movie) => {
  try {
    const res = await fetch(`${BASE_URL}/movies`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    const data = await res.json();
    return res.ok ? data.data : Promise.reject(res.statusText);
  } catch (error) {
    console.log(error);
  }
}

export const deleteSaveMovie = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/movies/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return res.ok ? data : Promise.reject(data.message);
  } catch (error) {
    console.log(error);
  }
}
