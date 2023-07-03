export const BASE_URL = 'https://api.nomoreparties.co';

export const getMovies = async () => {
  const res = await fetch(`${BASE_URL}/beatfilm-movies`, {
    'Content-Type': 'application/json'
  });
  const data = await res.json();
  return res.ok ? data : Promise.reject(res.statusText);
}