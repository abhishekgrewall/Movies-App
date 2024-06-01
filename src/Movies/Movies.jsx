import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import ContentLoader from 'react-content-loader';
import "../App.css"; 
import Pagination from "../Pagination/Pagination";

const MovieSkeleton = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={300}s
    viewBox="0 0 300 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="2" ry="2" width="300" height="250" />
    <rect x="0" y="260" rx="2" ry="2" width="300" height="40" />
  </ContentLoader>
);

function Movies() {
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMoviesFound, setIsMoviesFound] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      let url;
      if (searchQuery) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=1765089d00d8e9f1ddca4446029c93ee&query=${searchQuery}&page=${pageNumber}`;
      } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=1765089d00d8e9f1ddca4446029c93ee&sort_by=popularity.desc&page=${pageNumber}`;
      }
      let res = await fetch(url);
      let data = await res.json();
      if (data.results.length > 0) {
        setIsMoviesFound(true);
        setMovieList(data.results);
        setTotalPages(data.total_pages);
      } else {
        setIsMoviesFound(false);
      }
      setIsLoading(false);
    };

    fetchMovies();
  }, [searchQuery, pageNumber]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPageNumber(1);
    let formData = new FormData(e.target);
    let searchValue = formData.get("movie");
    setSearchQuery(searchValue);
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handlePageNumber = (page) => {
    setPageNumber(page);
  };

  return (
    <div><h1 style={{
      margin: "10px",
        padding: "10px",
        fontSize: "32px",
        fontWeight: "800",
        color: "black"}}>Movies</h1>

      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search Movies"
            name="movie"
            style={{ margin: "19px", padding: "12px", fontSize: "15px", width: "300px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" style={{ color: "black", backgroundColor: "white", padding: "13px", fontSize: "13px", border:'2px solid black'}}>
            Search
          </button>
        </form>
      </div>
      {!isMoviesFound && <p>No movies found for the search query.</p>}
      {isLoading ? (
        <div className="movie-list">
          {Array.from({ length: 10 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="movie-list">
          {movieList.map((movie) => (
            <div key={movie.id} className="movie-item" style={{ border: "2px solid white", margin: "10px", padding: "10px" }}>
              <Link to={`/movie/${movie.id}`}>
                <img style={{ width: "300px", height: "250px" }} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              </Link>
              <p style={{ color: "white", margin: "10px", padding: "10px" }}>
                {movie.title} ({movie.release_date.slice(0, 4)})
              </p>
            </div>
          ))}
        </div>
      )}
      <Pagination pageNumber={pageNumber} totalPages={totalPages} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} handlePageNumber={handlePageNumber} />
    </div>
  );
}

export default Movies;
