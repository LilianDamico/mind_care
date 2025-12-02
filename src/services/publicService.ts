import api from "./api";

export const listarProfissionaisPublico = async () => {
  const response = await api.get("/public/profissionais");
  return response.data; 
};
