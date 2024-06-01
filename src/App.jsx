import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom'; 
import './App.css';
import Movies from './Movies/Movies';
import Trending from './Movies/Trending';
import TopRated from './Movies/TopRated';
import MovieDetails from './Movies/MovieDetails'; 
function App() {
  return (
    <Router>
      <div className="centered-container">
        <h1 id='h1' style={{ fontSize:70,}}>
        𝐌𝐎𝐕𝐈𝐄𝐒 𝐂𝐀𝐆𝐄
        </h1>
        <nav className='Nav'>
          <ul>
           
            <li>
            <Link to="/movies" className='Names'>Movies</Link>


            </li>
            <li>
              <Link to="/trending" className='Names'>Trending</Link>
            </li>
            <li>
              <Link to="/top-rated" className='Names'>Top Rated</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
