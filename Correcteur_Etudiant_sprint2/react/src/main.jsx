import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import './assets/css/App.css'
import './assets/css/Navbar.css'
import './assets/css/Global.css'
import './assets/css/Home.css'
import './assets/css/Logo.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
