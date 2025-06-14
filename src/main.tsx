import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
) 