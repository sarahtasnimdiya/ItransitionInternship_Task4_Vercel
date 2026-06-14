import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api';

export default function Login({ onLogin }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [info,     setInfo]     = useState('');
  const [loading,  setLoading]  = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('verified') === '1') {
      setInfo('Email verified! You can now log in.');
    }
    const msg = sessionStorage.getItem('logoutMessage');
    if (msg) {
      setError(msg);
      sessionStorage.removeItem('logoutMessage');
    }
  }, [searchParams]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.login(email, password);
      onLogin(data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm" style={{ width: 400 }}>
        <div className="card-body p-4">
          <h4 className="mb-4 fw-semibold">Sign In</h4>

          {info  && <div className="alert alert-success py-2">{info}</div>}
          {error && <div className="alert alert-danger  py-2">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" required
                value={email} onChange={e => setEmail(e.target.value)} autoFocus />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" required
                value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
              Sign In
            </button>
          </form>

          <hr />
          <div className="text-center">
            <small>No account? <Link to="/register">Register</Link></small>
          </div>
        </div>
      </div>
    </div>
  );
}
