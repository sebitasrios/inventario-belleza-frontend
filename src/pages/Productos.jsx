import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = 'http://localhost:8080/api'

const badge = (texto, tipo) => {
  const estilos = {
    blue:   { background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe' },
    green:  { background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' },
    red:    { background: 'var(--coral-light)', color: 'var(--coral-dark)', border: '1px solid #f5d5cd' },
    yellow: { background: '#fffbeb', color: '#92400e', border: '1px solid #fde68a' },
  }
  return (
    <span style={{ ...estilos[tipo], display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '500' }}>
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
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(26,31,110,0.25)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '14px', padding: '28px', width: '480px', maxWidth: '95vw', boxShadow: '0 16px 48px rgba(26,31,110,0.12)', animation: 'fadeInUp 0.25s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>
            {form.idProducto ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', fontSize: '18px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--coral)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light)'}
          >✕</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={lbl}>Nombre</label>
            <input style={inp} value={form.nombre || ''} onChange={e => set('nombre', e.target.value)} placeholder="Ej: Crema hidratante SPF50"
              onFocus={e => e.target.style.borderColor = 'var(--coral)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}/>
          </div>
          <div>
            <label style={lbl}>Precio</label>
            <input style={inp} type="number" value={form.precio || ''} onChange={e => set('precio', e.target.value)} placeholder="0"
              onFocus={e => e.target.style.borderColor = 'var(--coral)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}/>
          </div>
          <div>
            <label style={lbl}>Stock actual</label>
            <input style={inp} type="number" value={form.stock || ''} onChange={e => set('stock', e.target.value)} placeholder="0"
              onFocus={e => e.target.style.borderColor = 'var(--coral)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}/>
          </div>
          <div>
            <label style={lbl}>Stock mínimo</label>
            <input style={inp} type="number" value={form.stockMinimo || ''} onChange={e => set('stockMinimo', e.target.value)} placeholder="5"
              onFocus={e => e.target.style.borderColor = 'var(--coral)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}/>
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '22px', paddingTop: '18px', borderTop: '1px solid var(--border)' }}>
          <button onClick={onClose} style={btnGhost}>Cancelar</button>
          <button onClick={() => onSave(form)} style={btnPrimary}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--coral-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--coral)'}
          >Guardar producto</button>
        </div>
      </div>
    </div>
  )
}

const formVacio = { nombre: '', precio: '', stock: '', stockMinimo: '', idCategoria: '', idProveedor: '' }

export default function Productos() {
  const navigate = useNavigate()
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
      nombre: form.nombre, descripcion: form.descripcion || '',
      precio: parseFloat(form.precio), stock: parseInt(form.stock),
      stockMinimo: parseInt(form.stockMinimo),
      idCategoria: parseInt(form.idCategoria),
      idProveedor: parseInt(form.idProveedor)
    }
    const url = form.idProducto ? `${API}/productos/${form.idProducto}` : `${API}/productos`
    const method = form.idProducto ? 'PUT' : 'POST'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    cargar(); setModal(false)
  }

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return
    await fetch(`${API}/productos/${id}`, { method: 'DELETE' })
    setProductos(prev => prev.filter(p => p.idProducto !== id))
  }

  const filtrados = productos.filter(p => p.nombre?.toLowerCase().includes(buscar.toLowerCase()))

  return (
    <div className="fade-in">
      {/* Topbar */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>Productos</h2>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-light)' }}>{filtrados.length} productos registrados</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" style={{ width: '14px', height: '14px', position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input value={buscar} onChange={e => setBuscar(e.target.value)} placeholder="Buscar producto..." style={{ ...inp, paddingLeft: '34px', width: '220px', background: 'var(--cream)' }}
              onFocus={e => e.target.style.borderColor = 'var(--coral)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}/>
          </div>
          <button onClick={abrirNuevo} style={btnPrimary}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--coral-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--coral)'}
          >+ Nuevo producto</button>
        </div>
      </div>

      <div style={{ padding: '24px 28px' }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
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
                    <td style={{ fontWeight: '500', color: 'var(--navy)' }}>{p.nombre}</td>
                    <td style={{ fontWeight: '500', color: 'var(--coral)' }}>${p.precio?.toLocaleString()}</td>
                    <td style={{ color: 'var(--text-mid)' }}>{p.stock}</td>
                    <td>{badge(cat?.nombre || '—', 'blue')}</td>
                    <td style={{ color: 'var(--text-mid)' }}>{prov?.nombre || '—'}</td>
                    <td>{p.stock <= p.stockMinimo ? badge('Stock bajo', 'red') : badge('Activo', 'green')}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button onClick={() => abrirEditar(p)} style={btnGhost}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--navy)'; e.currentTarget.style.color = 'var(--navy)' }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-mid)' }}
                        >Editar</button>
                        <button onClick={() => eliminar(p.idProducto)} style={btnDanger}
                          onMouseEnter={e => { e.currentTarget.style.background = 'var(--coral-light)' }}
                          onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}
                        >Eliminar</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Volver */}
      <div style={{ padding: '0 28px 28px' }}>
        <button onClick={() => navigate('/')} style={{ ...btnGhost, gap: '6px' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--coral)'; e.currentTarget.style.color = 'var(--coral)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-mid)' }}
        >← Volver al Dashboard</button>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} onSave={guardar}
        categorias={categorias} proveedores={proveedores} inicial={editar}/>
    </div>
  )
}

const lbl = { display: 'block', fontSize: '12px', color: 'var(--text-mid)', marginBottom: '5px', fontWeight: '500' }
const inp = { width: '100%', background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', padding: '9px 12px', color: 'var(--text-dark)', fontSize: '13.5px', fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'border-color 0.2s' }
const btnPrimary = { background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s ease' }
const btnGhost = { background: '#fff', color: 'var(--text-mid)', border: '1px solid var(--border)', borderRadius: '8px', padding: '7px 14px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease', display: 'inline-flex', alignItems: 'center' }
const btnDanger = { background: '#fff', color: 'var(--coral-dark)', border: '1px solid var(--coral-light)', borderRadius: '8px', padding: '7px 14px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease' }