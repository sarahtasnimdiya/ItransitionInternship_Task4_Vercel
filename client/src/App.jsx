import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login    from './pages/Login';
import Register from './pages/Register';
import Users    from './pages/Users';

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  function handleLogin(newToken) {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  function handleLogout(message) {
    localStorage.removeItem('token');
    setToken(null);
    if (message) sessionStorage.setItem('logoutMessage', message);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"    element={token ? <Navigate to="/" /> : <Login    onLogin={handleLogin} />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <Register onLogin={handleLogin} />} />
        <Route path="/"         element={token ? <Users onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="*"         element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
