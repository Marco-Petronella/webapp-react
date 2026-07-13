import { useState } from 'react'
import Error from './pages/Error.jsx'
import MoviesList from './pages/MoviesList.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DefaultLayout from './assets/DefaultLayout.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<MoviesList />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
