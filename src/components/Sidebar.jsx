import { NavLink, useLocation } from 'react-router-dom'

function Sidebar() {
  const location = useLocation()

  const navItem = (to, label, icon) => {
    const active = location.pathname === to
    return (
      <NavLink to={to} style={{ textDecoration: 'none' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px 14px', borderRadius: '8px', cursor: 'pointer',
          fontSize: '13px', margin: '2px 10px',
          fontWeight: active ? '500' : '400',
          color: active ? '#ffffff' : 'rgba(255,255,255,0.55)',
          background: active ? 'var(--coral)' : 'transparent',
          transition: 'all 0.2s ease',
        }}
          onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' } }}
        >
          {icon}
          {label}
        </div>
      </NavLink>
    )
  }

  return (
    <aside style={{
      width: '230px', minHeight: '100vh',
      background: 'var(--navy)',
      borderRight: 'none',
      position: 'fixed', top: 0, left: 0, zIndex: 10,
      display: 'flex', flexDirection: 'column'
    }}>

      {/* Logo */}
      <div style={{ padding: '22px 20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 4px' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'var(--coral)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ width: '17px', height: '17px' }}>
              <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
              <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
            </svg>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#fff', fontFamily: "'Playfair Display', serif" }}>Belleza</p>
            <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>Inventario Admin</p>
          </div>
        </div>
      </div>

      {/* General */}
      <div style={{ padding: '4px 0 6px' }}>
        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: '600', padding: '6px 24px', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>General</p>
        {navItem('/', 'Dashboard',
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
        )}
      </div>

      {/* Catálogo */}
      <div style={{ padding: '4px 0 6px' }}>
        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: '600', padding: '6px 24px', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>Catálogo</p>
        {navItem('/productos', 'Productos',
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
          </svg>
        )}
        {navItem('/categorias', 'Categorías',
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
            <path d="M4 6h16M4 12h8m-8 6h16"/>
          </svg>
        )}
        {navItem('/proveedores', 'Proveedores',
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87"/>
            <path d="M16 3.13a4 4 0 010 7.75"/>
          </svg>
        )}
      </div>

      {/* Usuario */}
      <div style={{ marginTop: 'auto', padding: '14px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'var(--coral)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: '600', color: '#fff'
          }}>SR</div>
          <div>
            <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: '#fff' }}>Sebastián R.</p>
            <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Administrador</p>
          </div>
        </div>
      </div>

    </aside>
  )
}

export default Sidebar