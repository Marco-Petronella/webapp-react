import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'


export default function MoviesList() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/v1/movies')
        .then(response => response.json())
        .then(result => { setMovies(result) })
    }, [])

    return (
    <main>
        <h1> movies list </h1>
        <ul className='row g-2 unstyled-list'> 
            {movies.map((movie) => (
                <li key={movie.id} className='col-3'>
                    <div className='card'>
                        <img src={`/src/assets/images/${movie.image}`} className='card-img-top' alt={movie.title} />
                        <div className='card-body'>
                            <h5 className='card-title'>{movie.title}</h5>
                            <p className='card-text'>{movie.director} {movie.release_year}</p>
                            <p className='card-text'>{movie.abstract}</p>
                            <NavLink to={`/movies/${movie.id}`} className='btn btn-primary'>Details</NavLink>
                        </div>
                    </div>
                </li>
            ))}
            
        </ul>
    </main>
    )
}

