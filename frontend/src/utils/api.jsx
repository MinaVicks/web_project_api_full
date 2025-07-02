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
  try{
  const response = await fetch(`${BASE_URL}/cards/getCards`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || 
        `HTTP ${response.status}: ${response.statusText}`
      );
    }

  const data = await response.json();
  
  
  if (!Array.isArray(data.cards)) {
    console.error('Expected cards array, got:', data);
    return []; // Return empty array as fallback
  }
  
  return data.cards;
  } catch (error) {
    console.error('API Error - getCards:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    throw new Error(`Failed to load cards on api: ${error.message}`);
  }
  
};

export const createCard = async (title, link, token) => {
  try {
    const res = await fetch(`${BASE_URL}/cards/createCards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify({ title, link }), 
    });
    
    const responseData = await res.json();
    console.log('Raw API response:', responseData);

    if (!res.ok) {
      throw new Error(responseData.message || "Failed to create card");
    }
    
    
    
    return responseData;
  } catch (err) {
    console.error("Card creation error:", err);
    throw err; 
  }
};

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
};

export const updateUserInformation = async (body, token) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/users/me`, {  
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify(body),
    });

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

export const likeCard = async (cardId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to like card');
    }

    return await response.json();
  } catch (error) {
    console.error('Like card error:', error);
    throw error;
  }
};

export const deleteLike = async (cardId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to remove like');
    }

    return await response.json();
  } catch (error) {
    console.error('Remove like error:', error);
    throw error;
  }
};

export const changeLikeCardStatus = async (cardId, like, token) => {
  return like ? likeCard(cardId, token) : deleteLike(cardId, token);
};

export const deleteCard = async (cardId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete card');
    }

    return await response.json();
  } catch (error) {
    console.error('Delete card error:', error);
    throw error;
  }
};