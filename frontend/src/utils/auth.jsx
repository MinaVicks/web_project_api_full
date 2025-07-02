const BASE_URL = "http://localhost:3001/api";


const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data.message || 'Request failed');
    error.response = data;
    throw error;
  }
  
  return data;
};

export const getProtectedData = async () => {
  const token = localStorage.getItem('userToken');
  
  const response = await fetch(`${BASE_URL}/protected-route`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Not authorized');
  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) throw new Error('Login failed');
  
  const data = await response.json();
  
  return data;
};

export const getCurrentUser = async (token) => {
  const response = await fetch(`${BASE_URL}/auth/users/me`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  
  return handleResponse(response);
};

export const register = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    
     return handleResponse(response);
};
  
export const isAuthenticated = () => {
  return !!localStorage.getItem('userToken');
};

export const logout = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('user');
};