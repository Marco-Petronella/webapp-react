import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const [movie, setMovie] = useState([]);
  const id = useParams().id;
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    movie_id: id,
    name: "",
    vote: "",
    text: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/v1/movies/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setMovie(result);
        console.log(result);
      })
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/v1/movies/${id}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  }

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
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />  
          </div>

          <div className="mb-3">
          <label htmlFor="text" className="form-label">Text</label>
          <input
            type="text"
            className="form-control"
            id="text"
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          />  
          </div>

          <div className="mb-3">
          <label htmlFor="name" className="form-label">Vote</label>
          <input
            type="text"
            className="form-control"
            id="vote"
            value={formData.vote}
            onChange={(e) => setFormData({ ...formData, vote: e.target.value })}
          />  
          </div>
          <button type="submit" className="btn btn-primary">Add review</button>
      </form>
    </main>
  );
}
