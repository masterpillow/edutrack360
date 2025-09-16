import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { api } from './lib/api'

function App() {
  const [version, setVersion] = React.useState<any>(null)
  React.useEffect(() => {
    api.get('/version').then(r => setVersion(r.data)).catch(()=>{})
  }, [])
  return (
    <div style={{ fontFamily: 'system-ui', padding: 16 }}>
      <h1>EduTrack360</h1>
      <nav style={{ display: 'flex', gap: 12 }}>
        <Link to="/">Dashboard</Link>
        <Link to="/courses">Courses</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Dashboard {version && <code>{JSON.stringify(version)}</code>}</div>} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </div>
  )
}

function Courses() {
  const [courses, setCourses] = React.useState<any[]>([])
  React.useEffect(() => {
    api.get('/api/courses').then(r => setCourses(r.data)).catch(()=>{})
  }, [])
  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map(c => <li key={c.id}>{c.code} — {c.title}</li>)}
      </ul>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
