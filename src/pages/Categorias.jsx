import { useEffect, useState } from 'react'

const API = 'http://localhost:8080/api'

function Modal({ open, onClose, onSave, inicial }) {
  const [form, setForm] = useState(inicial)
  useEffect(() => setForm(inicial), [inicial])
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  if (!open) return null
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,20,35,0.35)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: '12px', padding: '26px', width: '380px', maxWidth: '95vw', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1a1d23' }}>
            {form.idCategoria ? 'Editar categoría' : 'Nueva categoría'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>✕</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
          <div>
            <label style={lbl}>Nombre</label>
            <input style={inp} value={form.nombre || ''} onChange={e => set('nombre', e.target.value)} placeholder="Ej: Cuidado corporal"/>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f0f1f5' }}>
          <button onClick={onClose} style={btnGhost}>Cancelar</button>
          <button onClick={() => onSave(form)} style={btnPrimary}>Guardar</button>
        </div>
      </div>
    </div>
  )
}

const emojis = ['💄', '🧴', '💆', '💅', '🌸', '🌿', '✨', '🧖']
const fondos = ['#eff6ff', '#fef9ec', '#f0fdf4', '#fff5f5', '#fdf4ff', '#f0fdf4', '#fffbeb', '#f5f3ff']
const formVacio = { nombre: '' }

export default function Categorias() {
  const [categorias, setCategorias] = useState([])
  const [modal, setModal] = useState(false)
  const [editar, setEditar] = useState(formVacio)

  const cargar = () => {
    fetch(`${API}/categorias`).then(r => r.json()).then(setCategorias)
  }

  useEffect(() => { cargar() }, [])

  const abrirNuevo = () => { setEditar(formVacio); setModal(true) }
  const abrirEditar = (c) => { setEditar(c); setModal(true) }

  const guardar = async (form) => {
    const url = form.idCategoria ? `${API}/categorias/${form.idCategoria}` : `${API}/categorias`
    const method = form.idCategoria ? 'PUT' : 'POST'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: form.nombre })
    })
    cargar()
    setModal(false)
  }

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar esta categoría?')) return
    await fetch(`${API}/categorias/${id}`, { method: 'DELETE' })
    setCategorias(prev => prev.filter(c => c.idCategoria !== id))
  }

  return (
    <div>
      <div style={{ background: '#fff', borderBottom: '1px solid #e8eaf0', padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 5 }}>
        <span style={{ fontSize: '15px', fontWeight: '600', color: '#1a1d23' }}>Categorías</span>
        <button onClick={abrirNuevo} style={btnPrimary}>+ Nueva categoría</button>
      </div>

      <div style={{ padding: '26px 28px' }}>
        <p style={{ margin: '0 0 16px', color: '#9ca3af', fontSize: '13.5px' }}>{categorias.length} categorías activas</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {categorias.map((c, i) => (
            <div key={c.idCategoria} style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: '10px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px', marginBottom: '10px' }}>
                <div style={{ width: '38px', height: '38px', background: fondos[i % fondos.length], borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                  {emojis[i % emojis.length]}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#1a1d23' }}>{c.nombre}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>Categoría #{c.idCategoria}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '7px', paddingTop: '12px', borderTop: '1px solid #f0f1f5' }}>
                <button onClick={() => abrirEditar(c)} style={{ ...btnGhost, flex: 1, justifyContent: 'center', fontSize: '12.5px' }}>Editar</button>
                <button onClick={() => eliminar(c.idCategoria)} style={{ ...btnDanger, fontSize: '12.5px' }}>Eliminar</button>
              </div>
            </div>
          ))}
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