import Movie from "./components/Movie";
import "./styles.css";
import { useEffect, useState } from "react";

const Featured_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1c40073fce452c87ff4ca4bee5877ecf&page=1";

const Search_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=1c40073fce452c87ff4ca4bee5877ecf&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(Featured_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(Search_API + searchTerm);
      setSearchTerm("");
    } else {
      alert("Enter the name...");
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <img
          src="https://img.icons8.com/ios-filled/2x/26e07f/movies-folder--v2.png"
          alt="box"
        ></img>
        <h2>NetScript</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
          />
        </form>
      </header>

      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
