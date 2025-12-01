// src/services/anvisaClient.ts
import axios from "axios";

// 👉 ajuste a URL/porta pra onde sua FastAPI está rodando
// exemplo: http://localhost:8001 ou http://localhost:8000
const anvisaClient = axios.create({
  baseURL: "http://localhost:8001", 
  timeout: 15000,
});

export default anvisaClient;
