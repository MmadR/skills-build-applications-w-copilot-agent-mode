import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <main className="container py-5">
      <header className="d-flex flex-wrap align-items-center justify-content-between gap-3 border-bottom pb-3 mb-4">
        <Link className="h3 mb-0 text-decoration-none text-dark" to="/">
          OctoFit Tracker
        </Link>
        <nav aria-label="Navegacao principal" className="d-flex gap-3">
          <Link to="/">Visao geral</Link>
          <Link to="/health">Saude da API</Link>
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <section>
              <h1 className="h2">Acompanhe seu progresso</h1>
              <p className="text-secondary">Sua plataforma de atividades e bem-estar.</p>
            </section>
          }
        />
        <Route
          path="/health"
          element={
            <section>
              <h1 className="h2">Saude da API</h1>
              <p className="text-secondary">API Node.js disponivel em localhost:8000.</p>
            </section>
          }
        />
      </Routes>
    </main>
  )
}

export default App
