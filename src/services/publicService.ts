import api from "./api";

export const listarProfissionaisPublico = async () => {
  const response = await api.get("/public/profissional");
  return response.data; 
};
