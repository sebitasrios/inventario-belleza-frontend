# Inventario Belleza — Frontend

Panel de administración web para el sistema de inventario de productos de belleza.
Proyecto independiente que consume la API REST del backend [inventario-belleza](https://github.com/sebitasrios/inventario-belleza).

**Autor:** Sebastian Rios — [github.com/sebitasrios](https://github.com/sebitasrios)
**Año:** 2026

---

## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18+ | Framework frontend |
| Vite | 8+ | Bundler y servidor de desarrollo |
| Tailwind CSS | 4+ | Estilos utilitarios |
| React Router DOM | 6+ | Navegación entre páginas |
| JavaScript | ES2022 | Lenguaje principal |

---

## Requisitos previos

- Node.js 18+
- Backend [inventario-belleza](https://github.com/sebitasrios/inventario-belleza) corriendo en `localhost:8080`
- SQL Server con la base de datos `inventario_belleza` creada

---

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/sebitasrios/inventario-belleza-frontend.git
cd inventario-belleza-frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`

---

## Estructura del proyecto

```
src/
├── components/
│   ├── Layout.jsx        # Estructura base con sidebar
│   └── Sidebar.jsx       # Menú lateral de navegación
├── pages/
│   ├── Productos.jsx     # CRUDL de productos
│   ├── Categorias.jsx    # CRUDL de categorías
│   └── Proveedores.jsx   # CRUDL de proveedores
├── services/
│   └── api.js            # Funciones de consumo de la API
├── App.jsx               # Componente principal
└── main.jsx              # Punto de entrada y rutas
```

---

## Funcionalidades

### Categorías `/categorias`
- Listar todas las categorías
- Crear nueva categoría
- Editar categoría existente
- Eliminar categoría

### Proveedores `/proveedores`
- Listar todos los proveedores con nombre, teléfono y email
- Crear nuevo proveedor
- Editar proveedor existente
- Eliminar proveedor

### Productos `/productos`
- Listar todos los productos con precio, stock, categoría y proveedor
- Badge visual de alerta cuando el stock está por debajo del mínimo
- Crear nuevo producto con selección de categoría y proveedor
- Editar producto existente
- Eliminar producto

---

## Conexión con el backend

El frontend consume la API REST del backend mediante `fetch`. La URL base está definida en cada página:

```js
const BASE_URL = 'http://localhost:8080/api'
```

### Endpoints consumidos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/categorias | Listar categorías |
| POST | /api/categorias | Crear categoría |
| PUT | /api/categorias/{id} | Actualizar categoría |
| DELETE | /api/categorias/{id} | Eliminar categoría |
| GET | /api/productos | Listar productos |
| POST | /api/productos | Crear producto |
| PUT | /api/productos/{id} | Actualizar producto |
| DELETE | /api/productos/{id} | Eliminar producto |
| GET | /api/proveedores | Listar proveedores |
| POST | /api/proveedores | Crear proveedor |
| PUT | /api/proveedores/{id} | Actualizar proveedor |
| DELETE | /api/proveedores/{id} | Eliminar proveedor |

---

## Proyecto relacionado

Backend: [github.com/sebitasrios/inventario-belleza](https://github.com/sebitasrios/inventario-belleza)
Desarrollado con Spring Boot 3.2 · Java 17 · SQL Server
