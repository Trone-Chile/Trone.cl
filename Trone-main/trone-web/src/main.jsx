import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'; // <--- IMPORTANTE: Importar esto
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Envolvemos la App para que el SEO funcione */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)