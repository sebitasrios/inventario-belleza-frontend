import Sidebar from './Sidebar'

function Layout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{
        marginLeft: '230px',
        minHeight: '100vh',
        background: '#f5f6fa',
        flex: 1
      }}>
        {children}
      </main>
    </div>
  )
}

export default Layout