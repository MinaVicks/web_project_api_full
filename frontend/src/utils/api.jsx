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

export const getCards = async (token) => {
  const response = await fetch(`${BASE_URL}/cards`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  
  return handleResponse(response);
};


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

/*
export const getCurrentUser = async (token) => {
   try {
    const response = await fetch(`${BASE_URL}/auth/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await response.json();
    console.log('API User Data:', data); // Debug log
    return data;
    
  } catch (error) {
    console.error("Failed to get user:", error);
    throw error;
  }
 
  };*/

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

