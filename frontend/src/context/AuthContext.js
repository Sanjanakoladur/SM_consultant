import { createContext, useContext, useEffect, useState } from 'react'; import api from '../services/api';
const Ctx = createContext(); export const useAuth = () => useContext(Ctx);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/auth/me').then((r) => setUser(r.data.user)).catch(() => setUser(null)).finally(() => setLoading(false)); }, []);
  const login = async (b) => { const r = await api.post('/auth/login', b); setUser(r.data.user); return r.data.user; };
  const register = async (b) => { const r = await api.post('/auth/register', b); setUser(r.data.user); return r.data.user; };
  const logout = async () => { await api.post('/auth/logout').catch(() => {}); setUser(null); };
  return <Ctx.Provider value={{ user, loading, login, register, logout }}>{children}</Ctx.Provider>;
}
export const home = (u) => (u?.role === 'ADMIN' ? '/admin' : u?.role === 'OWNER' ? '/owner/dashboard' : '/customer/dashboard');
