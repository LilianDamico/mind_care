import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../services/api";
import "./SignupUserPage.css";

const SignupUserPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tipo: "CLIENTE",
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    especialidade: "",
    telefone: "",
    endereco: "",
    cidade: "", // ✅ Novo campo
  });

  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  // ==================================================
  // HANDLER DE MUDANÇA DE INPUT
  // ==================================================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "tipo") {
        return {
          ...prev,
          tipo: value,
          especialidade: value === "CLIENTE" ? "" : prev.especialidade,
        };
      }
      return { ...prev, [name]: value };
    });
  };

  // ==================================================
  // HANDLER DE SUBMISSÃO
  // ==================================================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro(null);
    setMensagem(null);

    try {
      console.log("📤 Enviando dados:", formData);
      const response = await apiUrl.post("/api/users", formData);
      console.log("✅ Resposta do backend:", response.data);

      setMensagem("Usuário cadastrado com sucesso!");
      alert("Usuário cadastrado com sucesso!");
      navigate("/loginpage");
    } catch (error: any) {
      console.error("❌ Erro ao cadastrar:", error);
      setErro(
        error.response?.data?.error ||
          "Ocorreu um erro inesperado ao cadastrar o usuário."
      );
    }
  };

  // ==================================================
  // RENDERIZAÇÃO DO FORMULÁRIO
  // ==================================================
  return (
    <div className="signupuser-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Cadastrar Usuário</h2>

        {erro && <p className="signup-error">{erro}</p>}
        {mensagem && <p className="signup-success">{mensagem}</p>}

        {/* Tipo */}
        <select
          name="tipo"
          className="signup-select"
          value={formData.tipo}
          onChange={handleChange}
        >
          <option value="CLIENTE">Cliente</option>
          <option value="PROFISSIONAL">Profissional</option>
        </select>

        {/* Nome */}
        <input
          className="signup-input"
          name="nome"
          placeholder="Nome completo"
          value={formData.nome}
          onChange={handleChange}
          required
        />

        {/* Email */}
        <input
          className="signup-input"
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Senha */}
        <input
          className="signup-input"
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />

        {/* CPF */}
        <input
          className="signup-input"
          name="cpf"
          placeholder="CPF"
          maxLength={14}
          value={formData.cpf}
          onChange={handleChange}
          required
        />

        {/* Especialidade (só aparece se for PROFISSIONAL) */}
        {formData.tipo === "PROFISSIONAL" && (
          <input
            className="signup-input"
            name="especialidade"
            placeholder="Especialidade (ex: Psicologia, Fisioterapia)"
            value={formData.especialidade}
            onChange={handleChange}
            required
          />
        )}

        {/* Telefone */}
        <input
          className="signup-input"
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
        />

        {/* Endereço */}
        <input
          className="signup-input"
          name="endereco"
          placeholder="Endereço"
          value={formData.endereco}
          onChange={handleChange}
        />

        {/* ✅ Cidade */}
        <input
          className="signup-input"
          name="cidade"
          placeholder="Cidade"
          value={formData.cidade}
          onChange={handleChange}
          required
        />

        {/* Botão */}
        <button type="submit" className="signup-button">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default SignupUserPage;
