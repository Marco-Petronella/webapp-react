import { useState } from 'react'
import Home from './pages/Home.jsx'
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
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
