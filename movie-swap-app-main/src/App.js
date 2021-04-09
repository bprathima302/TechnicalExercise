import "./styles.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCharacterMovies, fetchMovieCharacters } from "./movieActions";
import React from "react";
const App = (props) => {
  const {
    isPageLoading,
    characters = [],
    fetchMovieCharacters,
    getCharacterMovies,
    movies = []
  } = props;
  const [characterId, setCharacterId] = React.useState("");

  React.useEffect(() => {
    fetchMovieCharacters();
  }, []);

  React.useEffect(() => {
    if (characterId) {
      let filmObj = characters.find((item) => item.id === Number(characterId));
      filmObj && getCharacterMovies(filmObj.films);
    }
  }, [characterId]);

  const handleChange = (e) => {
    setCharacterId(e.target.value);
  };
  const getCharacterOptions = () => {
    const options = [];
    options.push(<option className="form-input-item"></option>);
    characters.forEach((character) =>
      options.push(
        <option className="form-input-item" value={character.id}>
          {character.name}
        </option>
      )
    );
    return options;
  };
  // last movie index
  let lastMovieObj = movies[movies.length - 1] || {
    title: "",
    release_date: ""
  };
  return (
    <div className="App">
      {isPageLoading && <div class="center-spinner spinner-border "></div>}
      <div className="col-md-4 margintop-xl">
        <label htmlFor="characters">{"Characters:"}</label>
        <select
          className="form-control"
          id="characters"
          onChange={handleChange}
        >
          {getCharacterOptions()}
        </select>
      </div>
      <div className="col-md-4 margintop-xl">
        <label htmlFor="moviesList">{"List of Movies:"}</label>
        <ul className="list-group" id="moviesList">
          {movies.map((movie) => (
            <li className="list-group-item">{movie.title}</li>
          ))}
        </ul>
      </div>
      <div className="col-md-4 margintop-xl">
        <label>Name / Year last movie:</label>
        <div className="border-bottom">{`${lastMovieObj.title}-${lastMovieObj.release_date}`}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    isPageLoading: state.movieReducer.isPageLoading,
    characters: state.movieReducer.characters,
    movies: state.movieReducer.movies
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCharacterMovies: getCharacterMovies,
      fetchMovieCharacters: fetchMovieCharacters
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(App);
