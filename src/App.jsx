import {Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Perfil from './pages/Perfil'
import NotFound from './pages/NotFound'
import { useState } from 'react'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App