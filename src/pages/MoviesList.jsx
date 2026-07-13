import { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import GlobalLoaderContext from "../assets/context/GlobalLoaderContext";
import { Infinity } from "ldrs/react";
import "ldrs/react/Infinity.css";


export default function MoviesList() {
    const [movies, setMovies] = useState([])
    const {loader, setLoader } = useContext(GlobalLoaderContext);
    const [loadedImages, setLoadedImages] = useState([])

    const handleImageLoad = (id) => {
        setLoadedImages(prev => [...prev, id])
    }

    useEffect(() => {
        fetch('http://localhost:3000/v1/movies')
        .then(response => response.json())
        .then(result => { setMovies(result) })
    }, [])

    return (
    <main className='movies-catalog'>
        <h1>🎬 Movies</h1>
         {loader && movies.length == 0 && (
                <div className="d-flex justify-content-center align-items-center">
                  <Infinity
                    size="55"
                    stroke="4"
                    strokeLength="0.15"
                    bgOpacity="0.1"
                    speed="1.3"
                    color="black"
                  />
                </div>
              )}
        <ul className='row g-4 list-unstyled'> 
            {movies ? (
            movies.map((movie) => (
                <li key={movie.id} className='col-12 col-md-6 col-lg-3'>
                    <div className='card card-movie'>
                         <div className="image-container">
                                {loader && !loadedImages.includes(movie.id) && (
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Infinity
                                            size="55"
                                            stroke="4"
                                            strokeLength="0.15"
                                            bgOpacity="0.1"
                                            speed="1.3"
                                            color="black"
                                        />
                                    </div>
                                )}
                                <img
                                    src={`/src/assets/images/${movie.image}`}
                                    className={`card-img-top ${loadedImages.includes(movie.id) ? '' : 'd-none'}`}
                                    alt={movie.title}
                                    onLoad={() => handleImageLoad(movie.id)}
                                />
                            </div>
                        <div className='card-body'>
                            <h5 className='card-title'>{movie.title}</h5>
                            <p className='card-text'>{movie.director} {movie.release_year}</p>
                            <p className='card-text'>{movie.abstract}</p>
                            <NavLink to={`/movies/${movie.id}`} className='btn btn-primary btn-fill'>Details</NavLink>
                        </div>
                    </div>
                </li>
            ))
        ) : loader ? (
        <Infinity
          size="55"
          stroke="4"
          strokeLength="0.15"
          bgOpacity="0.1"
          speed="1.3"
          color="black"
        />
      ) : (
        <p>caricamento in corso</p>
      )}
            
        </ul>
    </main>
    )
}


