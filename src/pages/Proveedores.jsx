import { useEffect, useState } from 'react'

const API = 'http://localhost:8080/api'

function Modal({ open, onClose, onSave, inicial }) {
  const [form, setForm] = useState(inicial)
  useEffect(() => setForm(inicial), [inicial])
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  if (!open) return null
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,20,35,0.35)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: '12px', padding: '26px', width: '460px', maxWidth: '95vw', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1a1d23' }}>
            {form.idProveedor ? 'Editar proveedor' : 'Nuevo proveedor'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>✕</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '13px' }}>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={lbl}>Nombre de la empresa</label>
            <input style={inp} value={form.nombre || ''} onChange={e => set('nombre', e.target.value)} placeholder="Ej: Belleza Total SAS"/>
          </div>
          <div>
            <label style={lbl}>Teléfono</label>
            <input style={inp} value={form.telefono || ''} onChange={e => set('telefono', e.target.value)} placeholder="+57 300 000 0000"/>
          </div>
          <div>
            <label style={lbl}>Email</label>
            <input style={inp} type="email" value={form.email || ''} onChange={e => set('email', e.target.value)} placeholder="contacto@empresa.co"/>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f0f1f5' }}>
          <button onClick={onClose} style={btnGhost}>Cancelar</button>
          <button onClick={() => onSave(form)} style={btnPrimary}>Guardar proveedor</button>
        </div>
      </div>
    </div>
  )
}

const formVacio = { nombre: '', telefono: '', email: '' }

const iniciales = (nombre) => nombre?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'
const fondosAvatar = ['#eff6ff', '#f0fdf4', '#fdf4ff', '#fff5f5', '#fef9ec', '#f5f3ff']
const coloresAvatar = ['#3b5bdb', '#16a34a', '#7c3aed', '#dc2626', '#d97706', '#4f46e5']

export default function Proveedores() {
  const [proveedores, setProveedores] = useState([])
  const [modal, setModal] = useState(false)
  const [editar, setEditar] = useState(formVacio)
  const [buscar, setBuscar] = useState('')

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
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: form.nombre,
        telefono: form.telefono,
        email: form.email
      })
    })
    cargar()
    setModal(false)
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
    <div>
      <div style={{ background: '#fff', borderBottom: '1px solid #e8eaf0', padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 5 }}>
        <span style={{ fontSize: '15px', fontWeight: '600', color: '#1a1d23' }}>Proveedores</span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" style={{ width: '14px', height: '14px', position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input value={buscar} onChange={e => setBuscar(e.target.value)} placeholder="Buscar proveedor..." style={{ ...inp, paddingLeft: '34px', width: '220px', background: '#f9fafb' }}/>
          </div>
          <button onClick={abrirNuevo} style={btnPrimary}>+ Nuevo proveedor</button>
        </div>
      </div>

      <div style={{ padding: '26px 28px' }}>
        <p style={{ margin: '0 0 16px', color: '#9ca3af', fontSize: '13.5px' }}>{filtrados.length} proveedores registrados</p>
        <div style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: '10px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>
              <th>Empresa</th><th>Teléfono</th><th>Email</th><th></th>
            </tr></thead>
            <tbody>
              {filtrados.map((p, i) => (
                <tr key={p.idProveedor}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: fondosAvatar[i % fondosAvatar.length], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600', color: coloresAvatar[i % coloresAvatar.length] }}>
                        {iniciales(p.nombre)}
                      </div>
                      <span style={{ fontWeight: '500', color: '#1a1d23' }}>{p.nombre}</span>
                    </div>
                  </td>
                  <td style={{ color: '#6b7280' }}>{p.telefono || '—'}</td>
                  <td style={{ color: '#3b5bdb', fontSize: '13px' }}>{p.email || '—'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button onClick={() => abrirEditar(p)} style={btnGhost}>Editar</button>
                      <button onClick={() => eliminar(p.idProveedor)} style={btnDanger}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} onSave={guardar} inicial={editar}/>
    </div>
  )
}

const lbl = { display: 'block', fontSize: '12.5px', color: '#6b7280', marginBottom: '5px', fontWeight: '500' }
const inp = { width: '100%', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '7px', padding: '8px 12px', color: '#1a1d23', fontSize: '13.5px', fontFamily: 'Inter, sans-serif', outline: 'none' }
const btnPrimary = { background: '#3b5bdb', color: '#fff', border: 'none', borderRadius: '7px', padding: '8px 16px', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }
const btnGhost = { background: '#fff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: '7px', padding: '6px 13px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }
const btnDanger = { background: '#fff', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '7px', padding: '6px 13px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }