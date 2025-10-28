/**
 * API Service with authentication support
 */

const API_BASE_URL = 'http://localhost:4000/api';

/**
 * Get authentication headers
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

/**
 * Handle API response
 */
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // If unauthorized, redirect to login
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_info');
      window.location.href = '/login';
    }
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

/**
 * API Methods
 */
export const api = {
  // Auth endpoints
  auth: {
    login: async (credentials) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      return handleResponse(response);
    },
    
    me: async () => {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    },
    
    logout: async () => {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    }
  },
  
  // Groups endpoints
  groups: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/groups`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    },
    
    getById: async (id) => {
      const response = await fetch(`${API_BASE_URL}/groups/${id}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    },
    
    create: async (groupData) => {
      const response = await fetch(`${API_BASE_URL}/groups`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(groupData)
      });
      return handleResponse(response);
    },
    
    update: async (id, updateData) => {
      const response = await fetch(`${API_BASE_URL}/groups/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
      });
      return handleResponse(response);
    }
  }
};

export default api;
