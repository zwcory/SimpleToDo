import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from "@vercel/analytics/react";
import '../css/index.css';
import ToDo from "./ToDo.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToDo/>
      <Analytics/>
  </StrictMode>,
)
