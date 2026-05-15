import { useEffect, useState } from 'react'

const BASE_URL = 'http://localhost:8080/api'

function Productos() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [cargando, setCargando] = useState(true)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({
    nombre: '', descripcion: '', precio: '', stock: '', stockMinimo: '', idCategoria: '', idProveedor: ''
  })

  useEffect(() => {
    cargarTodo()
  }, [])

  async function cargarTodo() {
    setCargando(true)
    const [p, c, pr] = await Promise.all([
      fetch(`${BASE_URL}/productos`).then(r => r.json()),
      fetch(`${BASE_URL}/categorias`).then(r => r.json()),
      fetch(`${BASE_URL}/proveedores`).then(r => r.json())
    ])
    setProductos(p)
    setCategorias(c)
    setProveedores(pr)
    setCargando(false)
  }

  async function handleGuardar() {
    if (!form.nombre.trim()) return
    const body = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock),
      stockMinimo: parseInt(form.stockMinimo),
      idCategoria: parseInt(form.idCategoria),
      idProveedor: parseInt(form.idProveedor)
    }
    if (editando) {
      await fetch(`${BASE_URL}/productos/${editando.idProducto}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    } else {
      await fetch(`${BASE_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    }
    setForm({ nombre: '', descripcion: '', precio: '', stock: '', stockMinimo: '', idCategoria: '', idProveedor: '' })
    setEditando(null)
    cargarTodo()
  }

  function handleEditar(p) {
    setEditando(p)
    setForm({
      nombre: p.nombre,
      descripcion: p.descripcion || '',
      precio: p.precio,
      stock: p.stock,
      stockMinimo: p.stockMinimo,
      idCategoria: p.idCategoria,
      idProveedor: p.idProveedor
    })
  }

  async function handleEliminar(id) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      await fetch(`${BASE_URL}/productos/${id}`, { method: 'DELETE' })
      cargarTodo()
    }
  }

  function handleCancelar() {
    setEditando(null)
    setForm({ nombre: '', descripcion: '', precio: '', stock: '', stockMinimo: '', idCategoria: '', idProveedor: '' })
  }

  function getNombreCategoria(id) {
    return categorias.find(c => c.idCategoria === id)?.nombre || '-'
  }

  function getNombreProveedor(id) {
    return proveedores.find(p => p.idProveedor === id)?.nombre || '-'
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Productos</h2>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
          {editando ? 'Editar producto' : 'Nuevo producto'}
        </h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input type="text" placeholder="Nombre" value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500" />
          <input type="text" placeholder="Descripcion" value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500" />
          <input type="number" placeholder="Precio" value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500" />
          <input type="number" placeholder="Stock" value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500" />
          <input type="number" placeholder="Stock minimo" value={form.stockMinimo}
            onChange={(e) => setForm({ ...form, stockMinimo: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500" />
          <select value={form.idCategoria}
            onChange={(e) => setForm({ ...form, idCategoria: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500">
            <option value="">Selecciona categoria</option>
            {categorias.map(c => (
              <option key={c.idCategoria} value={c.idCategoria}>{c.nombre}</option>
            ))}
          </select>
          <select value={form.idProveedor}
            onChange={(e) => setForm({ ...form, idProveedor: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500">
            <option value="">Selecciona proveedor</option>
            {proveedores.map(p => (
              <option key={p.idProveedor} value={p.idProveedor}>{p.nombre}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={handleGuardar}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
            {editando ? 'Actualizar' : 'Guardar'}
          </button>
          {editando && (
            <button onClick={handleCancelar}
              className="bg-gray-100 text-gray-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Nombre</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Precio</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Stock</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Categoria</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Proveedor</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr><td colSpan="7" className="text-center py-8 text-gray-400">Cargando...</td></tr>
            ) : productos.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-8 text-gray-400">No hay productos</td></tr>
            ) : (
              productos.map((p) => (
                <tr key={p.idProducto} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4 text-gray-400">{p.idProducto}</td>
                  <td className="px-4 py-4 text-gray-800 font-medium">{p.nombre}</td>
                  <td className="px-4 py-4 text-gray-600">${p.precio.toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      p.stock <= p.stockMinimo
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{getNombreCategoria(p.idCategoria)}</td>
                  <td className="px-4 py-4 text-gray-600">{getNombreProveedor(p.idProveedor)}</td>
                  <td className="px-4 py-4 text-right">
                    <button onClick={() => handleEditar(p)} className="text-purple-600 hover:text-purple-800 font-medium mr-4">Editar</button>
                    <button onClick={() => handleEliminar(p.idProducto)} className="text-red-500 hover:text-red-700 font-medium">Eliminar</button>
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

export default Productos