import React, { useState } from "react";
import api from "../../services/api";
import LgpdModal from "../../components/lgpd/LgpdModal";
import "./SignupUserPage.css";

export default function SignupUserPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [aceitouLgpd, setAceitouLgpd] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    tipo: "CLIENTE",
    nome: "",
    email: "",
    cpf: "",
    senha: "",
    telefone: "",
    endereco: "",
    cidade: "",
    especialidade: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ============================================================
  // SUBMIT — REGISTRA USER → CONSENTIMENTO LGPD → LIMPA FORM
  // ============================================================
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!aceitouLgpd) {
      alert("Você precisa aceitar o termo LGPD para continuar.");
      setLoading(false);
      return;
    }

    try {
      // 1) REGISTRO DE USUÁRIO
      const response = await api.post("/api/auth/register", form);
      console.log("Usuário registrado:", response.data);
      const userId = response.data?.user?.id;

      if (!userId) {
        alert("⚠ Usuário criado, mas sem retorno de ID. Verifique backend.");
        return;
      }

      // 2) REGISTRO LGPD
      await api.post("/api/lgpd/consentimento", {
        userId,
        versao: "1.0",
        origem: "cadastro-web",
        ip: "127.0.0.1"
      });

      alert("🎉 Cadastro concluído com sucesso! LGPD registrado.");

      // 3) LIMPAR FORM
      setForm({
        tipo: "CLIENTE",
        nome: "",
        email: "",
        cpf: "",
        senha: "",
        telefone: "",
        endereco: "",
        cidade: "",
        especialidade: ""
      });

      setAceitouLgpd(false);

    } catch (err: any) {
      console.error("❌ Erro ao registrar:", err?.response?.data || err);

      const mensagem = err?.response?.error || "Erro inseperado, contudo, usuário pode ter sido criado."

      alert(mensagem);
    }

    setLoading(false);
  }

  // ============================================================
  // Helper para inputs → padroniza anti-autofill
  // ============================================================
  const inputFix = {
    autoComplete: "new-password",
    autoCorrect: "off",
    autoCapitalize: "none",
    spellCheck: false
  };

  return (
    <div className="signup-container">
      <h2 className="titulo-form">📎 Cadastro MindCare 😎</h2>

      <form className="form-box" onSubmit={handleSubmit}>
        <label>Tipo de Usuário</label>
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          {...inputFix}
        >
          <option value="CLIENTE">Cliente</option>
          <option value="PROFISSIONAL">Profissional</option>
        </select>

        <label>Nome completo</label>
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Maria da Silva"
          required
          {...inputFix}
        />

        <div className="grid-2">
          <div>
            <label>E-mail</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@dominio.com"
              required
              {...inputFix}
            />
          </div>

          <div>
            <label>Senha</label>
            <input
              name="senha"
              type="password"
              value={form.senha}
              onChange={handleChange}
              required
              {...inputFix}
            />
          </div>
        </div>

        <div className="grid-2">
          <div>
            <label>CPF</label>
            <input
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              placeholder="00000000000"
              required
              {...inputFix}
            />
          </div>

          <div>
            <label>Telefone</label>
            <input
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              placeholder="(11)99999-9999"
              {...inputFix}
            />
          </div>
        </div>

        <label>Endereço</label>
        <input
          name="endereco"
          value={form.endereco}
          onChange={handleChange}
          placeholder="Rua X, Nº 123"
          {...inputFix}
        />

        <label>Cidade</label>
        <input
          name="cidade"
          value={form.cidade}
          onChange={handleChange}
          placeholder="São Paulo"
          {...inputFix}
        />

        {/* Campo exclusivo do PROFISSIONAL */}
        {form.tipo === "PROFISSIONAL" && (
          <>
            <label>Especialidade</label>
            <input
              name="especialidade"
              value={form.especialidade}
              onChange={handleChange}
              placeholder="Psicologia clínica, TCC, etc..."
              required
              {...inputFix}
            />
          </>
        )}

        <button
          type="button"
          className="btn-lgpd"
          onClick={() => setModalOpen(true)}
        >
          📄 Ler Política de Privacidade
        </button>

        <label className="check-lgpd">
          <input
            type="checkbox"
            checked={aceitouLgpd}
            onChange={() => setAceitouLgpd(!aceitouLgpd)}
            {...inputFix}
          />
          Confirmo que li e aceito a Política de Privacidade e LGPD.
        </label>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Enviando..." : "Cadastrar"}
        </button>
      </form>

      <LgpdModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAccept={() => {
          setAceitouLgpd(true);
          setModalOpen(false);
        }}
      />
    </div>
  );
}
