import { Link, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import octofitLogo from '../../../docs/octofitapp-small.png'
import './App.css'

const sections = [
  { label: 'Activities', path: '/activities', marker: '01' },
  { label: 'Leaderboard', path: '/leaderboard', marker: '02' },
  { label: 'Teams', path: '/teams', marker: '03' },
  { label: 'Users', path: '/users', marker: '04' },
  { label: 'Workouts', path: '/workouts', marker: '05' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/activities">
          <img src={octofitLogo} alt="" />
          <span>OctoFit <strong>Tracker</strong></span>
        </Link>
        <span className="tier-label"><span /> PRESENTATION TIER</span>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <p className="sidebar-label">YOUR TRACKER</p>
          <nav aria-label="Main navigation" className="section-nav">
            {sections.map((section) => (
              <NavLink
                className={({ isActive }) => `section-link${isActive ? ' active' : ''}`}
                key={section.path}
                to={section.path}
              >
                <span className="section-marker">{section.marker}</span>
                {section.label}
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-footer">
            <span className="service-indicator" />
            <span>API workspace</span>
          </div>
        </aside>

        <main className="content">
          <Routes>
            <Route path="/" element={<Navigate replace to="/activities" />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate replace to="/activities" />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
