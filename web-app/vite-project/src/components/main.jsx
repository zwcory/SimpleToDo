import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../css/index.css'
import ToDo from "./ToDo.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToDo/>
  </StrictMode>,
)
