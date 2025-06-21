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

export const login =  async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    
     return handleResponse(response);
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
  try{
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok){
    const error= await res.json();
    throw new Error (error.message || "Registration failed");
  }

  return data;
  }  catch (error) {
    console.error('Registration API error:', error);
    throw error;
  }

  };

  
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};


export const logout = () => {
  localStorage.removeItem('token');
};