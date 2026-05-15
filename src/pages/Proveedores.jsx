import { useEffect, useState } from 'react'

const BASE_URL = 'http://localhost:8080/api'

function Proveedores() {
  const [proveedores, setProveedores] = useState([])
  const [editando, setEditando] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '' })

  useEffect(() => {
    cargarProveedores()
  }, [])

  async function cargarProveedores() {
    setCargando(true)
    const res = await fetch(`${BASE_URL}/proveedores`)
    const data = await res.json()
    setProveedores(data)
    setCargando(false)
  }

  async function handleGuardar() {
    if (!form.nombre.trim()) return
    if (editando) {
      await fetch(`${BASE_URL}/proveedores/${editando.idProveedor}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
    } else {
      await fetch(`${BASE_URL}/proveedores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
    }
    setForm({ nombre: '', telefono: '', email: '' })
    setEditando(null)
    cargarProveedores()
  }

  function handleEditar(p) {
    setEditando(p)
    setForm({ nombre: p.nombre, telefono: p.telefono, email: p.email })
  }

  async function handleEliminar(id) {
    if (confirm('¿Seguro que deseas eliminar este proveedor?')) {
      await fetch(`${BASE_URL}/proveedores/${id}`, { method: 'DELETE' })
      cargarProveedores()
    }
  }

  function handleCancelar() {
    setEditando(null)
    setForm({ nombre: '', telefono: '', email: '' })
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Proveedores</h2>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
          {editando ? 'Editar proveedor' : 'Nuevo proveedor'}
        </h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <input
            type="text"
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            placeholder="Telefono"
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex gap-3 mt-4">
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

      <div className="bg-white rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Telefono</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr><td colSpan="5" className="text-center py-8 text-gray-400">Cargando...</td></tr>
            ) : proveedores.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-8 text-gray-400">No hay proveedores</td></tr>
            ) : (
              proveedores.map((p) => (
                <tr key={p.idProveedor} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-400">{p.idProveedor}</td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{p.nombre}</td>
                  <td className="px-6 py-4 text-gray-600">{p.telefono}</td>
                  <td className="px-6 py-4 text-gray-600">{p.email}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEditar(p)} className="text-purple-600 hover:text-purple-800 font-medium mr-4">Editar</button>
                    <button onClick={() => handleEliminar(p.idProveedor)} className="text-red-500 hover:text-red-700 font-medium">Eliminar</button>
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

export default Proveedores