import { createContext, useEffect, useState } from 'react';
import { api } from '../utils/axiosConfig';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      try {
        if (token) {
          const res = await api.get('/user');
          setUser(res.data);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(email, password) {
    try {
      const res = await api.post('/login', { email, password });
      const { access_token } = res.data;

      localStorage.setItem('token', access_token);
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      const userRes = await api.get('/user');
      setUser(userRes.data);

      router.push('/dashboard');
    } catch (err) {
      alert('Credenciais inválidas.');
    }
  }

  function logout() {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
