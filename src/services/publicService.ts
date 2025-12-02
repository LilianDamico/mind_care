import api from "./api";

export const listarProfissionaisPublico = async () => {
  const response = await api.get("api/public/profissionais");
  return response.data; 
};
