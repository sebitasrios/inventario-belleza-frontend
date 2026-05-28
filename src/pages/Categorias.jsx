import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = 'http://localhost:8080/api'

function Modal({ open, onClose, onSave, inicial }) {
  const [form, setForm] = useState(inicial)
  useEffect(() => setForm(inicial), [inicial])
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  if (!open) return null
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(26,31,110,0.25)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '14px', padding: '28px', width: '400px', maxWidth: '95vw', boxShadow: '0 16px 48px rgba(26,31,110,0.12)', animation: 'fadeInUp 0.25s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>
            {form.idCategoria ? 'Editar categoría' : 'Nueva categoría'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', fontSize: '18px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--coral)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light)'}
          >✕</button>
        </div>
        <div>
          <label style={lbl}>Nombre</label>
          <input style={inp} value={form.nombre || ''} onChange={e => set('nombre', e.target.value)} placeholder="Ej: Cuidado corporal"
            onFocus={e => e.target.style.borderColor = 'var(--coral)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '22px', paddingTop: '18px', borderTop: '1px solid var(--border)' }}>
          <button onClick={onClose} style={btnGhost}>Cancelar</button>
          <button onClick={() => onSave(form)} style={btnPrimary}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--coral-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--coral)'}
          >Guardar</button>
        </div>
      </div>
    </div>
  )
}

const emojis = ['💄', '🧴', '💆', '💅', '🌸', '🌿', '✨', '🧖']
const fondos = ['#faf6f0', '#f0f4ff', '#fff5f5', '#f0fdf4', '#fdf4ff', '#fffbeb']
const formVacio = { nombre: '' }

export default function Categorias() {
  const navigate = useNavigate()
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
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nombre: form.nombre }) })
    cargar(); setModal(false)
  }

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar esta categoría?')) return
    await fetch(`${API}/categorias/${id}`, { method: 'DELETE' })
    setCategorias(prev => prev.filter(c => c.idCategoria !== id))
  }

  return (
    <div className="fade-in">
      {/* Topbar */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>Categorías</h2>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-light)' }}>{categorias.length} categorías activas</p>
        </div>
        <button onClick={abrirNuevo} style={btnPrimary}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--coral-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--coral)'}
        >+ Nueva categoría</button>
      </div>

      <div style={{ padding: '24px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {categorias.map((c, i) => (
            <div key={c.idCategoria} style={{
              background: '#fff', border: '1px solid var(--border)',
              borderRadius: '12px', padding: '20px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,31,110,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: '44px', height: '44px', background: fondos[i % fondos.length], borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', border: '1px solid var(--border)' }}>
                  {emojis[i % emojis.length]}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: 'var(--navy)' }}>{c.nombre}</p>
                  <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--text-light)' }}>Categoría #{c.idCategoria}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                <button onClick={() => abrirEditar(c)} style={{ ...btnGhost, flex: 1, justifyContent: 'center', fontSize: '12.5px' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--navy)'; e.currentTarget.style.color = 'var(--navy)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-mid)' }}
                >Editar</button>
                <button onClick={() => eliminar(c.idCategoria)} style={btnDanger}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--coral-light)'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >Eliminar</button>
              </div>
            </div>
          ))}
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