const BASE_URL = 'http://localhost:8080/api'

export async function getCategorias() {
  const response = await fetch(`${BASE_URL}/categorias`)
  return response.json()
}

export async function getCategoria(id) {
  const response = await fetch(`${BASE_URL}/categorias/${id}`)
  return response.json()
}

export async function crearCategoria(categoria) {
  const response = await fetch(`${BASE_URL}/categorias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria)
  })
  return response.json()
}

export async function actualizarCategoria(id, categoria) {
  const response = await fetch(`${BASE_URL}/categorias/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria)
  })
  return response.json()
}

export async function eliminarCategoria(id) {
  await fetch(`${BASE_URL}/categorias/${id}`, {
    method: 'DELETE'
  })
}