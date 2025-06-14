const BASE_URL = "http://localhost:3001/api";

export const getCards =  async (token) => {
    
    try{
    token = localStorage.getItem('userToken');
    if (!token) throw new Error('No token found');
    const res = await fetch(`${BASE_URL}/cards`, {
      method: "GET",
      headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
    });
    
    if (!res.ok) {
      if (res.status === 400) {
        localStorage.removeItem('userToken');
      }
      const error = await res.json();
    throw new Error(error.message ||  "Failed to fetch cards");
    }
    
    return await res.json();
  } catch (err) {
    
    console.error("API call failed:", err);
    
    throw err;
  }
}


export const createCard = async (title, link, token) => {
  try {
    const res = await fetch(`${BASE_URL}/createCards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify({ title, link }), 
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create card");
    }
    
    return await res.json();
  } catch (err) {
    console.error("Card creation error:", err);
    throw err; 
  }
}


export const getCurrentUser = async (token) => {
  try{
    const res = await fetch(`${BASE_URL}/auth/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
        }
       });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to get User Information");
    }
    return await res.json();
  } catch (err) {
    console.error("get User Information error:", err);
    throw err; 
  }
  }

  export const updateAvatar = async (avatarData, token) => {
  try{
    const res = await fetch(`${BASE_URL}/auth/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(avatarData),
       });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update Avatar");
    }
    return await res.json();
  } catch (err) {
    console.error("Update Avatar error:", err);
    throw err; 
  }
  }


    export const updateUserInformation = async (body, token) => {
  try{
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(body),
       })
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update User");
    }
    return await res.json();
  } catch (err) {
    console.error("Update User:", err);
    throw err; 
  }
  }

