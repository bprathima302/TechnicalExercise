const API_URL = "https://swapi.dev/api";

export const getCharacterMovies = (moviesUrls) => {
  console.log(moviesUrls);

  return (dispatch) => {
    dispatch({ type: "FETCH_MOVIE_PENDING" });
    const fetchJson = (url) => fetch(url).then((res) => res.json());
    Promise.all(moviesUrls.map(fetchJson)).then((movies) =>
      dispatch({ type: "FETCH_MOVIE_SUCCESS", payload: { movies } })
    );
  };
};

export const fetchMovieCharacters = () => {
  return (dispatch) => {
    dispatch({ type: "FETCH_MOVIE_CHARACTERS_PENDING" });
    return fetch(`${API_URL}/people`)
      .then((res) => res.json())
      .then((res) => res.results)
      .then((characters) =>
        dispatch({
          type: "FETCH_MOVIE_CHARACTERS_SUCCESS",
          payload: { characters }
        })
      )
      .catch((error) => {
        dispatch({ type: "FETCH_MOVIE_CHARACTERS_FAILURE" });
      });
  };
};
