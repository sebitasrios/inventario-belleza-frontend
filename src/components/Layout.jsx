import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '230px', minHeight: '100vh', background: 'var(--cream)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1 }}>
          {children}
        </div>
        <Footer />
      </main>
    </div>
  )
}

export default Layout