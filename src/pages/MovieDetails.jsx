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
          <h2>{movie[0].title}</h2>
          <img src={`/src/assets/images/${movie[0].image}`} alt={movie[0].title} />
          <p>{movie[0].director}</p>
          <p>{movie[0].year}</p>
          <p>{movie[0].abstract}</p>

          <h3>Reviews</h3>
          {movie.map((review) => (
            <div class="card" style="width:18rem;">
              <img src="https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <h6 class="card-subtitle mb-2 text-muted ">Card subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                b5
              </div>
            </div>
            // <div key={review.id}>
            //   <p>{review.name}</p>
            //     <p>{review.text}</p>
            //     <p>Rating: {review.vote}</p>
            //     </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
