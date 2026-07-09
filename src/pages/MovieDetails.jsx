import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const [movie, setMovie] = useState([]);
  const id = useParams().id;

  useEffect(() => {
    fetch(`http://localhost:3000/v1/movies/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setMovie(result);
      })
  }, [id]);

  return (
    <main>
      <h1>Movie Details</h1>
      {movie ? (
        <>
          <h2>{movie.title}</h2>
          <img src={`/src/assets/images/${movie.image}`} alt={movie.title} />
          <p>{movie.director}</p>
          <p>{movie.year}</p>
          <p>{movie.abstract}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
