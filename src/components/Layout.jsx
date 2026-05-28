import Sidebar from './Sidebar'
import Header from './Header'

function Layout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '230px', minHeight: '100vh', background: '#f5f6fa', flex: 1 }}>
        <Header />
        {children}
      </main>
    </div>
  )
}

export default Layout