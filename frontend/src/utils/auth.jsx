const BASE_URL = "http://localhost:3001/api";

export const login =  async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!res.ok) {
      const error = await res.json();
    throw new Error(error.message || "Login failed")
    }
    
    return await res.json();
  }

  export const register = async  (email, password) => {
  return fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(async (res) => {
    if (!res.ok) {
      const err = await res.json();
      return await Promise.reject(err); 
    }
    return res.json();
  });
};
