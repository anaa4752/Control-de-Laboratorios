const API_URL = import.meta.env.VITE_API_URL;
const APP_TOKEN = import.meta.env.VITE_API_APP_TOKEN;

//todas las peticiones a la API pasan por aquí
const apiFetch = async (endpoint, metodo = 'GET', body = null) => {
  // Si no hay variables de entorno no podra seguir
  if (!API_URL || !APP_TOKEN) {
    throw new Error('Falta configurar VITE_API_URL y VITE_API_APP_TOKEN en el .env');
  }

  const token = localStorage.getItem('token');

  // La API usa doble autenticación: un token de app + uno de usuario
  const headers = {
    'Content-Type': 'application/json',
    'x-api-token': APP_TOKEN,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const respuesta = await fetch(`${API_URL}${endpoint}`, {
    method: metodo,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const datos = await respuesta.json().catch(() => ({}));// Si la respuesta no es JSON, devuelve un objeto vacío

  if (respuesta.status === 400) {
    throw new Error(datos.message || 'Error en la solicitud');
  }

  if (respuesta.status === 401) {
    // 401 indica que el token de usuario es inválido o expiró, si no es un endpoint de auth, fuerza un cierre de sesion
    if (!endpoint.startsWith('/api/auth/')) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/login';
      throw new Error('Tu sesión expiró. Inicia sesión de nuevo.');
    }
    throw new Error(datos.message || 'Credenciales incorrectas');
  }
  if (respuesta.status === 403) {
    alert('No tienes permiso para realizar esta acción');
    throw new Error('Acceso restringido');
  }
  if (respuesta.status === 404) {
    throw new Error(datos.message || 'No se encontró lo que buscas');
  }
  if (respuesta.status === 500) {
    throw new Error('Error del servidor, intenta más tarde');
  }
  if (!respuesta.ok) {
    throw new Error(datos.message || `Error ${respuesta.status}`);
  }

  return datos;
};

export default apiFetch;   