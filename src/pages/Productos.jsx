import { useEffect, useState } from 'react'

const API = 'http://localhost:8080/api'

const badge = (texto, tipo) => {
  const estilos = {
    blue:  { background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' },
    green: { background: '#f0faf4', color: '#16a34a', border: '1px solid #bbf7d0' },
    red:   { background: '#fff5f5', color: '#dc2626', border: '1px solid #fecaca' },
    yellow:{ background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a' },
  }
  return (
    <span style={{ ...estilos[tipo], display: 'inline-flex', alignItems: 'center', padding: '2px 9px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '500' }}>
      {texto}
    </span>
  )
}

function Modal({ open, onClose, onSave, categorias, proveedores, inicial }) {
  const [form, setForm] = useState(inicial)
  useEffect(() => setForm(inicial), [inicial])
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  if (!open) return null
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,20,35,0.35)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: '12px', padding: '26px', width: '460px', maxWidth: '95vw', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1a1d23' }}>
            {form.idProducto ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>✕</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '13px' }}>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={lbl}>Nombre</label>
            <input style={inp} value={form.nombre || ''} onChange={e => set('nombre', e.target.value)} placeholder="Ej: Crema hidratante SPF50"/>
          </div>
          <div>
            <label style={lbl}>Precio</label>
            <input style={inp} type="number" value={form.precio || ''} onChange={e => set('precio', e.target.value)} placeholder="0"/>
          </div>
          <div>
            <label style={lbl}>Stock actual</label>
            <input style={inp} type="number" value={form.stock || ''} onChange={e => set('stock', e.target.value)} placeholder="0"/>
          </div>
          <div>
            <label style={lbl}>Stock mínimo</label>
            <input style={inp} type="number" value={form.stockMinimo || ''} onChange={e => set('stockMinimo', e.target.value)} placeholder="5"/>
          </div>
          <div>
            <label style={lbl}>Categoría</label>
            <select style={inp} value={form.idCategoria || ''} onChange={e => set('idCategoria', e.target.value)}>
              <option value="">Seleccionar...</option>
              {categorias.map(c => <option key={c.idCategoria} value={c.idCategoria}>{c.nombre}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={lbl}>Proveedor</label>
            <select style={inp} value={form.idProveedor || ''} onChange={e => set('idProveedor', e.target.value)}>
              <option value="">Seleccionar...</option>
              {proveedores.map(p => <option key={p.idProveedor} value={p.idProveedor}>{p.nombre}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f0f1f5' }}>
          <button onClick={onClose} style={btnGhost}>Cancelar</button>
          <button onClick={() => onSave(form)} style={btnPrimary}>Guardar producto</button>
        </div>
      </div>
    </div>
  )
}

const formVacio = { nombre: '', precio: '', stock: '', stockMinimo: '', idCategoria: '', idProveedor: '' }

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [modal, setModal] = useState(false)
  const [editar, setEditar] = useState(formVacio)
  const [buscar, setBuscar] = useState('')


  const cargar = () => {
    fetch(`${API}/productos`).then(r => r.json()).then(setProductos)
    fetch(`${API}/categorias`).then(r => r.json()).then(setCategorias)
    fetch(`${API}/proveedores`).then(r => r.json()).then(setProveedores)
  }

  useEffect(() => { cargar() }, [])

  const abrirNuevo = () => { setEditar(formVacio); setModal(true) }
  const abrirEditar = (p) => { setEditar(p); setModal(true) }

  const guardar = async (form) => {
    const body = {
      nombre: form.nombre,
      descripcion: form.descripcion || '',
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock),
      stockMinimo: parseInt(form.stockMinimo),
      idCategoria: parseInt(form.idCategoria),
      idProveedor: parseInt(form.idProveedor)
    }
    const url = form.idProducto ? `${API}/productos/${form.idProducto}` : `${API}/productos`
    const method = form.idProducto ? 'PUT' : 'POST'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    cargar()
    setModal(false)
  }

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return
    await fetch(`${API}/productos/${id}`, { method: 'DELETE' })
    setProductos(prev => prev.filter(p => p.idProducto !== id))
  }

  const filtrados = productos.filter(p =>
    p.nombre?.toLowerCase().includes(buscar.toLowerCase())
  )

  return (
    <div>
      <div style={{ background: '#fff', borderBottom: '1px solid #e8eaf0', padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 5 }}>
        <span style={{ fontSize: '15px', fontWeight: '600', color: '#1a1d23' }}>Productos</span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" style={{ width: '14px', height: '14px', position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input value={buscar} onChange={e => setBuscar(e.target.value)} placeholder="Buscar producto..." style={{ ...inp, paddingLeft: '34px', width: '220px', background: '#f9fafb' }}/>
          </div>
          <button onClick={abrirNuevo} style={btnPrimary}>+ Nuevo producto</button>
        </div>
      </div>

      <div style={{ padding: '26px 28px' }}>
        <p style={{ margin: '0 0 16px', color: '#9ca3af', fontSize: '13.5px' }}>{filtrados.length} productos registrados</p>
        <div style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: '10px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>
              <th>Nombre</th><th>Precio</th><th>Stock</th>
              <th>Categoría</th><th>Proveedor</th><th>Estado</th><th></th>
            </tr></thead>
            <tbody>
              {filtrados.map(p => {
                const cat = categorias.find(c => c.idCategoria === p.idCategoria)
                const prov = proveedores.find(v => v.idProveedor === p.idProveedor)
                return (
                  <tr key={p.idProducto}>
                    <td style={{ fontWeight: '500', color: '#1a1d23' }}>{p.nombre}</td>
                    <td style={{ fontWeight: '500', color: '#3b5bdb' }}>${p.precio?.toLocaleString()}</td>
                    <td>{p.stock}</td>
                    <td>{badge(cat?.nombre || '—', 'blue')}</td>
                    <td style={{ color: '#6b7280' }}>{prov?.nombre || '—'}</td>
                    <td>{p.stock <= p.stockMinimo ? badge('Stock bajo', 'red') : badge('Activo', 'green')}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button onClick={() => abrirEditar(p)} style={btnGhost}>Editar</button>
                        <button onClick={() => eliminar(p.idProducto)} style={btnDanger}>Eliminar</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} onSave={guardar}
        categorias={categorias} proveedores={proveedores} inicial={editar}/>
    </div>
  )
}

const lbl = { display: 'block', fontSize: '12.5px', color: '#6b7280', marginBottom: '5px', fontWeight: '500' }
const inp = { width: '100%', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '7px', padding: '8px 12px', color: '#1a1d23', fontSize: '13.5px', fontFamily: 'Inter, sans-serif', outline: 'none' }
const btnPrimary = { background: '#3b5bdb', color: '#fff', border: 'none', borderRadius: '7px', padding: '8px 16px', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }
const btnGhost = { background: '#fff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: '7px', padding: '6px 13px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }
const btnDanger = { background: '#fff', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '7px', padding: '6px 13px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }