import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ZooIdGenerator from './ZooIdGenerator';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ZooIdGenerator />
  </StrictMode>,
)
