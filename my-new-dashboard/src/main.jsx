import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // Ye zaroori hai
import './index.css'
import App from './App.jsx'
import MentorsPage from './MentorsPage.jsx' // Jo file humne abhi banayi

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* "/" par Dashboard dikhega */}
        <Route path="/" element={<App />} />
        
        {/* "/find-mentors" par Mentors ki list dikhegi */}
        <Route path="/find-mentors" element={<MentorsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)