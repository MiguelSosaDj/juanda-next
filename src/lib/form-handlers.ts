import { toast } from 'react-hot-toast';

type ApiResponse = {
  success: boolean;
  message?: string;
  data?: unknown;
};

export async function handleFormSubmission(
  endpoint: string,
  data: Record<string, unknown>,
  method: 'POST' | 'PUT' = 'POST'
): Promise<ApiResponse> {
  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error en la solicitud');
    }

    toast.success(result.message || 'Operación exitosa');
    return result;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Ha ocurrido un error';
    toast.error(errorMessage);
    throw error;
  }
}

export async function handleFormDelete(
  endpoint: string,
  id: string
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${endpoint}/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error al eliminar');
    }

    toast.success(result.message || 'Eliminado correctamente');
    return result;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error al eliminar';
    toast.error(errorMessage);
    throw error;
  }
}