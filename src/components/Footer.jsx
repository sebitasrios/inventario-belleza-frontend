import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--navy)', color: '#fff' }}>

      {/* Main footer */}
      <div style={{ padding: '52px 64px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '48px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '34px', height: '34px', background: 'var(--coral)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ width: '17px', height: '17px' }}>
                <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
              </svg>
            </div>
            <span style={{ fontSize: '16px', fontWeight: '600', fontFamily: "'Playfair Display', serif" }}>Belleza Inventario</span>
          </div>
          <p style={{ margin: '0 0 20px', fontSize: '13.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '300px' }}>
            Sistema de gestión de inventario diseñado para negocios del sector belleza y estética. Moderno, rápido y confiable.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['📧', '📱', '🌐'].map((icon, i) => (
              <div key={i} style={{
                width: '34px', height: '34px', borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: '15px', transition: 'all 0.2s ease'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--coral)'; e.currentTarget.style.background = 'rgba(232,128,106,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'transparent' }}
              >{icon}</div>
            ))}
          </div>
        </div>

        {/* Navegación */}
        <div>
          <p style={{ margin: '0 0 18px', fontSize: '11px', fontWeight: '600', color: 'var(--coral)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Navegación</p>
          {[
            { label: 'Dashboard', path: '/' },
            { label: 'Productos', path: '/productos' },
            { label: 'Categorías', path: '/categorias' },
            { label: 'Proveedores', path: '/proveedores' },
            { label: 'Acerca de', path: '/about' },
          ].map(item => (
            <div key={item.path} onClick={() => navigate(item.path)} style={{
              fontSize: '13.5px', color: 'rgba(255,255,255,0.5)',
              marginBottom: '10px', cursor: 'pointer', transition: 'color 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >{item.label}</div>
          ))}
        </div>

        {/* Contacto */}
        <div>
          <p style={{ margin: '0 0 18px', fontSize: '11px', fontWeight: '600', color: 'var(--coral)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Contacto</p>
          {[
            { icon: '📧', text: 'admin@belleza.co' },
            { icon: '📱', text: '+57 300 000 0000' },
            { icon: '📍', text: 'Medellín, Colombia' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px' }}>{item.icon}</span>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{item.text}</span>
            </div>
          ))}

          <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ margin: '0 0 10px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Versión del sistema</p>
            <span style={{ background: 'var(--coral)', color: '#fff', padding: '3px 10px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '500' }}>v1.0.0 — 2026</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ padding: '18px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: '12.5px', color: 'rgba(255,255,255,0.3)' }}>
          © {year} Belleza Inventario. Todos los derechos reservados.
        </p>
        <p style={{ margin: 0, fontSize: '12.5px', color: 'rgba(255,255,255,0.3)' }}>
          Hecho con ❤️ en Colombia
        </p>
      </div>

    </footer>
  )
}