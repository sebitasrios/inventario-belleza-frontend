import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()

  return (
    <div className="fade-in">

      {/* Hero */}
      <div style={{
        background: 'var(--navy)', minHeight: '420px',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '60px 64px',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', background: 'var(--coral)', borderRadius: '50%', opacity: 0.06 }}/>
        <div style={{ position: 'absolute', bottom: '-60px', left: '30%', width: '300px', height: '300px', background: 'var(--coral)', borderRadius: '50%', opacity: 0.04 }}/>
        <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--coral)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>
          Sistema de Gestión
        </span>
        <h1 style={{ margin: '0 0 20px', fontSize: '48px', fontWeight: '600', color: '#fff', fontFamily: "'Playfair Display', serif", lineHeight: 1.15, maxWidth: '600px' }}>
          Belleza que inspira,<br/>inventario que funciona.
        </h1>
        <p style={{ margin: '0 0 36px', fontSize: '15px', color: 'rgba(255,255,255,0.6)', maxWidth: '520px', lineHeight: 1.7 }}>
          Una plataforma moderna para gestionar productos, categorías y proveedores de tu negocio de belleza — en tiempo real, sin complicaciones.
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/')} style={{
            background: 'var(--coral)', color: '#fff', border: 'none',
            borderRadius: '8px', padding: '12px 28px', fontSize: '14px',
            fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            transition: 'all 0.2s ease'
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--coral-dark)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--coral)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >Ir al Dashboard →</button>
          <button onClick={() => navigate('/productos')} style={{
            background: 'transparent', color: '#fff',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '8px', padding: '12px 28px', fontSize: '14px',
            fontWeight: '400', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            transition: 'all 0.2s ease'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--coral)'; e.currentTarget.style.color = 'var(--coral)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff' }}
          >Ver productos</button>
        </div>
      </div>

      {/* Qué es */}
      <div style={{ background: 'var(--cream)', padding: '64px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--coral)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Acerca del sistema</span>
          <h2 style={{ margin: '12px 0 20px', fontSize: '34px', fontWeight: '600', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>
            Somos un equipo de especialistas<br/>en tecnología para la belleza
          </h2>
          <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-mid)', lineHeight: 1.8 }}>
            Nuestro sistema combina diseño elegante con funcionalidad real. Controla tu inventario, gestiona tus proveedores y monitorea alertas de stock — todo desde un panel limpio y profesional, diseñado específicamente para negocios del sector belleza y estética.
          </p>
        </div>
      </div>

      {/* Features */}
      <div style={{ background: '#fff', padding: '64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--coral)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Funcionalidades</span>
          <h2 style={{ margin: '12px 0 0', fontSize: '32px', fontWeight: '600', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>
            Todo lo que necesita tu negocio
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '960px', margin: '0 auto' }}>
          {[
            { icon: '📦', title: 'Control de productos', desc: 'Registra, edita y elimina productos con control de stock en tiempo real. Alertas automáticas cuando el inventario está bajo.' },
            { icon: '🏷️', title: 'Gestión de categorías', desc: 'Organiza tu catálogo por categorías personalizadas. Filtra y encuentra cualquier producto en segundos.' },
            { icon: '🤝', title: 'Red de proveedores', desc: 'Centraliza la información de tus proveedores. Contactos, emails y productos asociados en un solo lugar.' },
            { icon: '📊', title: 'Dashboard analítico', desc: 'Visualiza el valor total de tu inventario, productos críticos y distribución por categoría de un vistazo.' },
            { icon: '⚠️', title: 'Alertas inteligentes', desc: 'El sistema detecta automáticamente productos con stock bajo o crítico y los destaca para acción inmediata.' },
            { icon: '🔒', title: 'Acceso seguro', desc: 'Panel administrativo con control de acceso por roles. Tu información siempre protegida y disponible.' },
          ].map((f, i) => (
            <div key={i} style={{
              background: 'var(--cream)', border: '1px solid var(--border)',
              borderRadius: '12px', padding: '28px 24px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(26,31,110,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ fontSize: '28px', marginBottom: '14px' }}>{f.icon}</div>
              <h3 style={{ margin: '0 0 10px', fontSize: '15px', fontWeight: '600', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>{f.title}</h3>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-mid)', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats banner */}
      <div style={{ background: 'var(--coral)', padding: '52px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          {[
            { num: '100%', label: 'En tiempo real' },
            { num: '< 1s', label: 'Tiempo de respuesta' },
            { num: '∞', label: 'Productos soportados' },
            { num: '24/7', label: 'Disponibilidad' },
          ].map((s, i) => (
            <div key={i}>
              <p style={{ margin: '0 0 6px', fontSize: '36px', fontWeight: '700', color: '#fff', fontFamily: "'Playfair Display', serif" }}>{s.num}</p>
              <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.75)', fontWeight: '400' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA final */}
      <div style={{ background: 'var(--cream)', padding: '72px 64px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '38px', fontWeight: '600', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>
          ¿Lista para transformar<br/>tu gestión?
        </h2>
        <p style={{ margin: '0 0 36px', fontSize: '14px', color: 'var(--text-mid)', lineHeight: 1.7 }}>
          Accede ahora al panel y comienza a gestionar tu inventario<br/>de manera profesional desde el primer día.
        </p>
        <button onClick={() => navigate('/')} style={{
          background: 'var(--navy)', color: '#fff', border: 'none',
          borderRadius: '8px', padding: '14px 36px', fontSize: '14px',
          fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          transition: 'all 0.2s ease'
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--coral)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >Comenzar ahora →</button>
      </div>

    </div>
  )
}