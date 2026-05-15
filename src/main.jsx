import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout.jsx'
import Productos from './pages/Productos.jsx'
import Categorias from './pages/Categorias.jsx'
import Proveedores from './pages/Proveedores.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="productos" element={<Productos />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="proveedores" element={<Proveedores />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)