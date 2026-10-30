import { Navigate, useLocation } from 'react-router-dom'; import { useAuth } from '../context/AuthContext';
export default function Guard({ roles, children }) { const { user, loading } = useAuth(); const loc = useLocation(); if (loading) return <div className="wrap state">Loading…</div>;
  if (!user) return <Navigate to="/login" state={{ from: loc.pathname }} replace />; if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />; return children; }
