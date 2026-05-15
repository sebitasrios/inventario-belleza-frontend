import { useEffect, useState } from 'react'
import {
  getCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} from '../services/api'

function Categorias() {
  const [categorias, setCategorias] = useState([])
  const [nombre, setNombre] = useState('')
  const [editando, setEditando] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    cargarCategorias()
  }, [])

  async function cargarCategorias() {
    setCargando(true)
    const data = await getCategorias()
    setCategorias(data)
    setCargando(false)
  }

  async function handleGuardar() {
    if (!nombre.trim()) return
    if (editando) {
      await actualizarCategoria(editando.idCategoria, { nombre })
    } else {
      await crearCategoria({ nombre })
    }
    setNombre('')
    setEditando(null)
    cargarCategorias()
  }

  function handleEditar(categoria) {
    setEditando(categoria)
    setNombre(categoria.nombre)
  }

  async function handleEliminar(id) {
    if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
      await eliminarCategoria(id)
      cargarCategorias()
    }
  }

  function handleCancelar() {
    setEditando(null)
    setNombre('')
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Categorias</h2>

      {/* Formulario */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
          {editando ? 'Editar categoria' : 'Nueva categoria'}
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Nombre de la categoria"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleGuardar}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            {editando ? 'Actualizar' : 'Guardar'}
          </button>
          {editando && (
            <button
              onClick={handleCancelar}
              className="bg-gray-100 text-gray-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr>
                <td colSpan="3" className="text-center py-8 text-gray-400">
                  Cargando...
                </td>
              </tr>
            ) : categorias.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-8 text-gray-400">
                  No hay categorias registradas
                </td>
              </tr>
            ) : (
              categorias.map((cat) => (
                <tr key={cat.idCategoria} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-400">{cat.idCategoria}</td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{cat.nombre}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEditar(cat)}
                      className="text-purple-600 hover:text-purple-800 font-medium mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(cat.idCategoria)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Categorias