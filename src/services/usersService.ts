import axios from 'axios';


const API_URL = 'https://api-node-e3xo.onrender.com'; 


export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Erro ao enviar dados para o backend:', error);
    throw error;
  }
};
