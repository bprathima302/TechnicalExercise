const INTIAL_STATE = {
  isPageLoading: false
};
export const movieReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_MOVIE_PENDING":
      return {
        ...state,
        isPageLoading: true
      };
    case "FETCH_MOVIE_SUCCESS":
      let sortedMovies = action.payload.movies.sort(
        (a, b) => a.release_date - b.release_date
      );
      let moviesListState = {
        ...state,
        movies: sortedMovies,
        isPageLoading: false
      };
      return moviesListState;
    case "FETCH_MOVIE_FAILURE":
      return {
        ...state,
        isPageLoading: false
      };
    case "FETCH_MOVIE_CHARACTERS_PENDING":
      return {
        ...state,
        isPageLoading: true
      };
    case "FETCH_MOVIE_CHARACTERS_SUCCESS":
      let charactersWithId = action.payload.characters.map((item, counter) => ({
        ...item,
        id: counter + 1
      }));
      let newState = {
        ...state,
        characters: charactersWithId,
        isPageLoading: false
      };
      return newState;
    case "FETCH_MOVIE_CHARACTERS_FAILURE":
      return {
        ...state,
        isPageLoading: false
      };
    default:
      return state;
  }
};
