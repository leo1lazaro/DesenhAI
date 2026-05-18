import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Modules/Login/Login'
import Lobby from './Modules/Lobby/Lobby'
import Game from './Modules/Game/Game'
import { useNavigate } from 'react-router-dom'
import NotFound from './Modules/NotFound/NotFound'

const RouterHandler = () => {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/game" element={<Game />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <RouterHandler />
    </BrowserRouter>
  )
}

export default App