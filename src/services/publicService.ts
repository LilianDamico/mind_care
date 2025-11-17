import api from "./api";

export const listarProfissionaisPublicos = async () => {
  const response = await api.get("/public/profissionais");
  return response.data;
};
