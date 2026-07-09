import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const [movie, setMovie] = useState([]);
  const id = useParams().id;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/v1/movies/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setMovie(result);
        console.log(result);
      })
  }, [id]);

  return (
    <main>
      <h1>Movie Details</h1>
      {movie ? (
        <>
          <h2>{movie[0]?.title}</h2>
          <img src={`/src/assets/images/${movie[0]?.image}`} alt={movie[0]?.title} />
          <p>{movie[0]?.director}</p>
          <p>{movie[0]?.year}</p>
          <p>{movie[0]?.abstract}</p>

          <h3>Reviews</h3>
          {movie.map((review) => (
            <div className="card" key={review.id}>
              <div className="card-body">
                <h5 className="card-title">Revies by: {review.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted ">{review.vote}</h6>
                <p className="card-text">{review.text}</p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
