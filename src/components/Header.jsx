import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSearch } from '../context/SearchContext'

const titles = {
  '/': 'Dashboard',
  '/productos': 'Productos',
  '/categorias': 'Categorías',
  '/proveedores': 'Proveedores',
}

const today = new Date().toLocaleDateString('es-CO', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

export default function Header() {
  const location = useLocation()
  const title = titles[location.pathname] || 'Panel'
  const [menuOpen, setMenuOpen] = useState(false)
  const [notiOpen, setNotiOpen] = useState(false)
  const { query, setQuery } = useSearch()

  const notificaciones = [
    { id: 1, texto: 'Shampoo reparador tiene stock crítico', tipo: 'coral', tiempo: 'Hace 5 min' },
    { id: 2, texto: 'Nuevo proveedor agregado exitosamente', tipo: 'green', tiempo: 'Hace 1 hora' },
    { id: 3, texto: 'Base líquida actualizada', tipo: 'navy', tiempo: 'Hace 2 horas' },
  ]

  const dotColor = { coral: '#e8806a', green: '#16a34a', navy: '#1a1f6e' }

  return (
    <div style={{
      background: '#ffffff',
      borderBottom: '1px solid var(--border)',
      padding: '0 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 50, height: '62px'
    }}>

      {/* Título */}
      <div>
        <h1 style={{
          margin: 0, fontSize: '17px', fontWeight: '600',
          color: 'var(--navy)',
          fontFamily: "'Playfair Display', serif"
        }}>{title}</h1>
        <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)', textTransform: 'capitalize' }}>{today}</p>
      </div>

      {/* Acciones */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

        {/* Buscador */}
        <div style={{ position: 'relative' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" style={{ width: '14px', height: '14px', position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      placeholder="Buscar..." style={{
            background: 'var(--cream)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '7px 14px 7px 34px',
            color: 'var(--text-dark)', fontSize: '13px',
            fontFamily: 'Inter, sans-serif', outline: 'none', width: '200px',
            transition: 'border-color 0.2s ease'
          }}
            onFocus={e => e.target.style.borderColor = 'var(--coral)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* Notificaciones */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setNotiOpen(!notiOpen); setMenuOpen(false) }} style={{
            background: 'var(--cream)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '7px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', transition: 'all 0.2s ease'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--coral)'; e.currentTarget.style.background = 'var(--coral-light)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--cream)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-mid)" strokeWidth="2" style={{ width: '17px', height: '17px' }}>
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <span style={{ position: 'absolute', top: '5px', right: '5px', width: '8px', height: '8px', background: 'var(--coral)', borderRadius: '50%', border: '1.5px solid #fff' }}/>
          </button>

          {notiOpen && (
            <div style={{
              position: 'absolute', right: 0, top: '44px', width: '300px',
              background: '#fff', border: '1px solid var(--border)',
              borderRadius: '12px', boxShadow: '0 8px 32px rgba(26,31,110,0.1)', zIndex: 100
            }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>Notificaciones</p>
                <span style={{ background: 'var(--coral-light)', color: 'var(--coral-dark)', padding: '2px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: '500' }}>3 nuevas</span>
              </div>
              {notificaciones.map(n => (
                <div key={n.id} style={{ padding: '12px 16px', borderBottom: '1px solid #f9f6f2', display: 'flex', gap: '10px', alignItems: 'flex-start', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fdf9f5'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', marginTop: '5px', flexShrink: 0, background: dotColor[n.tipo] }}/>
                  <div>
                    <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-dark)' }}>{n.texto}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--text-light)' }}>{n.tiempo}</p>
                  </div>
                </div>
              ))}
              <div style={{ padding: '10px 16px' }}>
                <button style={{ width: '100%', background: 'none', border: 'none', color: 'var(--coral)', fontSize: '12.5px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>Ver todas →</button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 4px' }}/>

        {/* Perfil */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setMenuOpen(!menuOpen); setNotiOpen(false) }} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '5px 8px', borderRadius: '8px', transition: 'background 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'var(--coral)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: '600', color: '#fff'
            }}>SR</div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: 'var(--navy)' }}>Sebastián R.</p>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)' }}>Administrador</p>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="2" style={{ width: '14px', height: '14px' }}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {menuOpen && (
            <div style={{
              position: 'absolute', right: 0, top: '48px', width: '200px',
              background: '#fff', border: '1px solid var(--border)',
              borderRadius: '12px', boxShadow: '0 8px 32px rgba(26,31,110,0.1)',
              zIndex: 100, overflow: 'hidden'
            }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: 'var(--navy)' }}>Sebastián Ríos</p>
                <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)' }}>admin@belleza.co</p>
              </div>
              {[{ icon: '👤', label: 'Mi perfil' }, { icon: '⚙️', label: 'Configuración' }].map(item => (
                <div key={item.label} style={{ padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  {item.icon} {item.label}
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border)' }}>
                <div style={{ padding: '10px 16px', fontSize: '13px', color: 'var(--coral-dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--coral-light)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  🚪 Cerrar sesión
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {(menuOpen || notiOpen) && (
        <div onClick={() => { setMenuOpen(false); setNotiOpen(false) }}
          style={{ position: 'fixed', inset: 0, zIndex: 49 }}/>
      )}
    </div>
  )
}