const BASE_URL = 'http://localhost:8080/api/v1';

export const getAuthToken = () => localStorage.getItem('token');
export const setAuthToken = (token: string) => localStorage.setItem('token', token);
export const removeAuthToken = () => localStorage.removeItem('token');

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401 && !endpoint.includes('/auth/login')) {
      removeAuthToken();
      window.location.reload();
    }
    const contentType = response.headers.get('content-type');
    let errorMessage = 'API request failed';
    
    if (contentType && contentType.includes('application/json')) {
      const errorBody = await response.json().catch(() => ({}));
      errorMessage = errorBody.message || errorMessage;
    } else {
      const text = await response.text().catch(() => '');
      errorMessage = text || errorMessage;
    }

    const error: any = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    return await response.text();
  }
};
