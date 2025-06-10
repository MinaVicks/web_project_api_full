const BASE_URL = "http://localhost:3001/api";

export const getCards =  async (token) => {
    
    try{
    const res = await fetch(`${BASE_URL}/cards/cards`, {
      method: "GET",
      headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
    });
    
    if (!res.ok) {
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
    const res = await fetch(`${BASE_URL}/cards/cards`, {
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
    const res = await fetch(`${BASE_URL}/users/me`, {
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
    const res = await fetch(`${BASE_URL}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(avatarData),
       });
       const contentType = res.headers.get('content-type');
         if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      throw new Error(`Expected JSON but got: ${text.substring(0, 100)}...`);
    }
    
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

