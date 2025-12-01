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
    especialidade: "" // 🔥 novo campo opcional para profissionais
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ============================================================
  //  SUBMIT — REGISTRA USER → CONSENTIMENTO LGPD → LIMPA FORM
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
      // 1) REGISTRO
      const response = await api.post("api/auth/register", form);
      const userId = response.data?.user?.id;

      if (!userId) {
        alert("⚠ Usuário criado, mas sem retorno de ID. Verifique backend.");
        return;
      }

      // 2) REGISTRO CONSENTIMENTO LGPD
      await api.post("/lgpd/consentimento", {
        userId,
        versao: "1.0",
        origem: "cadastro-web",
        ip: "127.0.0.1"
      });

      alert("🎉 Cadastro concluído com sucesso! LGPD registrado.");

      // 🔥 LIMPAR FORMULÁRIO APÓS CADASTRAR
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

    } catch (err) {
      console.error("❌ Erro ao registrar:", err);
      alert("Erro ao cadastrar usuário. Tente novamente.");
    }

    setLoading(false);
  }

  return (
    <div className="signup-container">

      <h2 className="titulo-form"> 📎 Cadastro MindCare 😎</h2>

      <form className="form-box" onSubmit={handleSubmit}>

        <label>Tipo de Usuário</label>
        <select name="tipo" value={form.tipo} onChange={handleChange}>
          <option value="CLIENTE">Cliente</option>
          <option value="PROFISSIONAL">Profissional</option>
        </select>

        <label>Nome completo</label>
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Maria da Silva" required />

        <div className="grid-2">
          <div>
            <label>E-mail</label>
            <input name="email" value={form.email} onChange={handleChange} placeholder="email@dominio.com" required />
          </div>

          <div>
            <label>Senha</label>
            <input name="senha" type="password" value={form.senha} onChange={handleChange} required />
          </div>
        </div>

        <div className="grid-2">
          <div>
            <label>CPF</label>
            <input name="cpf" value={form.cpf} onChange={handleChange} placeholder="00000000000" required />
          </div>

          <div>
            <label>Telefone</label>
            <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="(11)99999-9999" />
          </div>
        </div>

        <label>Endereço</label>
        <input name="endereco" value={form.endereco} onChange={handleChange} placeholder="Rua X, Nº 123" />

        <label>Cidade</label>
        <input name="cidade" value={form.cidade} onChange={handleChange} placeholder="São Paulo" />

        {/* 🔥 CAMPO QUE SÓ APARECE PARA PROFISSIONAL */}
        {form.tipo === "PROFISSIONAL" && (
          <>
            <label>Especialidade</label>
            <input
              name="especialidade"
              value={form.especialidade}
              onChange={handleChange}
              placeholder="Psicologia clínica, TCC, etc..."
              required // só exige o campo quando aparecer
            />
          </>
        )}

        <button type="button" className="btn-lgpd" onClick={() => setModalOpen(true)}>
          📄 Ler Política de Privacidade
        </button>

        <label className="check-lgpd">
          <input type="checkbox" checked={aceitouLgpd} onChange={() => setAceitouLgpd(!aceitouLgpd)} />
          Confirmo que li e aceito a Política de Privacidade e LGPD.
        </label>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Enviando..." : "Cadastrar"}
        </button>
      </form>

      <LgpdModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAccept={() => { setAceitouLgpd(true); setModalOpen(false); }}
      />
    </div>
  );
}
