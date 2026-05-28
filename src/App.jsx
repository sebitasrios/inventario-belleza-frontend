import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SearchProvider } from './context/SearchContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Productos from './pages/Productos'
import Categorias from './pages/Categorias'
import Proveedores from './pages/Proveedores'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </SearchProvider>
    </BrowserRouter>
  )
}

export default App