import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import GlobalLoaderContext from "../assets/context/GlobalLoaderContext";
import { Infinity } from "ldrs/react";
import "ldrs/react/Infinity.css";

export default function MovieDetails() {
  const { loader, setLoader } = useContext(GlobalLoaderContext);
  const [loadedImage, setLoadedImage] = useState(false);
  const [movie, setMovie] = useState([]);
  const id = useParams().id;
  const [reviews, setReviews] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    movie_id: id,
    name: "",
    vote: "",
    text: "",
  });

  function resetFormData() {
    setFormData({
      movie_id: id,
      name: "",
      vote: "",
      text: "",
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.name == "") {
      formData.name = "Anonymous";
    }
    if (formData.vote == "" || formData.vote < 1 || formData.vote > 5) {
      alert("Vote must be a number between 1 and 5");
      return;
    }
    fetch(`http://localhost:3000/v1/movies/${id}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setFormSubmitted(prev => !prev)
    resetFormData();
  }

  function drawStars(vote) {
    const stars = [];
    for (let i = 0; i <= 5; i++) {
      if (i < vote) stars.push(<i key={i} className="bi bi-star-fill"></i>);
      else stars.push(<i key={i} className="bi bi-star"></i>);
    }
    return stars;
  }

  useEffect(() => {
    fetch(`http://localhost:3000/v1/movies/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setMovie(result);
        console.log(result);
      });
  }, [formSubmitted]);

  return (
    <main>
      <h1>Movie Details</h1>

      {movie ? (
        <>
          <section className="movie-info-section">
            <div className="poster-container">
              {loader && !loadedImage && (
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
                className="poster"
                src={`/src/assets/images/${movie[0]?.image}`}
                alt={movie.title}
                onLoad={() => setLoadedImage(true)}
              />
            </div>

            <div className="movie-detail-section">

              <h2>{movie[0]?.title}</h2>
              <p><strong>Director: </strong>{movie[0]?.director}</p>
              <p><strong>Release Year: </strong>{movie[0]?.release_year}</p>
              <p>{movie[0]?.abstract}</p>
            
            </div>
          
          </section>

          <section className="reviews-section">
            <h3>Reviews</h3>

            <div className="reviews-list d-flex flex-wrap gap-4 justify-content-center">
              {movie.map((review) => (
                <div className="review-card card col-3" key={review.id}>
                  <div className="card-body">
                    <h5 className="card-title">Reviews by: {review.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted ">

                      {drawStars(review.vote)}

                    </h6>
                    <p className="card-text">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
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


      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Text
          </label>
          <input
            type="text"
            className="form-control"
            id="text"
            placeholder="Enter your review"
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Vote
          </label>
          <input
            type="number"
            className="form-control"
            id="vote"
            placeholder="Enter your vote (1-5)"
            value={formData.vote}
            onChange={(e) => setFormData({ ...formData, vote: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add review
        </button>
      </form>
    </main>
  );
}
