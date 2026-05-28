import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = 'http://localhost:8080/api'

const StatCard = ({ label, value, sub, subColor, icon, iconBg }) => (
  <div className="fade-in" style={{
    background: '#fff', border: '1px solid var(--border)',
    borderRadius: '12px', padding: '20px 22px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'default'
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,31,110,0.08)' }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-light)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
      <div style={{ width: '36px', height: '36px', background: iconBg, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px' }}>{icon}</div>
    </div>
    <p style={{ margin: 0, fontSize: '30px', fontWeight: '600', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>{value}</p>
    <p style={{ margin: '5px 0 0', fontSize: '12px', color: subColor || 'var(--text-light)' }}>{sub}</p>
  </div>
)

const badge = (texto, tipo) => {
  const estilos = {
    green:  { background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' },
    red:    { background: 'var(--coral-light)', color: 'var(--coral-dark)', border: '1px solid #f5d5cd' },
    yellow: { background: '#fffbeb', color: '#92400e', border: '1px solid #fde68a' },
    blue:   { background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe' },
  }
  return (
    <span style={{ ...estilos[tipo], display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '500' }}>
      {texto}
    </span>
  )
}

export default function Dashboard() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [proveedores, setProveedores] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${API}/productos`).then(r => r.json()).then(setProductos)
    fetch(`${API}/categorias`).then(r => r.json()).then(setCategorias)
    fetch(`${API}/proveedores`).then(r => r.json()).then(setProveedores)
  }, [])

  const stockBajo = productos.filter(p => p.stock <= p.stockMinimo)
  const activos = productos.filter(p => p.stock > p.stockMinimo)
  const valorTotal = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0)

  return (
    <div style={{ padding: '28px 32px' }} className="fade-in">

      {/* Bienvenida */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ margin: '0 0 5px', fontSize: '24px', fontWeight: '600', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>
          Bienvenido, Sebastián 👋
        </h2>
        <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '13px' }}>
          Resumen del estado actual de tu inventario
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <StatCard label="Total productos" value={productos.length} sub={`${activos.length} activos`} subColor="#16a34a" icon="📦" iconBg="#faf6f0"/>
        <StatCard label="Categorías" value={categorias.length} sub="Tipos de producto" icon="🏷️" iconBg="#faf6f0"/>
        <StatCard label="Proveedores" value={proveedores.length} sub="Aliados comerciales" icon="🤝" iconBg="#faf6f0"/>
        <StatCard label="Stock crítico" value={stockBajo.length} sub={stockBajo.length > 0 ? 'Requieren atención' : 'Todo en orden'} subColor={stockBajo.length > 0 ? 'var(--coral-dark)' : '#16a34a'} icon="⚠️" iconBg="var(--coral-light)"/>
      </div>

      {/* Banner valor inventario */}
      <div style={{
        background: 'var(--navy)', borderRadius: '14px',
        padding: '24px 28px', marginBottom: '24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        transition: 'transform 0.2s ease'
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <div>
          <p style={{ margin: '0 0 6px', fontSize: '12px', color: 'rgba(255,255,255,0.55)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Valor total del inventario</p>
          <p style={{ margin: 0, fontSize: '34px', fontWeight: '600', color: '#fff', fontFamily: "'Playfair Display', serif" }}>
            ${valorTotal.toLocaleString('es-CO')}
          </p>
          <p style={{ margin: '5px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
            Basado en precio × stock de {productos.length} productos
          </p>
        </div>
        <div style={{ fontSize: '52px', opacity: 0.15 }}>💰</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>

        {/* Stock crítico */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>⚠️ Stock crítico</p>
            {stockBajo.length > 0 && (
              <span style={{ background: 'var(--coral-light)', color: 'var(--coral-dark)', padding: '2px 10px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '500' }}>
                {stockBajo.length} alertas
              </span>
            )}
          </div>
          {stockBajo.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center' }}>
              <p style={{ fontSize: '28px', margin: '0 0 8px' }}>✅</p>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-light)' }}>Todo el inventario en orden</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr>
                <th>Producto</th><th>Stock</th><th>Estado</th>
              </tr></thead>
              <tbody>
                {stockBajo.map(p => (
                  <tr key={p.idProducto}>
                    <td style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{p.nombre}</td>
                    <td>{p.stock} / {p.stockMinimo}</td>
                    <td>{p.stock === 0 ? badge('Sin stock', 'red') : badge('Stock bajo', 'yellow')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)' }}>
            <button onClick={() => navigate('/productos')} style={{
              background: 'none', border: 'none', color: 'var(--coral)',
              fontSize: '12.5px', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              fontWeight: '500', transition: 'color 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--coral-dark)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--coral)'}
            >Ver todos los productos →</button>
          </div>
        </div>

        {/* Categorías */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>📊 Productos por categoría</p>
          </div>
          <div style={{ padding: '18px 20px' }}>
            {categorias.map((cat, i) => {
              const count = productos.filter(p => p.idCategoria === cat.idCategoria).length
              const pct = productos.length > 0 ? Math.round((count / productos.length) * 100) : 0
              const colores = ['#e8806a', '#1a1f6e', '#d4614a', '#252b8a', '#f5d5cd', '#c0d0f0']
              return (
                <div key={cat.idCategoria} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '500' }}>{cat.nombre}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>{count} · {pct}%</span>
                  </div>
                  <div style={{ background: 'var(--cream-dark)', borderRadius: '99px', height: '5px' }}>
                    <div style={{ width: `${pct}%`, height: '5px', borderRadius: '99px', background: colores[i % colores.length], transition: 'width 0.6s ease' }}/>
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)' }}>
            <button onClick={() => navigate('/categorias')} style={{
              background: 'none', border: 'none', color: 'var(--coral)',
              fontSize: '12.5px', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              fontWeight: '500', transition: 'color 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--coral-dark)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--coral)'}
            >Ver categorías →</button>
          </div>
        </div>

        {/* Proveedores */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', gridColumn: '1 / -1' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>🤝 Proveedores activos</p>
            <button onClick={() => navigate('/proveedores')} style={{
              background: 'none', border: 'none', color: 'var(--coral)',
              fontSize: '12.5px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: '500'
            }}>Ver todos →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)' }}>
            {proveedores.map((p, i) => {
              const fondos = ['#faf6f0', '#f0f4ff', '#fff5f5']
              const colores = ['var(--coral)', 'var(--navy)', 'var(--coral-dark)']
              const iniciales = p.nombre?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
              const prodCount = productos.filter(pr => pr.idProveedor === p.idProveedor).length
              return (
                <div key={p.idProveedor} style={{
                  background: '#fff', padding: '18px 20px',
                  display: 'flex', alignItems: 'center', gap: '12px',
                  transition: 'background 0.2s ease', cursor: 'default'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: fondos[i % fondos.length], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600', color: colores[i % colores.length], flexShrink: 0, border: '1px solid var(--border)' }}>
                    {iniciales}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '13.5px', fontWeight: '500', color: 'var(--navy)' }}>{p.nombre}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: 'var(--text-light)' }}>{p.email} · {prodCount} productos</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}