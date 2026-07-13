import { useNavigate } from "react-router-dom"

export default function Error() {
    const navigate = useNavigate()
    return (
        <main className="movies-catalog">
            <h1>Wrong page url </h1>
            <button className="btn btn-primary" onClick={() => navigate(-1)}>Go back</button>
        </main>
    )
}