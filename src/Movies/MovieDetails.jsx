import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

function MovieDetails() {
  let { id } = useParams();
  let [movieDetails, setMovieDetails] = useState({});
  let [cast, setCast] = useState([]);
  let [trailer, setTrailer] = useState("");
  let [isLoading, setIsLoading] = useState(true);
  let [thirdPartyCookiesBlocked, setThirdPartyCookiesBlocked] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      let res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=1765089d00d8e9f1ddca4446029c93ee`);
      let data = await res.json();
      setMovieDetails(data);
    };

    const fetchCast = async () => {
      let res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=1765089d00d8e9f1ddca4446029c93ee`);
      let data = await res.json();
      setCast(data.cast);
    };

    const fetchTrailer = async () => {
      let res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=1765089d00d8e9f1ddca4446029c93ee`);
      let data = await res.json();
      let trailerData = data.results.find(video => video.type === "Trailer");
      setTrailer(trailerData ? `https://www.youtube.com/embed/${trailerData.key}` : "");
    };

    const fetchData = async () => {
      await Promise.all([fetchMovieDetails(), fetchCast(), fetchTrailer()]);
      setIsLoading(false);
    };

    fetchData();

    const checkThirdPartyCookies = () => {
      const cookieTest = 'cookie-test=1';
      document.cookie = cookieTest;
      const thirdPartyCookiesEnabled = document.cookie.includes(cookieTest);
      if (!thirdPartyCookiesEnabled) {
        setThirdPartyCookiesBlocked(true);
      }
      
      document.cookie = `${cookieTest}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    };

    checkThirdPartyCookies();

  }, [id]);

  return (
    <div>
      <div className={thirdPartyCookiesBlocked ? "overlay" : ""}></div>
      {thirdPartyCookiesBlocked ? (
        <div className="full-screen-message">
          <h1>Third-Party Cookies Blocked</h1>
          <p>Please enable third-party cookies to access the content.</p>
        </div>
      ) : (
        <div className={`fade-in ${!isLoading ? 'show' : ''}`}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <h1 className="Tittle" style={{color:'tomato'}}>{movieDetails.title}</h1>
              <div className="movie-details">
                <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
                <div className="movie-info">
                  <h2>Overview</h2>
                  <p>{movieDetails.overview}</p>
                  <h3>Release Date: {movieDetails.release_date}</h3>
                  <h3>Rating: {movieDetails.vote_average}</h3>
                </div>
                {trailer && (
                  <div className="trailer-container">
                    <iframe
                      width="400"
                      height="500"
                      src={trailer}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <p style={{ color: 'black', fontFamily: 'inherit', fontSize: 40, fontWeight:800 ,textDecoration:'underline'  }}>
                      Watch the Trailer
                    </p>
                  </div>
                )}
              </div>
              <h2 className="h2">Cast</h2>
              <div className="cast-list">
                {cast.map((member) => (
                  <div key={member.cast_id} className="cast-item" style={{ border: "2px solid white", margin: "10px", padding: "10px" }}>
                    <img src={`https://image.tmdb.org/t/p/w200${member.profile_path}`} alt={member.name} />
                    <p>{member.name}</p>
                    <p>as {member.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
