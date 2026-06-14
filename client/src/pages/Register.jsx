import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Register({ onLogin }) {
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Password cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      const data = await api.register(name, email, password);
      onLogin(data.token);
      navigate('/', { state: { message: data.message } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm" style={{ width: 400 }}>
        <div className="card-body p-4">
          <h4 className="mb-4 fw-semibold">Create Account</h4>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" required
                value={name} onChange={e => setName(e.target.value)} autoFocus />
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" required
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" required
                value={password} onChange={e => setPassword(e.target.value)} />
              <div className="form-text">Any non-empty password is accepted.</div>
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
              Register
            </button>
          </form>

          <hr />
          <div className="text-center">
            <small>Already have an account? <Link to="/login">Sign in</Link></small>
          </div>
        </div>
      </div>
    </div>
  );
}
