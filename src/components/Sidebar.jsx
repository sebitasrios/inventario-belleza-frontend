import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-gray-900 text-white flex flex-col">

      <div className="p-6 border-b border-gray-700">
        <h1 className="text-lg font-semibold">Belleza Admin</h1>
        <p className="text-gray-400 text-xs mt-1">Panel de control</p>
      </div>

      <nav className="flex flex-col mt-4">
        <p className="text-gray-500 text-xs uppercase px-6 py-2 tracking-widest">
          Inventario
        </p>

        <NavLink
          to="/productos"
          className={({ isActive }) =>
            `px-6 py-3 text-sm border-l-4 transition-all ${
              isActive
                ? 'border-purple-500 bg-gray-800 text-white'
                : 'border-transparent text-gray-400 hover:bg-gray-800 hover:text-white'
            }`
          }
        >
          Productos
        </NavLink>

        <NavLink
          to="/categorias"
          className={({ isActive }) =>
            `px-6 py-3 text-sm border-l-4 transition-all ${
              isActive
                ? 'border-purple-500 bg-gray-800 text-white'
                : 'border-transparent text-gray-400 hover:bg-gray-800 hover:text-white'
            }`
          }
        >
          Categorias
        </NavLink>

        <NavLink
          to="/proveedores"
          className={({ isActive }) =>
            `px-6 py-3 text-sm border-l-4 transition-all ${
              isActive
                ? 'border-purple-500 bg-gray-800 text-white'
                : 'border-transparent text-gray-400 hover:bg-gray-800 hover:text-white'
            }`
          }
        >
          Proveedores
        </NavLink>

      </nav>
    </aside>
  )
}

export default Sidebar