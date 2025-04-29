import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiUrl } from '../services/api'; // use a instância centralizada do axios

interface Usuario {
  id: number;
  nome: string;
  email: string;
  token: string;
  tipo: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  carregando: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      if (token) {
        try {
          const response = await apiUrl.get('/usuarios/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsuario(response.data);
        } catch (err) {
          console.error('Erro ao buscar usuário:', err);
          logout();
        }
      }
      setCarregando(false);
    };

    fetchUsuario();
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
