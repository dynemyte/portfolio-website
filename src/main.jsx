import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing'
import Login from './pages/login'
import AppLayout from './pages/app'
import Dashboard from './pages/dashboard'
import Alerts from './pages/alerts'
import Operations from './pages/operations'
import Operatives from './pages/operatives'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="operations" element={<Operations />} />
          <Route path="operatives" element={<Operatives />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
