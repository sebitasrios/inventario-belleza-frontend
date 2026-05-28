import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../context/SearchContext'

const API = 'http://localhost:8080/api'

function Modal({ open, onClose, onSave, inicial }) {
  const [form, setForm] = useState(inicial)
  useEffect(() => setForm(inicial), [inicial])
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  if (!open) return null
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(26,31,110,0.25)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '14px', padding: '28px', width: '480px', maxWidth: '95vw', boxShadow: '0 16px 48px rgba(26,31,110,0.12)', animation: 'fadeInUp 0.25s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>
            {form.idProveedor ? 'Editar proveedor' : 'Nuevo proveedor'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', fontSize: '18px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--coral)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light)'}
          >✕</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={lbl}>Nombre de la empresa</label>
            <input style={inp} value={form.nombre || ''} onChange={e => set('nombre', e.target.value)} placeholder="Ej: Belleza Total SAS"
              onFocus={e => e.target.style.borderColor = 'var(--coral)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}/>
          </div>
          <div>
            <label style={lbl}>Teléfono</label>
            <input style={inp} value={form.telefono || ''} onChange={e => set('telefono', e.target.value)} placeholder="+57 300 000 0000"
              onFocus={e => e.target.style.borderColor = 'var(--coral)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}/>
          </div>
          <div>
            <label style={lbl}>Email</label>
            <input style={inp} type="email" value={form.email || ''} onChange={e => set('email', e.target.value)} placeholder="contacto@empresa.co"
              onFocus={e => e.target.style.borderColor = 'var(--coral)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}/>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '22px', paddingTop: '18px', borderTop: '1px solid var(--border)' }}>
          <button onClick={onClose} style={btnGhost}>Cancelar</button>
          <button onClick={() => onSave(form)} style={btnPrimary}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--coral-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--coral)'}
          >Guardar proveedor</button>
        </div>
      </div>
    </div>
  )
}

const formVacio = { nombre: '', telefono: '', email: '' }
const iniciales = (nombre) => nombre?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'
const fondosAvatar = ['#faf6f0', '#f0f4ff', '#fff5f5', '#f0fdf4', '#fdf4ff']
const coloresAvatar = ['var(--coral)', 'var(--navy)', 'var(--coral-dark)', '#16a34a', '#7c3aed']

export default function Proveedores() {
  const navigate = useNavigate()
  const [proveedores, setProveedores] = useState([])
  const [modal, setModal] = useState(false)
  const [editar, setEditar] = useState(formVacio)
  const { query: buscar } = useSearch()

  const cargar = () => {
    fetch(`${API}/proveedores`).then(r => r.json()).then(setProveedores)
  }

  useEffect(() => { cargar() }, [])

  const abrirNuevo = () => { setEditar(formVacio); setModal(true) }
  const abrirEditar = (p) => { setEditar(p); setModal(true) }

  const guardar = async (form) => {
    const url = form.idProveedor ? `${API}/proveedores/${form.idProveedor}` : `${API}/proveedores`
    const method = form.idProveedor ? 'PUT' : 'POST'
    await fetch(url, {
      method, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: form.nombre, telefono: form.telefono, email: form.email })
    })
    cargar(); setModal(false)
  }

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar este proveedor?')) return
    await fetch(`${API}/proveedores/${id}`, { method: 'DELETE' })
    setProveedores(prev => prev.filter(p => p.idProveedor !== id))
  }

  const filtrados = proveedores.filter(p =>
    p.nombre?.toLowerCase().includes(buscar.toLowerCase())
  )

  return (
    <div className="fade-in">
      {/* Topbar */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>Proveedores</h2>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-light)' }}>{filtrados.length} proveedores registrados</p>
        </div>
        <button onClick={abrirNuevo} style={btnPrimary}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--coral-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--coral)'}
        >+ Nuevo proveedor</button>
      </div>

      <div style={{ padding: '24px 28px' }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>
              <th>Empresa</th><th>Teléfono</th><th>Email</th><th></th>
            </tr></thead>
            <tbody>
              {filtrados.map((p, i) => (
                <tr key={p.idProveedor}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: fondosAvatar[i % fondosAvatar.length], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600', color: coloresAvatar[i % coloresAvatar.length], border: '1px solid var(--border)', flexShrink: 0 }}>
                        {iniciales(p.nombre)}
                      </div>
                      <span style={{ fontWeight: '500', color: 'var(--navy)' }}>{p.nombre}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-mid)' }}>{p.telefono || '—'}</td>
                  <td style={{ color: 'var(--coral)', fontSize: '13px' }}>{p.email || '—'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button onClick={() => abrirEditar(p)} style={btnGhost}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--navy)'; e.currentTarget.style.color = 'var(--navy)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-mid)' }}
                      >Editar</button>
                      <button onClick={() => eliminar(p.idProveedor)} style={btnDanger}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--coral-light)'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                      >Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
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

      <Modal open={modal} onClose={() => setModal(false)} onSave={guardar} inicial={editar}/>
    </div>
  )
}

const lbl = { display: 'block', fontSize: '12px', color: 'var(--text-mid)', marginBottom: '5px', fontWeight: '500' }
const inp = { width: '100%', background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', padding: '9px 12px', color: 'var(--text-dark)', fontSize: '13.5px', fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'border-color 0.2s' }
const btnPrimary = { background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s ease' }
const btnGhost = { background: '#fff', color: 'var(--text-mid)', border: '1px solid var(--border)', borderRadius: '8px', padding: '7px 14px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease', display: 'inline-flex', alignItems: 'center' }
const btnDanger = { background: '#fff', color: 'var(--coral-dark)', border: '1px solid var(--coral-light)', borderRadius: '8px', padding: '7px 14px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease' }