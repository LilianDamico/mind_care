import React, { useState } from 'react';
import { apiUrl } from '../../services/api'; // Importa o axios configurado
import { Navbar } from '../../components/navbar/Navbar';
import './PasswordRecovery.css';

const PasswordRecovery: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePasswordRecovery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!email) {
      setError('Por favor, insira um email válido.');
      setLoading(false);
      return;
    }

    try {
      const response = await apiUrl.post('/password_recovery', { email });

      if (response.status === 200) {
        setSuccess('Um email foi enviado com as instruções para recuperação.');
        setEmail('');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao enviar email de recuperação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-recovery-container">
      <Navbar />
      <h2>Recupere sua senha</h2>
      <form onSubmit={handlePasswordRecovery} className="password-recovery-form">
        <div className="input-group">
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading} className="recoverysubmit-button">
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default PasswordRecovery;
