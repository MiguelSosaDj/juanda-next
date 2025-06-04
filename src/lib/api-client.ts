type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
};

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi(endpoint: string, options: RequestOptions = {}) {
  const { method = 'GET', body, headers = {} } = options;

  const response = await fetch(`/api${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.message || 'Error en la solicitud');
  }

  return data;
}

export const apiClient = {
  // Alumnos
  getAlumnos: () => fetchApi('/alumnos'),
  getAlumno: (id: string) => fetchApi(`/alumnos/${id}`),
  createAlumno: (data: any) => fetchApi('/alumnos', { method: 'POST', body: data }),
  updateAlumno: (id: string, data: any) => fetchApi(`/alumnos/${id}`, { method: 'PUT', body: data }),
  deleteAlumno: (id: string) => fetchApi(`/alumnos/${id}`, { method: 'DELETE' }),

  // Gestantes
  getGestantes: () => fetchApi('/gestantes'),
  getGestante: (id: string) => fetchApi(`/gestantes/${id}`),
  createGestante: (data: any) => fetchApi('/gestantes', { method: 'POST', body: data }),
  updateGestante: (id: string, data: any) => fetchApi(`/gestantes/${id}`, { method: 'PUT', body: data }),
  deleteGestante: (id: string) => fetchApi(`/gestantes/${id}`, { method: 'DELETE' }),

  // Add similar methods for other entities...
};